import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import uploadIcon from "../../../../assets/images/upload-icon.svg";
import "../../../../assets/style/ppe_reviews.css";
import { downloadFile } from "../../../../data/downloader";
import { useNavigate, useParams } from "react-router-dom";

const ResponsibilityOrderEdit = () => {
  const [file1, setFile1] = useState({});
  const [file2, setFile2] = useState({});
  const [file3, setFile3] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);

  const handleSelectFiles = (e) => {
    setFile1(e.target.files[0]);
    setFile2(e.target.files[0]);
    setFile3(e.target.files[0]);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "orderNum":
        setDocument({ ...document, orderNum: value });
        break;
      case "agreementName":
        setDocument({ ...document, agreementName: value });
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
      if (file1?.name) {
        const formData = new FormData();
        formData.append("file", file1, file1.name);
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

      if (file2?.name) {
        const formData = new FormData();
        formData.append("file", file2, file2.name);
        try {
          await axios.post(
            `${_LINK}/v1/api/eco/document/file/${data.id}/2`,
            formData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
      if (file3?.name) {
        const formData = new FormData();
        formData.append("file", file3, file3.name);
        try {
          await axios.post(
            `${_LINK}/v1/api/eco/document/file/${data.id}/3`,
            formData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    alert("Запись добавлена");
  };

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
      <p className="create-doc__title">Приказ об ответственности</p>
      <form action="#" className="create-doc__form">
        <div className="form__field">
          <div className="form__field-title">Совместный приказ</div>
          <input
            type="text"
            name="agreementName"
            id="agreementName"
            className="form__field-content form__field-content_long"
            onInput={handleInput}
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
              onInput={handleInput}
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
              onInput={handleInput}
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
            onClick={handleSend}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResponsibilityOrderEdit;
