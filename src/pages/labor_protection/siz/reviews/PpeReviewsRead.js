import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../../data/links";

const PpeReviewsRead = () => {
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
      <div className="create-doc__title">Отзывы и предложения по СИЗ</div>
      <form action="#" className="create-doc__form">
      <div className="horizontal-form">
          <div className="horizontal-form__column">
            <div className="column-title">Дата / Date</div>
            <input type="date" className="column-content" id="dateFull" value={document?.dateFull} />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">ФИО / Name</div>
            <input type="text" className="column-content" id="employeeFullName" value={document?.employeeFullName}/>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Должность / Position</div>
            <input type="text" className="column-content" id="position" value={document?.position}/>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Подразделение / Division</div>
            <input type="text" className="column-content" id="divisionName" value={document?.divisionName}/>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Объект / Object</div>
            <input type="text" className="column-content" id="divisionCode" value={document?.divisionCode}/>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">
              Период поставки / Period of issuance
            </div>
            <input type="month" className="column-content" id="issuancePeriod" value={document?.issuancePeriod}/>
          </div>
        </div>
        <div className="form__field">
          <div
            className="form__field-title"
            style={{
              backgroundColor: "rgba(50, 115, 174, 0.1)",
              border: "1px solid #9ABAD7",
              color: "#3273AE",
              fontWeight: 600,
            }}>
            Наименование СИЗ / Name of PPE
          </div>
          <input
            list="ppeName"
            className="form__field-content form__field-content_long"
            value={document?.ppeName}
          />
        </div>
        {/* COMMENT */}
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Отзыв по СИЗ / Review PPE" value={document?.comment}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/labor/siz/edit/${document?.id}`, { replace: true });
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

export default PpeReviewsRead;
