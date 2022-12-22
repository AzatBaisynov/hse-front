import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/ppe_reviews.css";

const PpeReviews = () => {
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get = async () => {
      const config = {
        method: "GET",
        url: `${_LINK}/v1/api/org/ldap/all`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data } = await axios(config);
        console.log(data);
        setDepartments(data.departments);
        setUsers(data.users);
        setDocument({
          ...document,
          senderUser: data.users[0].username,
          issuingAuthority: data.users[0].department,
          makerUser: data.users[0].username,
        });
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, []);

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
      alert("Запись добавлена");
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
      <div className="create-doc__title">Отзывы и предложения по СИЗ</div>
      <form action="#" className="create-doc__form">
        <div className="horizontal-form">
          <div className="horizontal-form__column">
            <div className="column-title">Дата / Date</div>
            <input
              type="date"
              onInput={handleInput}
              className="column-content"
              id="dateFull"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">ФИО / Name</div>
            <select
              onInput={handleInput}
              name="employeeFullName"
              id="employeeFullName"
              className="create-doc__field-content"
              style={{ width: "100%", height: "43%", borde: "none" }}
            >
              {users?.map((el, idx) => (
                <option key={idx} value={el.username}>
                  {el.username}
                </option>
              ))}
            </select>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Должность / Position</div>
            <select
              onInput={handleInput}
              name="position"
              id="position"
              className="create-doc__field-content"
              style={{ height: "43%", borde: "none" }}
            >
              {users?.map((el, idx) => (
                <option key={idx} value={el.userdesc}>
                  {el.userdesc}
                </option>
              ))}
            </select>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Подразделение / Division</div>
            <select
              onInput={handleInput}
              name="divisionName"
              id="divisionName"
              className="create-doc__field-content"
              style={{ width: "100%", height: "43%", borde: "none" }}
            >
              {users?.map((el, idx) => (
                <option key={idx} value={el.department}>
                  {el.department}
                </option>
              ))}
            </select>
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Объект / Object</div>
            <input
              type="text"
              onInput={handleInput}
              className="column-content"
              id="divisionCode"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">
              Период поставки / Period of issuance
            </div>
            <input
              type="month"
              onInput={handleInput}
              className="column-content"
              id="issuancePeriod"
            />
          </div>
        </div>
        <div className="form__field">
          <div className="form__field-title form__field-title_blue">
            Наименование СИЗ / Name of PPE
          </div>
          <input
            list="ppeName"
            className="form__field-content form__field-content_long"
            id="ppeName"
            onInput={handleInput}
          />
        </div>
        {/* COMMENT */}
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Отзыв по СИЗ / Review PPE"
          defaultValue={""}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="labor_protection/list/43"
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

export default PpeReviews;
