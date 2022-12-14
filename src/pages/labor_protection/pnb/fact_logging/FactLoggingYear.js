import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../../assets/style/siz_table.css";
import { NavLink } from "react-router-dom";
import filterImage from "../../../../assets/images/doc-lict-filter.png";
import uploadDoc from "../../../../assets/images/labor-protecttion-upload-doc.svg";
import downloadDoc from "../../../../assets/images/labor-protecttion-download-doc.svg";
import { _LINK } from "../../../../data/links";
import loader from "../../../../assets/images/loader.gif";

const FactLoggingYear = () => {
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
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      if (file?.name) {
        const formData = new FormData();
        formData.append("file", file, file.name);
        runLoader(true);
        try {
          await axios.post(
            `${_LINK}/v1/api/file/excel?skip=4&col=2&type=7&date=2022-10-12`,
            formData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
        } catch (e) {
          alert(e);
        }
        runLoader(false);
      }
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    const getArray = async () => {
      const config = {
        method: "get",
        url: `${_LINK}/v1/api/file/excel/get?type=7`,
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
    };
    getArray();
  }, []);

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

  const date = new Date();
  const year = date.getFullYear();
  const title = `Незапланированные записи по факту ПНБР на ${year} год`;


  return (
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
            {/* ADD FIELD */}
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
          {/* TITLE */}
          <p className="head-panel__title">{title}</p>
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
            <img src={filterImage} alt="filter" className="doc-list__filter" />
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
                <th>№</th>
                <th>Структурное подразделение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>УТГ "Тараз"</td>
              </tr>
              <tr>
                <td>2</td>
                <td>УТГ "Алматы"</td>
              </tr>
              <tr>
                <td>3</td>
                <td>УТГ "Шымкент"</td>
              </tr>
              <tr>
                <td>4</td>
                <td rowSpan={2}>УЗРГ</td>
              </tr>
              <tr>
                <td>5</td>
              </tr>
              <tr>
                <td>6</td>
                <td rowSpan={2}>КС-1</td>
              </tr>
              <tr>
                <td>7</td>
              </tr>
              <tr>
                <td>8</td>
                <td rowSpan={2}>КС-2</td>
              </tr>
              <tr>
                <td>9</td>
              </tr>
              <tr>
                <td>10</td>
                <td rowSpan={2}>СКС-1</td>
              </tr>
              <tr>
                <td>11</td>
              </tr>
              <tr>
                <td>12</td>
                <td rowSpan={2}>СКС-2</td>
              </tr>
              <tr>
                <td>13</td>
              </tr>
              <tr>
                <td>14</td>
                <td rowSpan={2}>КС-4</td>
              </tr>
              <tr>
                <td>15</td>
              </tr>
              <tr>
                <td>16</td>
                <td rowSpan={2}>СКС-3</td>
              </tr>
              <tr>
                <td>17</td>
              </tr>
              <tr>
                <td>18</td>
                <td rowSpan={2}>СКС-4</td>
              </tr>
              <tr>
                <td>19</td>
              </tr>
              <tr>
                <td>20</td>
                <td rowSpan={2}>СКС-5</td>
              </tr>
              <tr>
                <td>21</td>
              </tr>
              <tr>
                <td>22</td>
                <td rowSpan={2}>КС-6</td>
              </tr>
              <tr>
                <td>23</td>
              </tr>
              <tr>
                <td>24</td>
                <td rowSpan={2}>СКС-6</td>
              </tr>
              <tr>
                <td>25</td>
              </tr>
              <tr>
                <td>26</td>
                <td rowSpan={2}>КС-7</td>
              </tr>
              <tr>
                <td>27</td>
              </tr>
              <tr>
                <td>28</td>
                <td rowSpan={2}>СКС-7</td>
              </tr>
              <tr>
                <td>29</td>
              </tr>
              <tr>
                <td>30</td>
                <td rowSpan={2}>СКС-8</td>
              </tr>
              <tr>
                <td>31</td>
              </tr>
              <tr>
                <td rowSpan={2} colSpan={2}>Всего:</td>
              </tr>
            </tbody>
        </table>
        <table className="ensk-table">
          <thead>
            <tr>
              <th>Должность</th>
              <th>Ф.И.О.</th>
              <th>Адрес электронной почты</th>
              <th>январь</th>
              <th>февраль</th>
              <th>март</th>
              <th>апрель</th>
              <th>май</th>
              <th>июнь</th>
              <th>июль</th>
              <th>август</th>
              <th>сентябрь</th>
              <th>октябрь</th>
              <th>ноябрь</th>
              <th>декабрь</th>
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

export default FactLoggingYear;