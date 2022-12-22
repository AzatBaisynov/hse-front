import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../assets/style/siz_table.css";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";

const EmployeeCardRead = () => {
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
        console.log(e);
      }
    };
    getDocument();
  }, []);

  return (
    <>
      <div className="table-container">
        {/* UPPER PANEL */}
        <div className="doc-list__content">
          {/* HEAD PANEL */}
          <div className="doc-list__head-panel">
            {/* BUTTONS */}
            <div className="doc-list__buttons">
              <a
                href="/labor_protection/list/65"
                className="go-back-button button-general nohover"
              >
                Назад
              </a>
              <button
                className="create-doc-button button-general"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/labor/employees/cards/edit/${document?.id}`, {
                    replace: true,
                  });
                }}
              >
                Редактировать
              </button>
            </div>
          </div>
        </div>
        <div className="ensk">
          <table className="ensk-table">
            <tbody>
              <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Отчество</th>
                <th>Пол</th>
                <th>ИИН_сотрудника</th>
                <th>Размер_одежда</th>
                <th>Рост</th>
                <th>Размер_обувь</th>
                <th>Должность / Position</th>
                <th>Подразделение / Division</th>
                <th>МВЗ / CMC code (cost management center)</th>
              </tr>
              <tr className="table-input">
                <td>
                  <input
                    type="text"
                    id="employeeSurname"
                    value={document?.employeeSurname}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="employeeName"
                    value={document?.employeeName}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="employeePatronymic"
                    value={document?.employeePatronymic}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="employeeSex"
                    value={document?.employeeSex}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    id="employeeId"
                    value={document?.employeeId}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="clothesSize"
                    value={document?.clothesSize}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="employeeHeight"
                    value={document?.employeeHeight}
                  />
                </td>
                <td>
                  <input type="text" id="shoeSize" value={document?.shoeSize} />
                </td>
                <td>
                  <input type="text" id="position" value={document?.position} />
                </td>
                <td>
                  <input
                    type="text"
                    id="divisionName"
                    value={document?.divisionName}
                  />
                </td>
                <td>
                  <input type="text" id="cmcCode" value={document?.cmcCode} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ensk" style={{ marginTop: "25px" }}>
          <table className="ensk-table">
            <tbody>
              <tr>
                <th>Наименование_МВЗ / Name of CMC</th>
                <th>Код_Рост_Размер / Code_Height_Size</th>
                <th>Код_Размер_Обувь / Code_Size_Shoes</th>
                <th>Код_Без_Размера/ Code without size</th>
                <th>Признак резидентства / Sign of residency</th>
                <th>Код_гр_долж/ code of position</th>
                <th>IDДолжн/ ID of the position</th>
                <th>Дата / Date</th>
                <th>Раздел / Category</th>
                <th>Проект / Project</th>
                <th>Код_подразПр/Code of division</th>
                <th>Склад обслуживания/warehouse</th>
              </tr>
              <tr className="table-input">
                <td>
                  <input type="text" id="cmcName" value={document?.cmcName} />
                </td>
                <td>
                  <input
                    type="text"
                    id="codeHeightSize"
                    value={document?.codeHeightSize}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="codeShoeSize"
                    value={document?.codeShoeSize}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="codeNoSize"
                    value={document?.codeNoSize}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="residencySign"
                    value={document?.residencySign}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="positionCode"
                    value={document?.positionCode}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="positionID"
                    value={document?.positionID}
                  />
                </td>
                <td>
                  <input type="date" id="dateFull" value={document?.dateFull} />
                </td>
                <td>
                  <input type="text" id="category" value={document?.category} />
                </td>
                <td>
                  <input type="text" id="project" value={document?.project} />
                </td>
                <td>
                  <input
                    type="text"
                    id="divisionCode"
                    value={document?.divisionCode}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="warehouse"
                    value={document?.warehouse}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeCardRead;
