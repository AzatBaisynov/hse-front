import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import { _LINK } from "../../../data/links";

const WorkPermissionRead = () => {
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
        setDocument({
          ...document,
          action: "Передать на ознакомление",
          manager: data.users[0].username,
          executor: data.users[0].username,
        });
      } catch (e) {
        alert(e);
      }
    };
    get();
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
          alert(e);
        }
      }
    } catch (e) {
      alert(e);
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
              onInput={handleInput}
              id="docName"
              className="form__field-content form__field-content_protocol-date"
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Руководитель работ</div>
            <select
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
                <span>"Нажмите или перетащите файл для загрузки"</span>
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
            onClick={handleSend}
            type="submit"
            className="create-doc__button create-doc__button-text"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkPermissionRead;
