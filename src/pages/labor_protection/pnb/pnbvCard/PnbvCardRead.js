import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr_card.css";

const PnbvCardRead = () => {
  const [document, setDocument] = useState({});
  const { id } = useParams();

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
          <input type="radio" defaultValue="plan" id="plan" name="schedule"  checked={document?.plan} />
          <label htmlFor="plan">По графику</label>
        </div>
        <div>
          <input type="radio" defaultValue="fact" id="fact" name="schedule" checked={document?.plan} />
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
                value={document?.employeeFullName}
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
                value={document?.observerDrivingExperience}
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
                className="card__column-input" value={document?.outsourceDivisionName}
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
                className="card__column-input" value={document?.divisionName}
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
                className="card__column-input" value={document?.driverDrivingExperience}
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
                className="card__column-input" value={document?.dateFull}
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
                className="card__column-input" value={document?.startTime}
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
                className="card__column-input" value={document?.endTime}
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
                className="card__column-input" value={document?.location}
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
            <input type="radio" name="safety1" id="safe1" defaultValue="safe" checked={document?.safe1}/>
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety1" id="danger1" defaultValue="danger" checked={document?.danger1} />
          </td>
        </tr>
        <tr>
          <td>1.2</td>
          <td>Водитель использует ремень безопасности</td>
          <td className="card__table-safety">
            <input type="radio" name="safety2" id="safe2" defaultValue="safe" checked={document?.safe2} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety2" id="danger2" defaultValue="danger" checked={document?.danger2} />
          </td>
        </tr>
        <tr>
          <td>1.3</td>
          <td>
            Контролирует использование ремней безопасности всеми пассажирами
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety3" id="safe3" defaultValue="safe" checked={document?.safe3} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety3" id="danger3" defaultValue="danger" checked={document?.danger3} />
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
            <input type="radio" name="safety4" id="safe4" defaultValue="safe" checked={document?.safe4} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety4" id="danger4" defaultValue="danger" checked={document?.danger4} />
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
            <input type="radio" name="safety5" id="safe5" defaultValue="safe" checked={document?.safe5} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety5" id="danger5" defaultValue="danger" checked={document?.danger5} />
          </td>
        </tr>
        <tr>
          <td>2.3</td>
          <td>
            Соблюдает скорость, соответствующую дорожным и метеорологическим
            условиям
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety6" id="safe6" defaultValue="safe" checked={document?.safe6} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety6" id="danger6" defaultValue="danger" checked={document?.danger6} />
          </td>
        </tr>
        <tr>
          <td>2.4</td>
          <td>
            Снижает скорость при приближении к перекресткам и пешеходным
            переходам
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety7" id="safe7" defaultValue="safe" checked={document?.safe7} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety7" id="danger7" defaultValue="danger" checked={document?.danger7} />
          </td>
        </tr>
        <tr>
          <td>2.5</td>
          <td>Плавно тормозит и не осуществляет резких торможений</td>
          <td className="card__table-safety">
            <input type="radio" name="safety8" id="safe8" defaultValue="safe" checked={document?.safe8} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety8" id="danger8" defaultValue="danger" checked={document?.danger8} />
          </td>
        </tr>
        <tr>
          <td>2.6</td>
          <td>Безопасно совершает переезд перекрестков и ЖД путей</td>
          <td className="card__table-safety">
            <input type="radio" name="safety9" id="safe9" defaultValue="safe" checked={document?.safe9} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety9" id="danger9" defaultValue="danger" checked={document?.danger9} />
          </td>
        </tr>
        <tr>
          <td>2.7</td>
          <td>Безопасно совершает обгон</td>
          <td className="card__table-safety">
            <input type="radio" name="safety10" id="safe10" defaultValue="safe" checked={document?.safe10} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety10" id="danger10" defaultValue="danger" checked={document?.danger10} />
          </td>
        </tr>
        <tr>
          <td>2.8</td>
          <td>Своевременно использует внешние световые приборы</td>
          <td className="card__table-safety">
            <input type="radio" name="safety11" id="safe11" defaultValue="safe" checked={document?.safe11} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety11" id="danger11" defaultValue="danger" checked={document?.danger11} />
          </td>
        </tr>
        <tr>
          <td>2.9</td>
          <td>Не использует мобильный телефон во время движения ТС </td>
          <td className="card__table-safety">
            <input type="radio" name="safety12" id="safe12" defaultValue="safe" checked={document?.safe12} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety12" id="danger12" defaultValue="danger" checked={document?.danger12} />
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
            <input type="radio" name="safety13" id="safe13" defaultValue="safe" checked={document?.safe13} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety13" id="danger13" defaultValue="danger" checked={document?.danger13} />
          </td>
        </tr>
        <tr>
          <td>3.2</td>
          <td>Полностью останавливает ТС перед «СТОП» знаком</td>
          <td className="card__table-safety">
            <input type="radio" name="safety14" id="safe14" defaultValue="safe" checked={document?.safe14} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety14" id="danger14" defaultValue="danger" checked={document?.danger14} />
          </td>
        </tr>
        <tr>
          <td>3.3</td>
          <td>Безопасно совершает движение задним ходом</td>
          <td className="card__table-safety">
            <input type="radio" name="safety15" id="safe15" defaultValue="safe" checked={document?.safe15} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety15" id="danger15" defaultValue="danger" checked={document?.danger15} />
          </td>
        </tr>
        <tr>
          <td>3.4</td>
          <td>Паркует ТС в предназначенных для остановки местах</td>
          <td className="card__table-safety">
            <input type="radio" name="safety16" id="safe16" defaultValue="safe" checked={document?.safe16} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety16" id="danger16" defaultValue="danger" checked={document?.danger16} />
          </td>
        </tr>
        <tr>
          <td>3.5</td>
          <td>Осуществляет парковку ТС лицом к выезду</td>
          <td className="card__table-safety">
            <input type="radio" name="safety17" id="safe17" defaultValue="safe" checked={document?.safe17} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety17" id="danger17" defaultValue="danger" checked={document?.danger17} />
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
            <input type="radio" name="safety18" id="safe18" defaultValue="safe" checked={document?.safe18} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety18" id="danger18" defaultValue="danger" checked={document?.danger18} />
          </td>
        </tr>
        <tr>
          <td>4.2</td>
          <td>Технические неисправности</td>
          <td className="card__table-safety">
            <input type="radio" name="safety19" id="safe19" defaultValue="safe" checked={document?.safe19} />
          </td>
          <td className="card__table-safety">
            <input type="radio" name="safety19" id="danger19" defaultValue="danger" checked={document?.danger19} />
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
        value={document?.comment}
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
        id="comment2"
        cols={130}
        rows={5}
        className="comment__content"
        value={document?.comment2}
      />
    </div>
    {/* ADDITION BUTTON */}
    <div className="create-doc__buttons" style={{ marginTop: 0 }}>
      <a
        href="/labor_protection/list/48"
        className="create-doc__cancel-button create-doc__button-text"
      >
        Отменить
      </a>
      <button
        type="submit"
        className="create-doc__button create-doc__button-text"
        
      >
        Отправить
      </button>
    </div>
  </div>
</div>

  );
};

export default PnbvCardRead;
