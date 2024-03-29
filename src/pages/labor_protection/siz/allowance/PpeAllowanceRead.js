import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import uploadIcon from "../../../../assets/images/upload-icon.svg";
import { _LINK } from "../../../../data/links";
import { downloadFile } from "../../../../data/downloader";

const PpeAllowanceRead = () => {
  const [document, setDocument] = useState({});
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
      <p className="create-doc__title">Норма выдачи СИЗ</p>
      <form action="#" className="create-doc__form">
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Имя файла</div>
            <input
              type="text"
              name="fileName"
              id="fileName"
              className="form__field-content"
              value={document?.fileName}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Дата</div>
            <input
              type="date"
              name="dateFull"
              id="dateFull"
              className="form__field-content"
              value={document?.dateFull}
            />
          </div>
        </div>
        <div className="form__field">
          <div className="form__field-title">Наименование документа</div>
          <input
            type="text"
            name="documentName"
            id="docName"
            className="form__field-content form__field-content_long"
            value={document?.docName}
          />
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
          className="form__comment form__field-content"
          placeholder="Комментарий"
          defaultValue={""}
          value={document?.comment}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/siz/allowance/edit/${document?.id}`, {
                replace: true,
              });
            }}
            className="create-doc__button create-doc__button-text"
          >
            Редактировать
          </button>
        </div>
      </form>
    </div>
  );
};

export default PpeAllowanceRead;
