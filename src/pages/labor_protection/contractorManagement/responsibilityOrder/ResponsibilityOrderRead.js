import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../../data/links";
import uploadIcon from "../../../../assets/images/upload-icon.svg";
import "../../../../assets/style/ppe_reviews.css";
import { downloadFile } from "../../../../data/downloader";

const ResponsibilityOrderCreate = () => {
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
        alert(e);
      }
    };
    getDocument();
  }, []);

  return (
    <div
      className="container"
      style={{ flexDirection: "column", alignItems: "center", gap: "0" }}
    >
      <p className="create-doc__title">Приказ об ответственности</p>
      <form action="#" className="create-doc__form">
        <div className="form__field">
          <div className="form__field-title">Совместный приказ</div>
          <input
            type="text"
            name="agreementName"
            id="agreementName"
            className="form__field-content form__field-content_long"
            value={document?.agreementName}
          />
        </div>
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Номер совместного приказа</div>
            <input
              type="number"
              name="orderNum"
              id="orderNum"
              className="form__field-content"
              value={document?.orderNum}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Дата совместного приказа</div>
            <input
              type="date"
              name="dateFull"
              id="dateFull"
              className="form__field-content"
              value={document?.dateFull}
            />
          </div>
        </div>
        <div className="create-doc__field">
          <div className="form__field-title">Загрузить приказ</div>
          <div
            className="create-doc__upload-file create-doc__field-content"
            style={{ width: "885px" }}
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
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="/labor_protection/list/70"
            className="create-doc__cancel-button create-doc__button-text"
          >
            Отменить
          </a>
          <button
            type="submit"
            className="create-doc__button create-doc__button-text"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/contractors/orders/edit/${document?.id}`, {
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

export default ResponsibilityOrderCreate;
