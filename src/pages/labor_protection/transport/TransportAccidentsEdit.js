import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../data/links";
import { useSelector } from "react-redux";
import "../../../assets/style/form_style.css";

const TransportAccidentsEdit = () => {
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDocument = async () => {
        const config = {
            method: "GET",
            url: `${_LINK}/v1/api/labor/id/${id}`,
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }
        try {
            const { data } = await axios(config)
            setDocument(data)
        } catch (e) {
            alert(e)
        }
    }
    getDocument()
}, [])

const handleInput = (e) => {
  const { id, value } = e.target;
  switch (id) {
    case "dateFull":
      setDocument({ ...document, dateFull: value });
      break;
    case "dateTime":
      setDocument({ ...document, dateTime: value });
      break;
    case "location":
      setDocument({ ...document, location: value });
      break;
    case "divisionName":
      setDocument({ ...document, divisionName: value });
      break;
    case "employeeFullName":
      setDocument({ ...document, employeeFullName: value });
      break;
    case "prodYear":
      setDocument({ ...document, prodYear: value });
      break;
    case "licensePlate":
      setDocument({ ...document, licensePlate: value });
      break;
    case "itemNum":
      setDocument({ ...document, itemNum: value });
      break;
    case "hasVictims":
      setDocument({ ...document, hasVictims: value });
      break;
    case "comment":
      setDocument({ ...document, comment: value });
      break;
  }
};

const handleSend = async (e) => {
  e.preventDefault();
  const doc = document;
  doc.dir = {id: dirId};
  const config = {
    method: "POST",
    url: `${_LINK}/v1/api/labor/create/update`,
    headers: {
      "Authorization": localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: JSON.stringify(document),
  };
  try {
    const { data } = await axios(config);
    alert("Запись добавлена");
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
      <p className="create-doc__title">Информация по ДТП</p>
      <form action="#" className="create-doc__form">
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Дата</div>
            <input
              type="date"
              name="dateFull"
              id="dateFull"
              className="form__field-content"
              value={document?.dateFull}
              onInput={handleInput}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Время</div>
            <input
              type="time"
              name="dateTime"
              id="dateTime"
              className="form__field-content"
              onInput={handleInput}
              value={document?.dateTime}
            />
          </div>
        </div>
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Место происшествия</div>
            <input
              type="text"
              name="location"
              id="location"
              className="form__field-content"
              onInput={handleInput}
              value={document?.location}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Подразделение</div>
            <input
              type="text"
              name="divisionName"
              id="divisionName"
              className="form__field-content"
              onInput={handleInput}
              value={document?.divisionName}
            />
          </div>
        </div>
        <div className="form__field">
            <div className="form__field-title">ФИО водителя</div>
            <input
              type="text"
              name="employeeFullName"
              id="employeeFullName"
              className="form__field-content form__field-content_long"
              onInput={handleInput}
              value={document?.employeeFullName}
            />
          </div>
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Год выпуска</div>
            <input
              type="number"
              placeholder="----"
              min={1970}
              max={3000}
              name="prodYear"
              id="prodYear"
              className="form__field-content"
              onInput={handleInput}
              value={document?.prodYear}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Гос номер машины</div>
            <input
              type="text"
              name="licensePlate"
              id="licensePlate"
              className="form__field-content"
              onInput={handleInput}
              value={document?.licensePlate}
            />
          </div>
        </div>
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Марка машины</div>
            <input
              type="text"
              name="carBrand"
              id="itemNum"
              className="form__field-content"
              onInput={handleInput}
              value={document?.itemNum}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Наличие пострадавших</div>
            <select
              name="hasVictims"
              id="hasVictims"
              className="form__field-content"
            >
              <option value={document?.hasVictims}></option>
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          </div>
        </div>
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Описание ДТП"
          defaultValue={""}
          onInput={handleInput}
          value={document?.comment}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="/labor_protection/list/61"
            className="create-doc__cancel-button create-doc__button-text"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/transport/get/${document?.id}`, { replace: true });
            }}
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

export default TransportAccidentsEdit;
