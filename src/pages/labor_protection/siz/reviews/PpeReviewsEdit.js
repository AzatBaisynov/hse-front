import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import '../../../../assets/style/ppe_reviews.css';

const PpeReviewsEdit = () => {
  // const [file, setFile] = useState({})
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const { id } = useParams();

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

  // const handleSelectFiles = (e) => {
  // 	setFile(e.target.files[0])
  // }

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "employeeFullName":
        setDocument({ ...document, employeeFullName: value });
        break;
      case "position":
        setDocument({ ...document, position: value });
        break;
      case "divisionName":
        setDocument({ ...document, divisionName: value });
        break;
      case "divisionCode":
        setDocument({ ...document, divisionCode: value });
        break;
      case "issuancePeriod":
        setDocument({ ...document, issuancePeriod: value });
        break;
      case "comment":
        setDocument({ ...document, comment: value });
        break;
      case "ppeName":
        setDocument({ ...document, ppeName: value });
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
      <div className="create-doc__title">Отзывы и предложения по СИЗ</div>
      <form action="#" className="create-doc__form">
        <div className="horizontal-form">
          <div className="horizontal-form__column">
            <div className="column-title">Дата / Date</div>
            <input type="date" onInput={handleInput} className="column-content" id="dateFull" value={document?.dateFull} />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">ФИО / Name</div>
            <input type="text" onInput={handleInput} className="column-content" id="employeeFullName" value={document?.employeeFullName} />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Должность / Position</div>
            <input type="text" onInput={handleInput} className="column-content" id="position" value={document?.position} />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Подразделение / Division</div>
            <input type="text" onInput={handleInput} className="column-content" id="divisionName" value={document?.divisionName} />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Объект / Object</div>
            <input type="text" onInput={handleInput} className="column-content" id="divisionCode" value={document?.divisionCode} />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">
              Период поставки / Period of issuance
            </div>
            <input type="month" onInput={handleInput} className="column-content" id="issuancePeriod" value={document?.issuancePeriod} />
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
            }}
          >
            Наименование СИЗ / Name of PPE
          </div>
          {/* <select name="itemName" id="itemName" class="form__field-content form__field-content_long">
              <option value="1">item 1</option> 
              <option value="2">item 2</option>
              <option value="3">item 3</option>
          </select> */}
          <input
            list="ppeName"
            className="form__field-content form__field-content_long" id="ppeName" onInput={handleInput} value={document?.ppeName}
          />
        </div>
        {/* COMMENT */}
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Отзыв по СИЗ / Review PPE"
          value={document?.comment}
          onInput={handleInput}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="./management_programs_doc_list.html"
            className="create-doc__decline"
          >
            Отменить
          </a>
          <button
            onClick={handleSend}
            type="submit"
            className="create-doc__button create-doc__button-text"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PpeReviewsEdit;
