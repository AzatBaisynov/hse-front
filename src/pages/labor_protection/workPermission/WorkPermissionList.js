import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../../../assets/style/doc_list_style.css";
import { useSelector } from "react-redux/es/exports";
import { Paginate } from "../../../components/Paginate";
import { _LINK } from "../../../data/links";
import axios from "axios";
import filterImage from "../../../assets/images/doc-lict-filter.png";

const WorkPermissionList = () => {
  const [page, setPage] = useState(0);
  const [back, setBack] = useState({});
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isOld, setIsOld] = useState(false);

  useEffect(() => {
    const get = async () => {
      const config = {
        method: "get",
        url: `${_LINK}/v1/api/labor/dir/46`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      try {
        const { data } = await axios(config);
        setBack(data);
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, [page]);

  useEffect(() => {});

  useEffect(() => {
    if (isOld) {
      const newB = back;
      newB.content.reverse();
      setBack(newB);
    }
  }, [isOld]);

  const statusWriter = (str) => {
		switch (str) {
			case "Передать на ознакомление" : {
				return (<p className='primary' style={{ width: "150px", color: "#fff"}}>Создан</p>)
			}
			case "Передать на рассмотрение": {
				return (<p className='warn' style={{ width: "150px", color: "#fff", background: "#E89F5D;" }}>На рассмотрении</p>)
			}
			case "Отправить на доработку": {
				return (<p className='error' style={{ width: "150px", color: "#fff", background: "#E85D5D;" }}>Отправлен на
					доработку</p>)
			}
			case "Согласовать документ": {
				return (<p className='success' style={{ width: "150px", color: "#fff", background: "#78CA85;" }}>Согласован</p>)
			}
		}
	}

  return (
    <div className="doc-list-container">
      <div className="doc-list__head-panel">
        <div className="doc-list__buttons">
          <NavLink
            exact
            to="/labor_protection/folders/9/nest/0"
            className="go-back-button button-general"
          >
            Назад
          </NavLink>
          <NavLink
            exact
            to="/labor_protection/work_permission/"
            className="create-doc-button button-general"
          >
            Создать документ
          </NavLink>
        </div>
        <div className="doc-list__search-row">
          <img
            src={filterImage}
            alt="filter"
            className="doc-list__filter"
            onClick={() => {
              const popup = document.getElementById("filter");
              popup.classList.toggle("show");
            }}
          />
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
                  <option value="security-dep">Департамент безопасности</option>
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
          <input
            type="search"
            name="doc-search"
            id="#"
            className="doc-filter__search"
            placeholder="Поиск по ключевым словам"
          />
        </div>
      </div>
      <table className="doc-table">
        <tbody>
          <tr className="doc-table__row doc-table__row_titles">
            <td>Код документа</td>
            <td>Имя файла</td>
            <td>Дата</td>
            <td>Наименование работы</td>
            <td>Руководитель</td>
            <td>Исполнитель</td>
            <td>Актуальный статус</td>
          </tr>

          {Object.keys(back).map((key, idx) => (
            <tr
              className="doc-table__row"
              id={idx}
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              onClick={(e) => {
                navigate(`/labor/work_permission/get/${back[key].id}`, {
                  replace: true,
                });
              }}
            >
              <td>{back[key]?.id}</td>
              <td>{back[key]?.fileName}</td>
              <td>{back[key]?.dateFull}</td>
              <td>{back[key]?.docName}</td>
              <td>{back[key]?.manager}</td>
              <td>{back[key]?.executor}</td>
              <td>{statusWriter(back[key]?.action)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {back?.totalPages && (
        <div className="pagination__container">
          <Paginate
            page={page}
            setPage={setPage}
            totalPages={back?.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default WorkPermissionList;
