import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";
import { useNavigate, useParams } from "react-router-dom";
import { downloadFile } from "../../../data/downloader";

const WorkPermissionEdit = () => {
  const [file, setFile] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const [users, setUsers] = useState([]);

  const handleSelectFiles = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    const get = async () => {
      const config = {
        method: "GET",
        url: `${_LINK}/v1/api/org/ldap/all`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data } = await axios(config);
        console.log(data);
        setUsers(data.users);
        // setDocument({
        //   ...document,
        //   action: document?.action,
        //   manager: data.users[0].username,
        //   executor: data.users[0].username,
        // });
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState({});

  useEffect(() => {
    const getDocument = async () => {
      const config = {
        method: "GET",
        url: `${_LINK}/v1/api/labor/id/${id}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data } = await axios(config);
        setDocument(data);
        const l = await downloadFile(
          `${_LINK}/v1/api/file/${data?.uploadFile[0]?.name}`,
          data?.uploadFile[0]?.name
        );
        setLink(l);
      } catch (e) {
        console.log(e);
      }
    };
    getDocument();
  }, []);

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "comment":
        setDocument({ ...document, comment: value });
        break;
      case "docName":
        setDocument({ ...document, docName: value });
        break;
      case "fileName":
        setDocument({ ...document, fileName: value });
        break;
      case "manager":
        setDocument({ ...document, manager: value });
        break;
      case "executor":
        setDocument({ ...document, executor: value });
        break;
      case "action":
        setDocument({ ...document, action: value });
        break;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const doc = document;
    doc.dir = { id: dirId };
    setDocument({ ...document, id });
    const config = {
      method: "POST",
      url: `${_LINK}/v1/api/labor/create/update`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(document),
    };
    try {
      const { data } = await axios(config);
      if (file?.name) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        try {
          await axios.post(`${_LINK}/v1/api/labor/file/${data.id}`, formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    alert("Запись добавлена");
  };

  return (
    <div
      className="container"
      style={{ flexDirection: "column", alignItems: "center", gap: "0" }}
    >
      <p className="create-doc__title">Электронный наряд-допуск</p>
      <form action="./pasropts_doc_list.html" className="create-doc__form">
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Имя файла</div>
            <input
              type="text"
              name="fileName"
              value={document?.fileName}
              onInput={handleInput}
              id="fileName"
              className="form__field-content"
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Дата</div>
            <input
              type="date"
              name="dateFull"
              value={document?.dateFull}
              onInput={handleInput}
              id="dateFull"
              className="form__field-content"
            />
          </div>
        </div>
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Наименование работы</div>
            <input
              type="text"
              name="docName"
              value={document?.docName}
              onInput={handleInput}
              id="docName"
              className="form__field-content form__field-content_protocol-date"
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Руководитель работ</div>
            <select
              value={document?.manager}
              onInput={handleInput}
              name="manager"
              id="manager"
              className="create-doc__field-content"
            >
              {users?.map((el, idx) => (
                <option key={idx} value={el.username}>
                  {el.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="create-doc__row">
          <div className="create-doc__field">
            <div className="create-doc__field-title">Действие</div>
            <select
              value={document?.action}
              onInput={handleInput}
              name="action"
              id="action"
              className="create-doc__field-content"
            >
              <option value="Передать на ознакомление">
                Передать на ознакомление
              </option>
              <option value="Передать на рассмотрение">
                Передать на рассмотрение
              </option>
              <option value="Отправить на доработку">
                Отправить на доработку
              </option>
              <option value="Согласовать документ">Согласовать документ</option>
            </select>
          </div>
          <div className="create-doc__field">
            <div className="create-doc__field-title">Исполнитель</div>
            <select
              value={document?.executor}
              onInput={handleInput}
              name="executor"
              id="executor"
              className="create-doc__field-content"
            >
              {users?.map((el, idx) => (
                <option key={idx} value={el.username}>
                  {el.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="create-doc__field">
          <div className="create-doc__field-title">Загрузка документа</div>
          <div
            className="create-doc__upload-file create-doc__field-content"
            style={{ width: "886px" }}
          >
            <label htmlFor="file">
              <span className="create-doc__label">
                <img src={uploadIcon} alt="" />
                <span>
                  {(file?.name) ||
                    "Нажмите или перетащите файл для загрузки"}
                </span>
              </span>
            </label>
            <input
              type="file"
              id="file"
              hidden
              multiple
              onInput={handleSelectFiles}
            />
          </div>
        </div>
        <textarea
          name="comment"
          id="comment"
          value={document?.comment}
          onInput={handleInput}
          class="form__comment form__field-content"
          placeholder="Комментарий"
        ></textarea>

        <div className="create-doc__buttons">
          <a
            href="/labor_protection/list/46"
            className="create-doc__cancel-button create-doc__button-text"
          >
            Отменить
          </a>
          <button
            type="submit"
            className="create-doc__button create-doc__button-text"
            onClick={handleSend}
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkPermissionEdit;
