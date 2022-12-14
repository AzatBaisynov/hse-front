import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr_card.css";

const PnbvCard = () => {
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "employeeFullName":
        setDocument({ ...document, employeeFullName: value });
        break;
      case "observerDrivingExperience":
        setDocument({ ...document, observerDrivingExperience: value });
        break;
      case "divisionName":
        setDocument({ ...document, divisionName: value });
        break;
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "startTime":
        setDocument({ ...document, startTime: value });
        break;
      case "endTime":
        setDocument({ ...document, endTime: value });
        break;
      case "outsourceDivisionName":
        setDocument({ ...document, outsourceDivisionName: value });
        break;
      case "driverDrivingExperience":
        setDocument({ ...document, driverDrivingExperience: value });
        break;
      case "location":
        setDocument({ ...document, location: value });
        break;
      case "comment":
        setDocument({ ...document, comment: value });
        break;
      case "comment2":
        setDocument({ ...document, comment2: value });
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
          Карточка поведенческого наблюдения по безопасности вождения
        </p>
        {/* Upper row buttons */}
        <div className="card__btn-row">
          {/* Plan and Fact buttons */}
          <div className="card__plan-fact">
            <div>
              <input
                type="radio"
                defaultValue="plan"
                id="plan"
                name="schedule"
                onInput={handleInput}
              />
              <label htmlFor="plan">По графику</label>
            </div>
            <div>
              <input
                type="radio"
                defaultValue="fact"
                id="fact"
                name="schedule"
                onInput={handleInput}
              />
              <label htmlFor="plan">Не по графику</label>
            </div>
          </div>
        </div>
        {/* Card table */}
        <table className="card__table">
          <tbody>
            <tr>
              <th colSpan={3}>НАБЛЮДАТЕЛЬ</th>
              <th>ВОДИТЕЛЬ</th>
            </tr>
            <tr>
              <td colSpan={3}>
                <div className="_horizontal">
                  <p>Ф.И.О.:</p>
                  <input
                    type="text"
                    name="employeeFullName"
                    id="employeeFullName"
                    className="card__column-input"
                    onInput={handleInput}
                  />
                </div>
                <div className="_horizontal">
                  {/* Observer's driving experience */}
                  <p>СТАЖ ВОЖДЕНИЯ НАБЛЮДАТЕЛЯ:</p>
                  <input
                    type="text"
                    name="observerDrivingExperience"
                    id="observerDrivingExperience"
                    className="card__column-input"
                    onInput={handleInput}
                  />
                </div>
              </td>
              <td>
                <div className="card__column-unit">
                  <p>СТРУКТУРНОЕ ПОДРАЗДЕЛЕНИЕ/АУТСОРСИНГ:</p>
                  <input
                    type="text"
                    name="outsourceDivisionName"
                    id="outsourceDivisionName"
                    className="card__column-input"
                    onInput={handleInput}
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
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
                  <p>СТАЖ ВОЖДЕНИЯ ВОДИТЕЛЯ:</p>
                  <input
                    type="text"
                    name="driverDrivingExperience"
                    id="driverDrivingExperience"
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
                  <p>ДАТА ПОЕЗДКИ:</p>
                  <input
                    type="date"
                    name="rideDate"
                    id="dateFull"
                    className="card__column-input"
                    onInput={handleInput}
                  />
                </div>
              </td>
              <td>
                {/* Observer's ride start */}
                <div className="card__column-unit">
                  <p>НАЧАЛО:</p>
                  <input
                    type="time"
                    name="startTime"
                    id="startTime"
                    className="card__column-input"
                    onInput={handleInput}
                  />
                </div>
              </td>
              <td>
                {/* Observer's ride end */}
                <div className="card__column-unit">
                  <p>ОКОНЧАНИЕ:</p>
                  <input
                    type="time"
                    name="endTime"
                    id="endTime"
                    className="card__column-input"
                    onInput={handleInput}
                  />
                </div>
              </td>
              <td>
                {/* Observer's location */}
                <div className="card__column-unit">
                  <p>УЧАСТОК /МАРШРУТ:</p>
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
              <th style={{ width: 945 }}>АСПЕКТЫ ВОЖДЕНИЯ</th>
              <th>БЕЗОПАСНО</th>
              <th>ОПАСНО</th>
            </tr>
            <tr className="card__table-green">
              <td>1.0</td>
              <td>ПЕРЕД НАЧАЛОМ ПОЕЗДКИ</td>
              <td className="card__table-safety"></td>
              <td className="card__table-safety"></td>
            </tr>
            <tr>
              <td>1.1</td>
              <td>
                Предпоездковая проверка автомобиля, а также осмотр помех вокруг
                ТС
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety1"
                  id="safe1"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety1"
                  id="danger1"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>1.2</td>
              <td>Водитель использует ремень безопасности</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety2"
                  id="safe2"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety2"
                  id="danger2"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>1.3</td>
              <td>
                Контролирует использование ремней безопасности всеми пассажирами
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety3"
                  id="safe3"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety3"
                  id="danger3"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr className="card__table-green">
              <td>2.0</td>
              <td>ВО ВРЕМЯ ПОЕЗДКИ</td>
              <td className="card__table-safety"></td>
              <td className="card__table-safety"></td>
            </tr>
            <tr>
              <td>2.1</td>
              <td>
                Водитель соблюдает безопасную дистанцию во время движения ТС
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety4"
                  id="safe4"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety4"
                  id="danger4"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.2</td>
              <td>
                Безопасно совершает перестроение, использует сигнал поворота и
                проверяет обстановку в зеркалах бокового и заднего вида заранее
                до начала маневра
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety5"
                  id="safe5"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety5"
                  id="danger5"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.3</td>
              <td>
                Соблюдает скорость, соответствующую дорожным и метеорологическим
                условиям
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety6"
                  id="safe6"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety6"
                  id="danger6"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.4</td>
              <td>
                Снижает скорость при приближении к перекресткам и пешеходным
                переходам
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety7"
                  id="safe7"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety7"
                  id="danger7"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.5</td>
              <td>Плавно тормозит и не осуществляет резких торможений</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety8"
                  id="safe8"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety8"
                  id="danger8"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.6</td>
              <td>Безопасно совершает переезд перекрестков и ЖД путей</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety9"
                  id="safe9"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety9"
                  id="danger9"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.7</td>
              <td>Безопасно совершает обгон</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety10"
                  id="safe10"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety10"
                  id="danger10"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.8</td>
              <td>Своевременно использует внешние световые приборы</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety11"
                  id="safe11"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety11"
                  id="danger11"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>2.9</td>
              <td>Не использует мобильный телефон во время движения ТС </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety12"
                  id="safe12"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety12"
                  id="danger12"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr className="card__table-green">
              <td>3.0</td>
              <td>ОСТАНОВКА, ДВИЖЕНИЕ ЗАДНИМ ХОДОМ И ПАРКОВКА ТС</td>
              <td className="card__table-safety"></td>
              <td className="card__table-safety"></td>
            </tr>
            <tr>
              <td>3.1</td>
              <td>
                Водитель соблюдает безопасную дистанцию во время остановки ТС
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety13"
                  id="safe13"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety13"
                  id="danger13"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>3.2</td>
              <td>Полностью останавливает ТС перед «СТОП» знаком</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety14"
                  id="safe14"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety14"
                  id="danger14"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>3.3</td>
              <td>Безопасно совершает движение задним ходом</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety15"
                  id="safe15"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety15"
                  id="danger15"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>3.4</td>
              <td>Паркует ТС в предназначенных для остановки местах</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety16"
                  id="safe16"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety16"
                  id="danger16"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>3.5</td>
              <td>Осуществляет парковку ТС лицом к выезду</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety17"
                  id="safe17"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety17"
                  id="danger17"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr className="card__table-green">
              <td>4.0</td>
              <td>ДРУГИЕ АСПЕКТЫ ВОЖДЕНИЯ ИЛИ ТЕХНИЧЕСКОГО СОСТОЯНИЯ ТС</td>
              <td className="card__table-safety"></td>
              <td className="card__table-safety"></td>
            </tr>
            <tr>
              <td>4.1</td>
              <td>Чувствовали ли вы себя безопасно во время поездки</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety18"
                  id="safe18"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety18"
                  id="danger18"
                  onInput={handleInput}
                />
              </td>
            </tr>
            <tr>
              <td>4.2</td>
              <td>Технические неисправности</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety19"
                  id="safe19"
                  onInput={handleInput}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety19"
                  id="danger19"
                  onInput={handleInput}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/* Comments */}
        <div className="comment">
          <div className="comment__header">
            КОММЕНТАРИИ НАБЛЮДАТЕЛЯ <br />
            (прокомментируйте положительные или отрицательные аспекты вождения,
            а также комментарии по обратной связи между наблюдателем и
            водителем) <br />
            ЧТО?/КОГДА?/ПОЧЕМУ?/РЕШЕНИЕ
          </div>
          <textarea
            name="comment"
            id="comment"
            cols={130}
            rows={5}
            className="comment__content"
            onInput={handleInput}
          />
        </div>
        {/* Comments */}
        <div className="comment">
          <div className="comment__header">
            КОММЕНТАРИИ ВОДИТЕЛЯ <br />
            (Если вы не согласны с отзывом или комментариями, то обязательно
            опишите их ниже):
          </div>
          <textarea
            name="comment"
            id="comment2"
            cols={130}
            rows={5}
            className="comment__content"
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

export default PnbvCard;
