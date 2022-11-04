import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr_card.css";

const PnbrCard = () => {
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
    <div className="create-doc-container">
        <div className="card">
            {/* Title */}
            <p className="card__title">
            Карточка поведенческого наблюдения по безопасности работ
            </p>
            {/* Upper row buttons */}
            <div className="card__btn-row">
            {/* Import doc and export doc buttons */}
            <div className="card__import-export">
                <button>
                <img
                    src="../../assets/images/labor-protecttion-upload-doc.svg"
                    alt=""
                />
                </button>
                <button>
                <img
                    src="../../assets/images/labor-protecttion-download-doc.svg"
                    alt=""
                />
                </button>
            </div>
            {/* Plan and Fact buttons */}
            <div className="card__plan-fact">
                <div>
                <input type="radio" defaultValue="plan" id="plan" name="schedule" />
                <label htmlFor="plan">По графику</label>
                </div>
                <div>
                <input type="radio" defaultValue="fact" id="fact" name="schedule" />
                <label htmlFor="plan">Не по графику</label>
                </div>
            </div>
            </div>
            {/* Card table */}
            <table className="card__table">
            <tbody>
                <tr>
                <th colSpan={2}>НАБЛЮДАТЕЛЬ</th>
                <th>НАБЛЮДАЕМЫЙ</th>
                </tr>
                <tr>
                <td colSpan={2}>
                    <div>
                    <p>Ф.И.О.:</p>
                    <input
                        type="text"
                        name="employeeFullName"
                        id="employeeFullName"
                        className="card__column-input"
                    />
                    </div>
                </td>
                <td>
                    <div>
                    {/* Observer's driving experience */}
                    <p>НАБЛЮДАЕМЫЙ ОТДЕЛ / КОМПАНИЯ: </p>
                    <input
                        type="text"
                        name="monitoredDep"
                        id="monitoredDep"
                        className="card__column-input"
                    />
                    </div>
                </td>
                </tr>
                <tr>
                <td colSpan={2}>
                    {/* Observer's division */}
                    <div className="card__column-unit">
                    <p>СТРУКТУРНОЕ ПОДРАЗДЕЛЕНИЕ:</p>
                    <input
                        type="text"
                        name="divisionName"
                        id="divisionName"
                        className="card__column-input"
                    />
                    </div>
                </td>
                <td>
                    {/* Driver's driving experience */}
                    <div className="card__column-unit">
                    <p>НАБЛЮДАЕМОЕ РАБОЧЕЕ ЗАДАНИЕ:</p>
                    <input
                        type="text"
                        name="monitoredTask"
                        id="monitoredTask"
                        className="card__column-input"
                    />
                    </div>
                </td>
                </tr>
                <tr>
                <td>
                    {/* Observer's ride date */}
                    <div className="card__column-unit">
                    <p>ДАТА / ВРЕМЯ:</p>
                    <input
                        type="datetime-local"
                        name="dateTime"
                        id="dateTime"
                        className="card__column-input"
                    />
                    </div>
                </td>
                <td>
                    {/* Observer's ride start */}
                    <div className="card__column-unit">
                    <p>КОЛИЧЕСТВО НАБЛЮДАЕМЫХ:</p>
                    <input
                        type="number"
                        name="monitoringNum"
                        id="monitoringNum"
                        className="card__column-input"
                    />
                    </div>
                </td>
                <td>
                    {/* Observer's location */}
                    <div className="card__column-unit">
                    <p>МЕСТО ПРОВЕДЕНИЯ:</p>
                    <input
                        type="text"
                        name="location"
                        id="location"
                        className="card__column-input"
                    />
                    </div>
                </td>
                </tr>
            </tbody>
            </table>
            {/* Driving evaluation */}
            <table className="card__table card__indicators">
            <tbody>
                <tr>
                <th style={{ width: 60 }}>КОД</th>
                <th style={{ width: 945 }}>АСПЕКТЫ ПОВЕДЕНИЯ</th>
                <th>БЕЗОПАСНО</th>
                <th>ОПАСНО</th>
                </tr>
                <tr className="card__table-green">
                <td>1.0</td>
                <td>ПРОЦЕДУРЫ</td>
                <td className="card__table-safety"></td>
                <td className="card__table-safety"></td>
                </tr>
                <tr>
                <td>1.1</td>
                <td>Подготовка к работе и выявление опасных факторов</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety1" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety1" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>1.2</td>
                <td>Соблюдение пошаговых производственных инструкций</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety2" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety2" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>1.3</td>
                <td>Соблюдение требований наряда-допуска</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety3" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety3" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>1.4</td>
                <td>Взаимосвязь с коллегами</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety25" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety25" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr className="card__table-green">
                <td>2.0</td>
                <td>СРЕДСТВА ИНДИВИДУАЛЬНОЙ ЗАЩИТЫ (СИЗ)</td>
                <td className="card__table-safety"></td>
                <td className="card__table-safety"></td>
                </tr>
                <tr>
                <td>2.1</td>
                <td>Защита тела (комбинезон)</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety4" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety4" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.2</td>
                <td>Защита головы</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety5" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety5" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.3</td>
                <td>Защита глаз и лица</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety6" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety6" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.4</td>
                <td>Защита органов слуха</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety7" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety7" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.5</td>
                <td>Защита органов дыхания</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety8" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety8" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.6</td>
                <td>Защита рук</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety9" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety9" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.7</td>
                <td>Защита ног</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety10" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety10" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>2.8</td>
                <td>Защита от падения</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety11" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety11" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr className="card__table-green">
                <td>3.0</td>
                <td>ПОЛОЖЕНИЕ / ДВИЖЕНИЕ ТЕЛА</td>
                <td className="card__table-safety"></td>
                <td className="card__table-safety"></td>
                </tr>
                <tr>
                <td>3.1</td>
                <td>Находиться «под ударом»</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety12" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety12" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>3.2</td>
                <td>Избегать точек защемления</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety13" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety13" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>3.3</td>
                <td>Следить за работой и смотреть под ноги</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety14" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety14" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>3.4</td>
                <td>Подниматься/спускаться (люди)</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety15" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety15" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>3.5</td>
                <td>Передвигаться по установленным дорожкам</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety16" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety16" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>3.6</td>
                <td>Поднимать/опускать/толкать/тянуть (груз)</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety17" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety17" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr className="card__table-green">
                <td>4.0</td>
                <td>Инструменты и оборудование</td>
                <td className="card__table-safety"></td>
                <td className="card__table-safety"></td>
                </tr>
                <tr>
                <td>4.1</td>
                <td>Выбор и использование инструментов /Оборудования</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety18" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety18" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>4.2</td>
                <td>
                    Использование защитных ограждений/Устройств предупредительной
                    сигнализации
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety19" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety19" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>5.0</td>
                <td>МЕСТО ПРОВЕДЕНИЯ РАБОТ</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety20" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety20" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>5.1</td>
                <td>Работа в стабильном положении</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety21" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety21" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>5.2</td>
                <td>
                    Уборка / хранение инструментов и jборудования (порядок на рабочем
                    месте)
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety22" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety22" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>5.3</td>
                <td>Раздельный сбор и хранение отходов</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety23" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety23" id="" defaultValue="danger" />
                </td>
                </tr>
                <tr>
                <td>5.4</td>
                <td>Соответствующая маркировка контейнеров c химикатами</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety24" id="" defaultValue="safe" />
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety24" id="" defaultValue="danger" />
                </td>
                </tr>
            </tbody>
            </table>
            {/* Comments */}
            <div className="comment">
            <div className="comment__header">
                КОММЕНТАРИИ <br />
                (положительные или отрицательные): <br />
                ЧТО?/КОГДА?/ПОЧЕМУ?/РЕШЕНИЕ
            </div>
            <textarea
                name="comment"
                id="comment"
                cols={130}
                rows={5}
                className="comment__content"
                defaultValue={""}
                placeholder="Comment"
            />
            </div>
            {/* Comments */}
            <div className="comment">
            <div className="comment__header">
                Комментарии по обратной связи в форме обмена <br /> мнениями между
                наблюдателем и наблюдаемым(и):
            </div>
            <textarea
                name="comment"
                id="comment"
                cols={130}
                rows={5}
                className="comment__content"
                defaultValue={""}
                placeholder="Comment"
            />
            </div>
            {/* ADDITION BUTTON */}
            <div className="create-doc__buttons" style={{ marginTop: 0 }}>
            <a
                href="./management_programs_doc_list.html"
                className="create-doc__cancel-button create-doc__button-text"
            >
                Отменить
            </a>
            <button
                type="submit"
                className="create-doc__button create-doc__button-text"
            >
                Сохранить
            </button>
            </div>
        </div>
    </div>

  );
};

export default PnbrCard;
