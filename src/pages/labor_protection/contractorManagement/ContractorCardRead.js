import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";
import { downloadFile } from "../../../data/downloader";

const ContractorCardRead = () => {
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
            ></textarea>
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">БИН / ИИН</div>
            <input
              type="text"
              value={document?.employeeId}
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
              style={{height: "40px"}}
              className="column-content"
              id="agreementStartDate"
            />
            <input
              type="date"
              value={document?.agreementEndDate}
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
            ></textarea>
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Количество работников в проекте
            </div>
            <input
              type="number"
              value={document?.workersNum}
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
              className="column-content"
              id="dateFull"
            />
          </div>
        </div>
        {/* <div
          className="create-doc__title"
          style={{ marginTop: "30px", fontSize: "18px" }}
        >
          Список работников
        </div>
        <table className="contractors-table">
          <thead>
            <tr>
              <th colSpan={5}></th>
              <th colSpan={4}>Наличие сертификатов</th>
              <th rowSpan={2} width={"95px"}>
                Прошел вводный инструктаж: дата проведения инструктажа
              </th>
            </tr>
            <tr>
              <th width={"20px"}>№</th>
              <th width={"140px"}>ИИН</th>
              <th width={"140px"}>Должность</th>
              <th width={"140px"}>Объект</th>
              <th width={"100px"}>Период работы на объекте</th>
              <th width={"110px"}>По охране труда</th>
              <th width={"110px"}>Промышленной безопасности</th>
              <th width={"110px"}>Пожарно-технический минимум (ПТМ)</th>
              <th width={"110px"}>Оказание первой помощи</th>
            </tr>
          </thead>
        </table> */}
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
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/contractors/cards/edit/${document?.id}`, {
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

export default ContractorCardRead;
