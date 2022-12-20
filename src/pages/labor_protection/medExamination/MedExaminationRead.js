import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";
import { downloadFile } from "../../../data/downloader";

const MedExaminationRead = () => {
  const [document, setDocument] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [link, setLink] = useState({});

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
        const l = await downloadFile(
          `${_LINK}/v1/api/file/${data?.uploadFile[0]?.name}`,
          data?.uploadFile[0]?.name
        );
        setLink(l);
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
                href="/labor_protection/list/66"
                className="go-back-button button-general nohover"
              >
                Назад
              </a>
              <form action="./pasports_create_doc.html">
                <button
                  className="create-doc-button button-general"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      `/labor/employees/med_examination/edit/${document?.id}`,
                      {
                        replace: true,
                      }
                    );
                  }}
                >
                  Редактировать
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="ensk">
          <table className="ensk-table">
            <tbody>
              <tr>
                <th>ФИО / Name</th>
                <th>Дата рождения / Date of birth</th>
                <th>Пол / Sex</th>
                <th>Структурное подразделение/ Organizational division</th>
                <th>Должность / Position</th>
                <th>Общий стаж работы / General work experience</th>
                <th>
                  Стаж по занимаемой должности / Work experience on the position
                </th>
                <th>
                  Дата последнего медосмотра / Date of the previous medical
                  check
                </th>
                <th>Профессиональная вредность/ Professional danger</th>
              </tr>
              <tr className="table-input">
                <td>
                  <input
                    type="text"
                    id="employeeFullName"
                    value={document?.employeeFullName}
                    style={{ width: "250px" }}
                  />
                </td>
                <td>
                  <input type="date" id="dateFull" value={document?.dateFull} />
                </td>
                <td>
                  <select id="employeeSex" value={document?.employeeSex}>
                    <option value="male">муж / male</option>
                    <option value="female">жен / female</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="divisionName"
                    value={document?.divisionName}
                  />
                </td>
                <td>
                  <input type="text" id="position" value={document?.position} />
                </td>
                <td>
                  <input
                    type="text"
                    id="generalWorkExperience"
                    value={document?.generalWorkExperience}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="positionWorkExperience"
                    value={document?.positionWorkExperience}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="lastCheckDate"
                    value={document?.lastCheckDate}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="profDanger"
                    value={document?.profDanger}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ensk" style={{ marginTop: "25px" }}>
          <table className="ensk-table">
            <tbody>
              <tr>
                <th>
                  Периодичность осмотра /<br /> Period of check
                </th>
                <th>Вид медосмотра</th>
                <th>
                  Годен к работе/
                  <br /> Fit for work
                </th>
                <th>Примечание / Comments</th>
                <th>Загрузка отчета</th>
              </tr>
              <tr className="table-input">
                <td>
                  <input
                    type="text"
                    id="checkPeriod"
                    value={document?.checkPeriod}
                  />
                </td>
                <td>
                  <select id="periodType" value={document?.periodType}>
                    <option value="mandatory">
                      Обязательный периодический
                    </option>
                    <option value="preventative">
                      Периодический профилактический
                    </option>
                  </select>
                </td>
                <td>
                  <select id="workValidity" value={document?.workValidity}>
                    <option value="yes">да/yes</option>
                    <option value="no">нет/no</option>
                  </select>
                </td>
                <td>
                  <textarea
                    id="comment"
                    value={document?.comment}
                    cols={50}
                    rows={4}
                  ></textarea>
                </td>
                <td>
                  <div
                    className="create-doc__upload-file create-doc__field-content"
                    style={{ width: "350px" }}
                  >
                    {link?.download && (
                      <a href={link?.href} download={link?.download}>
                        <label htmlFor="upload-file">
                          <span className="create-doc__label">
                            <img
                              src={uploadIcon}
                              alt=""
                              style={{ cursor: "pointer" }}
                            />
                            <span style={{ cursor: "pointer" }}>
                              {document?.uploadFile[0]?.name ||
                                "Нажмите или перетащите файл для загрузки"}
                            </span>
                          </span>
                        </label>
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MedExaminationRead;
