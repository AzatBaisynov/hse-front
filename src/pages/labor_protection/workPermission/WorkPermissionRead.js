import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";
import { useNavigate, useParams } from "react-router-dom";
import { downloadFile } from "../../../data/downloader";

const WorkPermissionRead = () => {
  const [file, setFile] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const [users, setUsers] = useState([]);
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
              id="docName"
              className="form__field-content form__field-content_protocol-date"
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Руководитель работ</div>
            <input
              value={document?.manager}
              name="manager"
              id="manager"
              className="create-doc__field-content"
            >
            </input>
          </div>
        </div>
        <div className="create-doc__row">
          <div className="create-doc__field">
            <div className="create-doc__field-title">Действие</div>
            <input
              value={document?.action}
              name="action"
              id="action"
              className="create-doc__field-content"
            >
            </input>
          </div>
          <div className="create-doc__field">
            <div className="create-doc__field-title">Исполнитель</div>
            <input
              value={document?.executor}
              name="executor"
              id="executor"
              className="create-doc__field-content"
            >
            </input>
          </div>
        </div>
        <div className="create-doc__field">
          <div className="create-doc__field-title">Загрузка документа</div>
          <div
            className="create-doc__upload-file create-doc__field-content"
            style={{ width: "886px" }}
          >
            {link?.download && (
              <a href={link?.href} download={link?.download}>
                <label htmlFor="upload-file">
                  <span className="create-doc__label">
                    <img
                      src={uploadIcon}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <span style={{ cursor: "pointer" }}>
                      {document?.uploadFile[0]?.name ||
                        "Нажмите или перетащите файл для загрузки"}
                    </span>
                  </span>
                </label>
              </a>
            )}
          </div>
        </div>
        <textarea
          name="comment"
          id="comment"
          value={document?.comment}
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
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/work_permission/edit/${document?.id}`, {
                replace: true,
              });
            }}
          >
            Редактировать
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkPermissionRead;
