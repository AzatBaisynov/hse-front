import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../assets/style/siz_table.css";
// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import filterImage from "../../../assets/images/doc-lict-filter.png";
import uploadDoc from "../../../assets/images/labor-protecttion-upload-doc.svg";
import downloadDoc from "../../../assets/images/labor-protecttion-download-doc.svg";
import { _LINK } from "../../../data/links";

const EmployeeCard = () => {
  const [file, setFile] = useState({});
  const [excel, setExcel] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);

  const handleSelectFiles = (e) => {
    setFile(e.target.files[0]);
  };

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
      console.log(e);
    }
    alert("Запись добавлена");
  };

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
                  Отправить
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
                  <input type="text" id="employeeSurname" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="employeeName" onInput={handleInput} />
                </td>
                <td>
                  <input
                    type="text"
                    id="employeePatronymic"
                    onInput={handleInput}
                  />
                </td>
                <td>
                  <input type="text" id="employeeSex" onInput={handleInput} />
                </td>
                <td>
                  <input type="number" id="employeeId" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="clothesSize" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="employeeHeight" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="shoeSize" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="position" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="divisionName" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="cmcCode" onInput={handleInput} />
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
                  <input type="text" id="cmcName" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="codeHeightSize" onInput={handleInput} />
                </td>
                <td>
                  <input
                    type="text"
                    id="codeShoeSize"
                    onInput={handleInput}
                  />
                </td>
                <td>
                  <input type="text" id="codeNoSize" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="residencySign" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="positionCode" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="positionID" onInput={handleInput} />
                </td>
                <td>
                  <input type="date" id="dateFull" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="category" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="project" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="divisionCode" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="warehouse" onInput={handleInput} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeCard;
