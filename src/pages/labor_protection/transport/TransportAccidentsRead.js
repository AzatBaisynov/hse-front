import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../data/links";
import "../../../assets/style/form_style.css";

const TransportAccidentsRead = () => {
  const [document, setDocument] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Время</div>
            <input
              type="time"
              name="dateTime"
              id="position"
              className="form__field-content"
              value={document?.position}
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
            </select>
          </div>
        </div>
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Описание ДТП"
          defaultValue={""}
          value={document?.comment}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="./utilization_contracts_doc_list.html"
            className="create-doc__cancel-button create-doc__button-text"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor_protection/list/61`, { replace: true });
            }}
          >
            Отменить
          </a>
          <button
            type="submit"
            className="create-doc__button create-doc__button-text"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/transport/accidents/edit/${document?.id}`, { replace: true });
            }}
          >
            Редактировать
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransportAccidentsRead;
