import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr_card.css";

const PnbvCard = () => {
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
      Карточка поведенческого наблюдения по безопасности вождения
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
              />
            </div>
          </td>
          <td>
            <div className="card__column-unit">
              <p>СТРУКТУРНОЕ ПОДРАЗДЕЛЕНИЕ/АУТСОРСИНГ:</p>
              <input
                type="text"
                name="employeeFullName"
                id="outsourceDivisionName"
                className="card__column-input"
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
              />
            </div>
          </td>
          <td>
            {/* Driver's driving experience */}
            <div className="card__column-unit">
              <p>СТАЖ ВОЖДЕНИЯ ВОДИТЕЛЯ:</p>
              <input
                type="text"
                name="observerDrivingExperience"
                id="driverDrivingExperience"
                className="card__column-input"
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
            Предпоездковая проверка автомобиля, а также осмотр помех вокруг ТС
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety1" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety1" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>1.2</td>
          <td>Водитель использует ремень безопасности</td>
          <td className="card__table-safety">
            <input type="radio" name="safety2" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety2" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>1.3</td>
          <td>
            Контролирует использование ремней безопасности всеми пассажирами
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety3" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety3" id="" defaultValue="danger" />
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
          <td>Водитель соблюдает безопасную дистанцию во время движения ТС</td>
          <td className="card__table-safety">
            <input type="radio" name="safety4" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety4" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.2</td>
          <td>
            Безопасно совершает перестроение, использует сигнал поворота и
            проверяет обстановку в зеркалах бокового и заднего вида заранее до
            начала маневра
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety5" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety5" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.3</td>
          <td>
            Соблюдает скорость, соответствующую дорожным и метеорологическим
            условиям
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety6" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety6" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.4</td>
          <td>
            Снижает скорость при приближении к перекресткам и пешеходным
            переходам
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety7" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety7" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.5</td>
          <td>Плавно тормозит и не осуществляет резких торможений</td>
          <td className="card__table-safety">
            <input type="radio" name="safety8" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety8" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.6</td>
          <td>Безопасно совершает переезд перекрестков и ЖД путей</td>
          <td className="card__table-safety">
            <input type="radio" name="safety9" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety9" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.7</td>
          <td>Безопасно совершает обгон</td>
          <td className="card__table-safety">
            <input type="radio" name="safety10" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety10" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.8</td>
          <td>Своевременно использует внешние световые приборы</td>
          <td className="card__table-safety">
            <input type="radio" name="safety11" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety11" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>2.9</td>
          <td>Не использует мобильный телефон во время движения ТС </td>
          <td className="card__table-safety">
            <input type="radio" name="safety12" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety12" id="" defaultValue="danger" />
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
          <td>Водитель соблюдает безопасную дистанцию во время остановки ТС</td>
          <td className="card__table-safety">
            <input type="radio" name="safety13" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety13" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>3.2</td>
          <td>Полностью останавливает ТС перед «СТОП» знаком</td>
          <td className="card__table-safety">
            <input type="radio" name="safety14" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety14" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>3.3</td>
          <td>Безопасно совершает движение задним ходом</td>
          <td className="card__table-safety">
            <input type="radio" name="safety15" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety15" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>3.4</td>
          <td>Паркует ТС в предназначенных для остановки местах</td>
          <td className="card__table-safety">
            <input type="radio" name="safety16" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety16" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>3.5</td>
          <td>Осуществляет парковку ТС лицом к выезду</td>
          <td className="card__table-safety">
            <input type="radio" name="safety17" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety17" id="" defaultValue="danger" />
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
            <input type="radio" name="safety18" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety18" id="" defaultValue="danger" />
          </td>
        </tr>
        <tr>
          <td>4.2</td>
          <td>Технические неисправности</td>
          <td className="card__table-safety">
            <input type="radio" name="safety19" id="" defaultValue="safe" />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety19" id="" defaultValue="danger" />
          </td>
        </tr>
      </tbody>
    </table>
    {/* Comments */}
    <div className="comment">
      <div className="comment__header">
        КОММЕНТАРИИ НАБЛЮДАТЕЛЯ <br />
        (прокомментируйте положительные или отрицательные аспекты вождения, а
        также комментарии по обратной связи между наблюдателем и водителем){" "}
        <br />
        ЧТО?/КОГДА?/ПОЧЕМУ?/РЕШЕНИЕ
      </div>
      <textarea
        name="comment"
        id="comment"
        cols={130}
        rows={5}
        className="comment__content"
        defaultValue={""}
      />
    </div>
    {/* Comments */}
    <div className="comment">
      <div className="comment__header">
        КОММЕНТАРИИ ВОДИТЕЛЯ <br />
        (Если вы не согласны с отзывом или комментариями, то обязательно опишите
        их ниже):
      </div>
      <textarea
        name="comment"
        id="comment"
        cols={130}
        rows={5}
        className="comment__content"
        defaultValue={""}
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

export default PnbvCard;
