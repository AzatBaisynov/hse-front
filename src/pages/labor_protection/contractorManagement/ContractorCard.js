import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import "../../../assets/style/ppe_reviews.css";

const PpeReviews = () => {
  // const [file, setFile] = useState({})
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);

  useEffect(() => {
    console.log(dirId);
  }, []);

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
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const doc = document;
    doc.dir = { id: dirId };
    console.log(document);
    const config = {
      method: "POST",
      url: `${_LINK}/v1/api/labor/create/update`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(document),
    };
    console.log(dirId);
    try {
      const { data } = await axios(config);
      console.log(data);
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
      <div className="create-doc__title">Карточка подрядчика</div>
      <form action="#" className="create-doc__form">
        <div className="horizontal-form">
          <div className="horizontal-form__column">
            <div className="column-title">Загрузка списка работников</div>
            <input
              type="text"
              onInput={handleInput}
              className="column-content"
              id="divisionName"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">БИН / ИИН</div>
            <input
              type="text"
              onInput={handleInput}
              className="column-content"
              id="employeeId"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Номер договора на услуги / товар</div>
            <input
              type="text"
              onInput={handleInput}
              className="column-content"
              id="#"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">
              Дата договора и его срок действия
            </div>
            <input
              type="date"
              onInput={handleInput}
              className="column-content"
              id="#"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">
              Предмет договора - описание услуги / товара
            </div>
            <input
              type="text"
              onInput={handleInput}
              className="column-content"
              id="#"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Количество работников в проекте</div>
            <input
              type="number"
              onInput={handleInput}
              className="column-content"
              id="#"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">
              Департамент ответственный за Договор
            </div>
            <input
              type="text"
              onInput={handleInput}
              className="column-content"
              id="#"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">№ совместного приказа</div>
            <input
              type="number"
              onInput={handleInput}
              className="column-content"
              id="#"
            />
          </div>
          <div className="horizontal-form__column">
            <div className="column-title">Дата приказа</div>
            <input
              type="date"
              onInput={handleInput}
              className="column-content"
              id="dateFull"
            />
          </div>
        </div>
        <div className="create-doc__title">Список работников</div>
        <div className="create-doc__field" >
					<div className="create-doc__field-title">Загрузка документа</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						<label htmlFor="file" >
							<span className="create-doc__label">
								{/* <img src={} alt="" /> */}
								<span>{"Нажмите или перетащите файл для загрузки"}</span>
							</span>
						</label>
						<input type="file" id="file" hidden multiple />
					</div>
				</div>
        {/* COMMENT */}
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Список требований к подрядчикам"
          defaultValue={""}
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
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PpeReviews;
