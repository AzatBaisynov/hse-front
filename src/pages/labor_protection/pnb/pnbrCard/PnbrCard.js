import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr_card.css";

const PnbrCard = () => {
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "plan":
        setDocument({ ...document, plan: value });
        break;
      case "fact":
        setDocument({ ...document, fact: value });
        break;
      case "employeeFullName":
        setDocument({ ...document, employeeFullName: value });
        break;
      case "monitoredDep":
        setDocument({ ...document, monitoredDep: value });
        break;
      case "divisionName":
        setDocument({ ...document, divisionName: value });
        break;
      case "monitoredTask":
        setDocument({ ...document, monitoredTask: value });
        break;
      case "dateTime":
        setDocument({ ...document, dateTime: value });
        break;
      case "monitoringNum":
        setDocument({ ...document, monitoringNum: value });
        break;
      case "location":
        setDocument({ ...document, location: value });
        break;
      case "safe1":
        setDocument({ ...document, safe1: true });
        break;
      case "safe2":
        setDocument({ ...document, safe2: true });
        break;
      case "safe3":
        setDocument({ ...document, safe3: true });
        break;
      case "safe4":
        setDocument({ ...document, safe4: true });
        break;
      case "safe5":
        setDocument({ ...document, safe5: true });
        break;
      case "safe6":
        setDocument({ ...document, safe6: true });
        break;
      case "safe7":
        setDocument({ ...document, safe7: true });
        break;
      case "safe8":
        setDocument({ ...document, safe8: true });
        break;
      case "safe9":
        setDocument({ ...document, safe9: true });
        break;
      case "safe10":
        setDocument({ ...document, safe10: true });
        break;
      case "safe11":
        setDocument({ ...document, safe11: true });
        break;
      case "safe12":
        setDocument({ ...document, safe12: true });
        break;
      case "safe13":
        setDocument({ ...document, safe13: true });
        break;
      case "safe14":
        setDocument({ ...document, safe14: true });
        break;
      case "safe15":
        setDocument({ ...document, safe15: true });
        break;
      case "safe16":
        setDocument({ ...document, safe16: true });
        break;
      case "safe17":
        setDocument({ ...document, safe17: true });
        break;
      case "safe18":
        setDocument({ ...document, safe18: true });
        break;
      case "safe19":
        setDocument({ ...document, safe19: true });
        break;
      case "safe20":
        setDocument({ ...document, safe20: true });
        break;
      case "safe21":
        setDocument({ ...document, safe21: true });
        break;
      case "safe22":
        setDocument({ ...document, safe22: true });
        break;
      case "safe23":
        setDocument({ ...document, safe23: true });
        break;
      case "safe24":
        setDocument({ ...document, safe24: true });
        break;
      case "safe25":
        setDocument({ ...document, safe25: true });
        break;
        case "danger1":
        setDocument({ ...document, danger1: true });
        break;
      case "danger2":
        setDocument({ ...document, danger2: true });
        break;
      case "danger3":
        setDocument({ ...document, danger3: true });
        break;
      case "danger4":
        setDocument({ ...document, danger4: true });
        break;
      case "danger5":
        setDocument({ ...document, danger5: true });
        break;
      case "danger6":
        setDocument({ ...document, danger6: true });
        break;
      case "danger7":
        setDocument({ ...document, danger7: true });
        break;
      case "danger8":
        setDocument({ ...document, danger8: true });
        break;
      case "danger9":
        setDocument({ ...document, danger9: true });
        break;
      case "danger10":
        setDocument({ ...document, danger10: true });
        break;
      case "danger11":
        setDocument({ ...document, danger11: true });
        break;
      case "danger12":
        setDocument({ ...document, danger12: true });
        break;
      case "danger13":
        setDocument({ ...document, danger13: true });
        break;
      case "danger14":
        setDocument({ ...document, danger14: true });
        break;
      case "danger15":
        setDocument({ ...document, danger15: true });
        break;
      case "danger16":
        setDocument({ ...document, danger16: true });
        break;
      case "danger17":
        setDocument({ ...document, danger17: true });
        break;
      case "danger18":
        setDocument({ ...document, danger18: true });
        break;
      case "danger19":
        setDocument({ ...document, danger19: true });
        break;
      case "danger20":
        setDocument({ ...document, danger20: true });
        break;
      case "danger21":
        setDocument({ ...document, danger21: true });
        break;
      case "danger22":
        setDocument({ ...document, danger22: true });
        break;
      case "danger23":
        setDocument({ ...document, danger23: true });
        break;
      case "danger24":
        setDocument({ ...document, danger24: true });
        break;
      case "danger25":
        setDocument({ ...document, danger25: true });
        break;
      case "comment":
        setDocument({ ...document, comment: true });
        break;
      case "comment2":
        setDocument({ ...document, comment2: true });
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
            {/* Plan and Fact buttons */}
            <div className="card__plan-fact">
                <div>
                <input type="radio"  id="plan" name="schedule" onInput={handleInput}/>
                <label htmlFor="plan">По графику</label>
                </div>
                <div>
                <input type="radio" id="fact" name="schedule" onInput={handleInput}/>
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
                        onInput={handleInput}
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
                        onInput={handleInput}
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
                        onInput={handleInput}
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
                        onInput={handleInput}
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
                        onInput={handleInput}
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
                        onInput={handleInput}
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
                        onInput={handleInput}
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
                    <input type="radio" name="safety1" id="safe1" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety1" id="danger1" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>1.2</td>
                <td>Соблюдение пошаговых производственных инструкций</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety2" id="safe2" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety2" id="danger2" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>1.3</td>
                <td>Соблюдение требований наряда-допуска</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety3" id="safe3" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety3" id="danger3" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>1.4</td>
                <td>Взаимосвязь с коллегами</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety25" id="safe4" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety25" id="danger4" onInput={handleInput}/>
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
                    <input type="radio" name="safety4" id="safe5" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety4" id="danger5" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.2</td>
                <td>Защита головы</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety5" id="safe6" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety5" id="danger6" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.3</td>
                <td>Защита глаз и лица</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety6" id="safe7" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety6" id="danger7" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.4</td>
                <td>Защита органов слуха</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety7" id="safe8" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety7" id="danger8" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.5</td>
                <td>Защита органов дыхания</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety8" id="safe9" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety8" id="danger9" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.6</td>
                <td>Защита рук</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety9" id="safe10" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety9" id="safe10" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.7</td>
                <td>Защита ног</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety10" id="safe11" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety10" id="danger11" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>2.8</td>
                <td>Защита от падения</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety11" id="safe12" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety11" id="danger12" onInput={handleInput}/>
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
                    <input type="radio" name="safety12" id="safe13" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety12" id="danger13" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>3.2</td>
                <td>Избегать точек защемления</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety13" id="safe14" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety13" id="danger14" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>3.3</td>
                <td>Следить за работой и смотреть под ноги</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety14" id="safe15" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety14" id="danger15" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>3.4</td>
                <td>Подниматься/спускаться (люди)</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety15" id="safe16" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety15" id="danger16" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>3.5</td>
                <td>Передвигаться по установленным дорожкам</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety16" id="safe17" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety16" id="danger17"  onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>3.6</td>
                <td>Поднимать/опускать/толкать/тянуть (груз)</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety17" id="safe18"  onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety17" id="danger18"  onInput={handleInput}/>
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
                    <input type="radio" name="safety18" id="safe19"  onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety18" id="danger19"  onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>4.2</td>
                <td>
                    Использование защитных ограждений/Устройств предупредительной
                    сигнализации
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety19" id="safe20" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety19" id="danger20" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>5.0</td>
                <td>МЕСТО ПРОВЕДЕНИЯ РАБОТ</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety20" id="safe21" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety20" id="danger21" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>5.1</td>
                <td>Работа в стабильном положении</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety21" id="safe22" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety21" id="danger22" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>5.2</td>
                <td>
                    Уборка / хранение инструментов и оборудования (порядок на рабочем
                    месте)
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety22" id="safe23" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety22" id="danger23" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>5.3</td>
                <td>Раздельный сбор и хранение отходов</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety23" id="safe24" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety23" id="danger24" onInput={handleInput}/>
                </td>
                </tr>
                <tr>
                <td>5.4</td>
                <td>Соответствующая маркировка контейнеров c химикатами</td>
                <td className="card__table-safety">
                    <input type="radio" name="safety24" id="safe25" onInput={handleInput}/>
                </td>
                <td className="card__table-safety">
                    <input type="radio" name="safety24" id="danger25" onInput={handleInput}/>
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
                placeholder="Comment"
                onInput={handleInput}
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
                id="comment2"
                cols={130}
                rows={5}
                className="comment__content"
                placeholder="Comment"
                onInput={handleInput}
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
                onClick={handleSend}
            >
                Отправить
            </button>
            </div>
        </div>
    </div>

  );
};

export default PnbrCard;