import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../../assets/style/siz_table.css";
// import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import filterImage from "../../../../assets/images/doc-lict-filter.png";
import uploadDoc from "../../../../assets/images/labor-protecttion-upload-doc.svg";
import downloadDoc from "../../../../assets/images/labor-protecttion-download-doc.svg";
import { _LINK } from "../../../../data/links";

const PpeIssuanceCard = () => {
  const [file, setFile] = useState({});
  const [excel, setExcel] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const get = async () => {
      const config = {
        method: "GET",
        url: `${_LINK}/v1/api/org/ldap/all`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data } = await axios(config);
        console.log(data);
        setDepartments(data.departments);
        setUsers(data.users);
        setDocument({
          ...document,
          senderUser: data.users[0].username,
          issuingAuthority: data.users[0].department,
          makerUser: data.users[0].username,
        });
      } catch (e) {
        alert(e);
      }
    };
    get();
  }, []);

  const handleSelectFiles = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "indexNum":
        setDocument({ ...document, indexNum: value });
        break;
      case "sapNum":
        setDocument({ ...document, sapNum: value });
        break;
      case "employeeId":
        setDocument({ ...document, employeeId: value });
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
      case "cmcCode":
        setDocument({ ...document, cmcCode: value });
        break;
      case "issuancePeriod":
        setDocument({ ...document, issuancePeriod: value });
        break;
      case "comment":
        setDocument({ ...document, comment: value });
        break;
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
    }
  };

  const runLoader = async (isLoading) => {
    const loader = document.getElementById("loader");
    if (isLoading === true) {
      loader.style.display = "flex";
    } else {
      loader.style.display = "none";
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
    <>
      <div className="table-container">
        {/* UPPER PANEL */}
        <div className="doc-list__content">
          {/* HEAD PANEL */}
          <div className="doc-list__head-panel">
            {/* BUTTONS */}
            <div className="doc-list__buttons">
              <a
                href="./pasports_folders.html"
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
                <th>№</th>
                <th>Таб. № SAP / SAP No.</th>
                <th>ИИН / ID No.</th>
                <th>ФИО/Name</th>
                <th>Должность/ Профессия / Position</th>
                <th>Подразделение / Division</th>
                <th>Код МВЗ / CMC (cost management center) code</th>
                <th>Номер номенклатурный / Nomenclature number</th>
                <th>Наименование СИЗ / Name of PPE</th>
                <th>Ед. Изм/ Unit of measure</th>
                <th>Количество / Quantity</th>
                <th>Дата выдачи / Date of issuance</th>
              </tr>
              <tr className="numeration">
                <td />
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
              </tr>
              <tr className="table-input">
                <td>
                  <input
                    type="number"
                    id="indexNum"
                    style={{ width: 60 }}
                    onInput={handleInput}
                  />
                </td>
                <td>
                  <input type="text" id="sapNum" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="employeeId" onInput={handleInput} />
                </td>
                <td>
                  <select
                    onInput={handleInput}
                    name="employeeFullName"
                    id="employeeFullName"
                    className="create-doc__field-content"
                    style={{ width: "100%", height: "43%", borde: "none" }}
                  >
                    {users?.map((el, idx) => (
                      <option key={idx} value={el.username}>
                        {el.username}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onInput={handleInput}
                    name="position"
                    id="position"
                    className="create-doc__field-content"
                    style={{ height: "43%", borde: "none" }}
                  >
                    {users?.map((el, idx) => (
                      <option key={idx} value={el.userdesc}>
                        {el.userdesc}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onInput={handleInput}
                    name="divisionName"
                    id="divisionName"
                    className="create-doc__field-content"
                    style={{ width: "100%", height: "43%", borde: "none" }}
                  >
                    {users?.map((el, idx) => (
                      <option key={idx} value={el.department}>
                        {el.department}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input type="text" id="cmcCode" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="itemNum" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="ppeName" onInput={handleInput} />
                </td>
                <td>
                  <input type="text" id="measureUnit" onInput={handleInput} />
                </td>
                <td>
                  <input type="number" id="quantity" onInput={handleInput} />
                </td>
                <td>
                  <input type="date" id="dateFull" onInput={handleInput} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PpeIssuanceCard;
