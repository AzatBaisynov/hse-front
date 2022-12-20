import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../assets/style/siz_table.css";
// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeCardEdit = () => {
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "employeeSurname":
        setDocument({ ...document, employeeSurname: value });
        break;
      case "employeeName":
        setDocument({ ...document, employeeName: value });
        break;
      case "employeePatronymic":
        setDocument({ ...document, employeePatronymic: value });
        break;
      case "employeeSex":
        setDocument({ ...document, employeeSex: value });
        break;
      case "employeeId":
        setDocument({ ...document, employeeId: value });
        break;
      case "clothesSize":
        setDocument({ ...document, clothesSize: value });
        break;
      case "employeeHeight":
        setDocument({ ...document, employeeHeight: value });
        break;
      case "position":
        setDocument({ ...document, position: value });
        break;
      case "shoeSize":
        setDocument({ ...document, shoeSize: value });
        break;
      case "divisionName":
        setDocument({ ...document, divisionName: value });
        break;
      case "cmcCode":
        setDocument({ ...document, cmcCode: value });
        break;
      case "cmcName":
        setDocument({ ...document, cmcName: value });
        break;
      case "codeHeightSize":
        setDocument({ ...document, codeHeightSize: value });
        break;
      case "codeShoeSize":
        setDocument({ ...document, codeShoeSize: value });
        break;
      case "codeNoSize":
        setDocument({ ...document, codeNoSize: value });
        break;
      case "residencySign":
        setDocument({ ...document, residencySign: value });
        break;
      case "positionCode":
        setDocument({ ...document, positionCode: value });
        break;
      case "positionID":
        setDocument({ ...document, positionID: value });
        break;
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "category":
        setDocument({ ...document, category: value });
        break;
      case "project":
        setDocument({ ...document, project: value });
        break;
      case "divisionCode":
        setDocument({ ...document, divisionCode: value });
        break;
      case "warehouse":
        setDocument({ ...document, warehouse: value });
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
        alert(e);
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
              <form action="./pasports_create_doc.html">
                <button
                  className="create-doc-button button-general"
                  type="submit"
                  onClick={handleSend}
                >
                  Сохранить
                </button>
              </form>
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
                  <input type="text" id="employeeSurname" onInput={handleInput} value={document?.employeeSurname} />
                </td>
                <td>
                  <input type="text" id="employeeName" onInput={handleInput} value={document?.employeeName} />
                </td>
                <td>
                  <input
                    type="text"
                    id="employeePatronymic"
                    onInput={handleInput}
                    value={document?.employeePatronymic}
                  />
                </td>
                <td>
                  <input type="text" id="employeeSex" onInput={handleInput} value={document?.employeeSex} />
                </td>
                <td>
                  <input type="number" id="employeeId" onInput={handleInput} value={document?.employeeId} />
                </td>
                <td>
                  <input type="text" id="clothesSize" onInput={handleInput} value={document?.clothesSize} />
                </td>
                <td>
                  <input type="text" id="employeeHeight" onInput={handleInput} value={document?.employeeHeight} />
                </td>
                <td>
                  <input type="text" id="shoeSize" onInput={handleInput} value={document?.shoeSize} />
                </td>
                <td>
                  <input type="text" id="position" onInput={handleInput} value={document?.position} />
                </td>
                <td>
                  <input type="text" id="divisionName" onInput={handleInput} value={document?.divisionName} />
                </td>
                <td>
                  <input type="text" id="cmcCode" onInput={handleInput} value={document?.cmcCode} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ensk" style={{marginTop: "25px"}}>
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
                  <input type="text" id="cmcName" onInput={handleInput} value={document?.cmcName} />
                </td>
                <td>
                  <input type="text" id="codeHeightSize" onInput={handleInput} value={document?.codeHeightSize} />
                </td>
                <td>
                  <input
                    type="text"
                    id="codeShoeSize"
                    onInput={handleInput} value={document?.codeShoeSize}
                  />
                </td>
                <td>
                  <input type="text" id="codeNoSize" onInput={handleInput} value={document?.codeNoSize} />
                </td>
                <td>
                  <input type="text" id="residencySign" onInput={handleInput} value={document?.residencySign} />
                </td>
                <td>
                  <input type="text" id="positionCode" onInput={handleInput} value={document?.positionCode} />
                </td>
                <td>
                  <input type="text" id="positionID" onInput={handleInput} value={document?.positionID} />
                </td>
                <td>
                  <input type="date" id="dateFull" onInput={handleInput} value={document?.dateFull} />
                </td>
                <td>
                  <input type="text" id="category" onInput={handleInput} value={document?.category} />
                </td>
                <td>
                  <input type="text" id="project" onInput={handleInput} value={document?.project} />
                </td>
                <td>
                  <input type="text" id="divisionCode" onInput={handleInput} value={document?.divisionCode} />
                </td>
                <td>
                  <input type="text" id="warehouse" onInput={handleInput} value={document?.warehouse} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeCardEdit;
