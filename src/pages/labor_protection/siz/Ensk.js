import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../assets/style/siz_table.css";
import { NavLink } from "react-router-dom";
import filterImage from "../../../assets/images/doc-lict-filter.png";
import uploadDoc from "../../../assets/images/labor-protecttion-upload-doc.svg";
import downloadDoc from "../../../assets/images/labor-protecttion-download-doc.svg";
import { _LINK } from "../../../data/links";
import loader from "../../../assets/images/loader.gif";

const Ensk = () => {
  const [file, setFile] = useState({});
  const [excel, setExcel] = useState({});

  const handleSelectFiles = (e) => {
    setFile(e.target.files[0]);
  };

  const runLoader = async (isLoading) => {
    const loader = document.getElementById("loader");
    if (isLoading === true) {
      loader.style.display = "flex";
    } else {
      loader.style.display = "none";
    }
  }

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      if (file?.name) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        runLoader(true);
        try {
          await axios.post(`${_LINK}/v1/api/file/excel?skip=1&type=1&date=2022-10-12`, formData, {
            headers: {
              "Authorization": localStorage.getItem("token")
            },
          })
        } catch(e) {
          console.log(e);
        }
        runLoader(false);
      }
    } catch(e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getArray = async () => {
      const config = {
        method: "get",
        url: `${_LINK}/v1/api/file/excel/get?type=1`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data } = await axios(config);
        setExcel(data);
      } catch (e) {
        console.log(e);
        setExcel({});
      }
    }
    getArray();
  },
  []
  )

  function createTable() {
    const table = excel.excelRows?.map((row) => (
      <tr>
        {row.cells.map((cell) => (
          <td>{cell.cellValue}</td>
        ))}
      </tr>
    ));

    return <tbody>{table}</tbody>;
  }

  return (
    <div className="table-container">
      {/* UPPER PANEL */}
      <div className="doc-list__content">
        {/* HEAD PANEL */}
        <div className="doc-list__head-panel">
          {/* BUTTONS */}
          <div className="doc-list__buttons">
            <NavLink
              to="/labor_protection/folders/1/nest/0"
              className="go-back-button button-general nohover"
            >
              Назад
            </NavLink>
            {/* ADD FIELD */}
            <form action="./pasports_create_doc.html">
              <button className="create-doc-button button-general" type="submit" onClick={handleSend}>
                Отправить
              </button>
            </form>
          </div>
          {/* SEARCH AND FILTER */}
          <div className="doc-list__search-row">
            {/* DOCUMENT UPLOAD BUTTON */}
            <label htmlFor="uploadExcel" id="ensk-upload-doc">
              <img
                src={uploadDoc}
                alt="upload-doc-btn"
                className="doc-list__filter"
              />
            </label>
            <input
              type="file"
              id="uploadExcel"
              hidden
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onInput={handleSelectFiles}
            />
            {/* DOCUMENT DOWNLOAD BUTTON */}
            <button id="ensk-download-doc">
              <img
                src={downloadDoc}
                alt="download-doc-button"
                className="doc-list__filter"
              />
            </button>
            {/* FILTER BUTTON */}
            <img
              src={filterImage}
              alt="filter"
              className="doc-list__filter"
              // onclick={openFilter()}
            />
            {/* FILTER POPUP */}
            <div className="filter-popup" id="filter">
              <p className="filter-title">Фильтр</p>
              <form action="" className="filter-form">
                <div className="form__field">
                  <label htmlFor="filterDate" className="form__field-title">
                    Дата
                  </label>
                  <input
                    type="date"
                    name="filterDate"
                    id="filterDate"
                    className="form__field-content"
                  />
                </div>
                <div className="form__field">
                  <label
                    htmlFor="responsibleDepartment"
                    className="form__field-title"
                  >
                    Ответственный департамент
                  </label>
                  <select
                    name="responsibleDepartment"
                    id="responsibleDep"
                    className="form__field-content"
                  >
                    <option value="security-dep">
                      Департамент безопасности
                    </option>
                    <option value="hr-dep">Департамент HR</option>
                    <option value="iso-dep">Департамент ПБ, ОТ, Э и ИСО</option>
                    <option value="inner-control-dep">
                      Служба внутреннего контроля
                    </option>
                  </select>
                </div>
                <div className="form__field">
                  <label htmlFor="revisionTime" className="form__field-title">
                    Срок пересмотра
                  </label>
                  <select
                    name="revisionTime"
                    id="revisionTime"
                    className="form__field-content"
                  >
                    <option value="3-months">3 месяца</option>
                    <option value="6-months">6 месяцев</option>
                    <option value="1-year">1 год</option>
                    <option value="3years">3 года</option>
                  </select>
                </div>
                <div className="form__field">
                  <label htmlFor="" className="form__field-title">
                    ФИО исполнителя
                  </label>
                  <input
                    type="text"
                    name="employeeName"
                    id="employeeName"
                    className="form__field-content"
                  />
                </div>
                <button type="submit" className="filter-button">
                  Применить
                </button>
              </form>
            </div>
            {/* SEARCH FIELD */}
            <input
              type="search"
              name="doc-search"
              id="#"
              className="doc-filter__search"
              placeholder="Поиск по ключевым словам"
            />
          </div>
        </div>
        {/* POPUP SCRIPT */}
      </div>
      <div className="ensk">
        <table className="ensk-table">
          <thead>
            <tr>
              <th>Stock_number</th>
              <th>Name</th>
              <th>Full_name</th>
              <th>ЕдИзмКод</th>
              <th>Unit</th>
              <th>TechNumber</th>
              <th>Счет</th>
              <th>NameClass</th>
              <th>Name_of_class</th>
              <th>NameGroup</th>
              <th>Name_of_group</th>
              <th>CURRENT</th>
            </tr>
          </thead>
          {createTable()}
        </table>
      </div>
      <div className="loading-animation" id="loader">
        <img src={loader} className="loader" />
      </div>
    </div>
  );
};

export default Ensk;
