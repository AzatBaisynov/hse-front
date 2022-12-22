import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";

const ContractorCard = () => {
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
              onInput={handleInput}
            ></textarea>
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">БИН / ИИН</div>
            <input
              type="text"
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
              onInput={handleInput}
              style={{height: "40px"}}
              className="column-content"
              id="agreementStartDate"
            />
            <input
              type="date"
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
              onInput={handleInput}
            ></textarea>
          </div>
          <div className="horizontal-form__column horizontal-form__column_contractor">
            <div className="column-title column-title_cotractor">
              Количество работников в проекте
            </div>
            <input
              type="number"
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
              onInput={handleInput}
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
            <label htmlFor="file">
              <span className="create-doc__label">
                <img src={uploadIcon} alt="" />
                <span>
                  {(file1?.name && file2.name && file3.name) ||
                    "Нажмите или перетащите файл для загрузки"}
                </span>
              </span>
            </label>
            <input type="file" id="file" hidden multiple onInput={handleSelectFiles}/>
          </div>
        </div>
        {/* COMMENT */}
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Список требований к подрядчикам"
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

export default ContractorCard;
