import axios from "axios";
import React, { useEffect, useState } from "react";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr_card.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const PnbrCardRead = () => {
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
        console.log(e);
      }
    };
    getDocument();
  }, []);

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
              <input
                type="radio"
                id="plan"
                name="schedule"
                checked={document?.plan}
              />
              <label htmlFor="plan">По графику</label>
            </div>
            <div>
              <input
                type="radio"
                id="fact"
                name="schedule"
                checked={document?.fact}
              />
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
                    value={document?.employeeFullName}
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
                    value={document?.monitoredDep}
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
                    value={document?.divisionName}
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
                    value={document?.monitoredTask}
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
                    value={document?.dateTime}
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
                    value={document?.monitoringNum}
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
                    value={document?.location}
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
                <input
                  type="radio"
                  name="safety1"
                  id="safe1"
                  checked={document?.safe1}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety1"
                  id="danger1"
                  checked={document?.danger1}
                />
              </td>
            </tr>
            <tr>
              <td>1.2</td>
              <td>Соблюдение пошаговых производственных инструкций</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety2"
                  id="safe2"
                  checked={document?.safe2}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety2"
                  id="danger2"
                  checked={document?.danger2}
                />
              </td>
            </tr>
            <tr>
              <td>1.3</td>
              <td>Соблюдение требований наряда-допуска</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety3"
                  id="safe3"
                  checked={document?.safe3}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety3"
                  id="danger3"
                  checked={document?.danger3}
                />
              </td>
            </tr>
            <tr>
              <td>1.4</td>
              <td>Взаимосвязь с коллегами</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety25"
                  id="safe4"
                  checked={document?.safe4}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety25"
                  id="danger4"
                  checked={document?.danger4}
                />
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
                <input
                  type="radio"
                  name="safety4"
                  id="safe5"
                  checked={document?.safe5}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety4"
                  id="danger5"
                  checked={document?.danger5}
                />
              </td>
            </tr>
            <tr>
              <td>2.2</td>
              <td>Защита головы</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety5"
                  id="safe6"
                  checked={document?.safe6}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety5"
                  id="danger6"
                  checked={document?.danger6}
                />
              </td>
            </tr>
            <tr>
              <td>2.3</td>
              <td>Защита глаз и лица</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety6"
                  id="safe7"
                  checked={document?.safe7}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety6"
                  id="danger7"
                  checked={document?.danger7}
                />
              </td>
            </tr>
            <tr>
              <td>2.4</td>
              <td>Защита органов слуха</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety7"
                  id="safe8"
                  checked={document?.safe8}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety7"
                  id="danger8"
                  checked={document?.danger8}
                />
              </td>
            </tr>
            <tr>
              <td>2.5</td>
              <td>Защита органов дыхания</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety8"
                  id="safe9"
                  checked={document?.safe9}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety8"
                  id="danger9"
                  checked={document?.danger9}
                />
              </td>
            </tr>
            <tr>
              <td>2.6</td>
              <td>Защита рук</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety9"
                  id="safe10"
                  checked={document?.safe10}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety9"
                  id="danger10"
                  checked={document?.danger10}
                />
              </td>
            </tr>
            <tr>
              <td>2.7</td>
              <td>Защита ног</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety10"
                  id="safe11"
                  checked={document?.safe11}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety10"
                  id="danger11"
                  checked={document?.danger11}
                />
              </td>
            </tr>
            <tr>
              <td>2.8</td>
              <td>Защита от падения</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety11"
                  id="safe12"
                  checked={document?.safe12}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety11"
                  id="danger12"
                  checked={document?.danger12}
                />
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
                <input
                  type="radio"
                  name="safety12"
                  id="safe13"
                  checked={document?.safe13}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety12"
                  id="danger13"
                  checked={document?.danger13}
                />
              </td>
            </tr>
            <tr>
              <td>3.2</td>
              <td>Избегать точек защемления</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety13"
                  id="safe14"
                  checked={document?.safe14}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety13"
                  id="danger14"
                  checked={document?.danger14}
                />
              </td>
            </tr>
            <tr>
              <td>3.3</td>
              <td>Следить за работой и смотреть под ноги</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety14"
                  id="safe15"
                  checked={document?.safe15}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety14"
                  id="danger15"
                  checked={document?.danger15}
                />
              </td>
            </tr>
            <tr>
              <td>3.4</td>
              <td>Подниматься/спускаться (люди)</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety15"
                  id="safe16"
                  checked={document?.safe16}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety15"
                  id="danger16"
                  checked={document?.danger16}
                />
              </td>
            </tr>
            <tr>
              <td>3.5</td>
              <td>Передвигаться по установленным дорожкам</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety16"
                  id="safe17"
                  checked={document?.safe17}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety16"
                  id="danger17"
                  checked={document?.danger17}
                />
              </td>
            </tr>
            <tr>
              <td>3.6</td>
              <td>Поднимать/опускать/толкать/тянуть (груз)</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety17"
                  id="safe18"
                  checked={document?.safe18}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety17"
                  id="danger18"
                  checked={document?.danger18}
                />
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
                <input
                  type="radio"
                  name="safety18"
                  id="safe19"
                  checked={document?.safe19}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety18"
                  id="danger19"
                  checked={document?.danger19}
                />
              </td>
            </tr>
            <tr>
              <td>4.2</td>
              <td>
                Использование защитных ограждений/Устройств предупредительной
                сигнализации
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety19"
                  id="safe20"
                  checked={document?.safe20}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety19"
                  id="danger20"
                  checked={document?.danger20}
                />
              </td>
            </tr>
            <tr>
              <td>5.0</td>
              <td>МЕСТО ПРОВЕДЕНИЯ РАБОТ</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety20"
                  id="safe21"
                  checked={document?.safe21}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety20"
                  id="danger21"
                  checked={document?.danger21}
                />
              </td>
            </tr>
            <tr>
              <td>5.1</td>
              <td>Работа в стабильном положении</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety21"
                  id="safe22"
                  checked={document?.safe22}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety21"
                  id="danger22"
                  checked={document?.danger22}
                />
              </td>
            </tr>
            <tr>
              <td>5.2</td>
              <td>
                Уборка / хранение инструментов и оборудования (порядок на
                рабочем месте)
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety22"
                  id="safe23"
                  checked={document?.safe23}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety22"
                  id="danger23"
                  checked={document?.danger23}
                />
              </td>
            </tr>
            <tr>
              <td>5.3</td>
              <td>Раздельный сбор и хранение отходов</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety23"
                  id="safe24"
                  checked={document?.safe24}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety23"
                  id="danger24"
                  checked={document?.danger24}
                />
              </td>
            </tr>
            <tr>
              <td>5.4</td>
              <td>Соответствующая маркировка контейнеров c химикатами</td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety24"
                  id="safe25"
                  checked={document?.safe25}
                />
              </td>
              <td className="card__table-safety">
                <input
                  type="radio"
                  name="safety24"
                  id="danger25"
                  checked={document?.danger25}
                />
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
            value={document?.comment}
            cols={130}
            rows={5}
            className="comment__content"
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
            id="comment2"
            value={document?.comment2}
            cols={130}
            rows={5}
            className="comment__content"
            placeholder="Comment"
          />
        </div>
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons" style={{ marginTop: 0 }}>
        <NavLink
            exact
            to="/labor_protection/list/47"
            className="create-doc-button button-general"
          >
            Закрыть
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PnbrCardRead;
