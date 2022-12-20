import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";
import { downloadFile } from "../../../data/downloader";
import { useNavigate, useParams } from "react-router-dom";

const ContractorCardEdit = () => {
  const [document, setDocument] = useState({});
  const { id } = useParams();
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

  const [file1, setFile1] = useState({});
  const [file2, setFile2] = useState({});
  const [file3, setFile3] = useState({});
  const { dirId } = useSelector((store) => store.files);

  const handleSelectFiles = (e) => {
    setFile1(e.target.files[0]);
    setFile2(e.target.files[0]);
    setFile3(e.target.files[0]);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "employeeId":
        setDocument({ ...document, employeeId: value });
        break;
      case "orgName":
        setDocument({ ...document, orgName: value });
        break;
      case "agreementNum":
        setDocument({ ...document, agreementNum: value });
        break;
      case "workersNum":
        setDocument({ ...document, workersNum: value });
        break;
      case "approvalDepp":
        setDocument({ ...document, approvalDepp: value });
        break;
      case "orderNum":
        setDocument({ ...document, orderNum: value });
        break;
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "comment":
        setDocument({ ...document, comment: value });
        break;
      case "project":
        setDocument({ ...document, project: value });
        break;
      case "agreementStartDate":
        setDocument({ ...document, agreementStartDate: value });
        break;
      case "agreementEndDate":
        setDocument({ ...document, agreementEndDate: value });
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
          alert(e);
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
          alert(e);
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
      <div className="create-doc__title">Карточка подрядчика</div>
      <form action="#" className="create-doc__form">
        <div className="horizontal-form">
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Наименование организации подрядчика
            </div>
            <textarea
              className="column-content"
              id="orgName"
              value={document?.orgName}
              onInput={handleInput}
            ></textarea>
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">БИН / ИИН</div>
            <input
              type="text"
              value={document?.employeeId}
              onInput={handleInput}
              className="column-content"
              id="employeeId"
            />
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Номер договора на услуги / товар
            </div>
            <input
              type="number"
              value={document?.agreementNum}
              onInput={handleInput}
              className="column-content"
              id="agreementNum"
            />
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Дата договора и его срок действия
            </div>
            <input
              type="date"
              value={document?.agreementStartDate}
              onInput={handleInput}
              style={{height: "40px"}}
              className="column-content"
              id="agreementStartDate"
            />
            <input
              type="date"
              value={document?.agreementEndDate}
              onInput={handleInput}
              style={{height: "40px"}}
              className="column-content"
              id="agreementEndDate"
            />
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Предмет договора - описание услуги / товара
            </div>
            <textarea
              className="column-content"
              id="project"
              value={document?.project}
              onInput={handleInput}
            ></textarea>
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Количество работников в проекте
            </div>
            <input
              type="number"
              value={document?.workersNum}
              onInput={handleInput}
              className="column-content"
              id="workersNum"
            />
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Департамент ответственный за Договор
            </div>
            <input
              type="text"
              value={document?.approvalDepp}
              onInput={handleInput}
              className="column-content"
              id="approvalDepp"
            />
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              № совместного приказа
            </div>
            <input
              type="number"
              value={document?.orderNum}
              onInput={handleInput}
              className="column-content"
              id="orderNum"
            />
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Дата приказа
            </div>
            <input
              type="date"
              value={document?.dateFull}
              onInput={handleInput}
              className="column-content"
              id="dateFull"
            />
          </div>
        </div>
        <div className="create-doc__field">
          <div className="form__field-title form__field-title_blue">
            Загрузить список работников
          </div>
          <div
            className="create-doc__upload-file create-doc__field-content"
            style={{ width: "940px" }}
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
        {/* COMMENT */}
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Список требований к подрядчикам"
          value={document?.comment}
          onInput={handleInput}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="/labor_protection/list/69"
            className="create-doc__decline"
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

export default ContractorCardEdit;
