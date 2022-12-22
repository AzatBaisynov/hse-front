import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../data/links";
import uploadIcon from "../../../assets/images/upload-icon.svg";
import "../../../assets/style/ppe_reviews.css";
import { downloadFile } from "../../../data/downloader";
import { useNavigate, useParams } from "react-router-dom";

const MedExamination = () => {
  const [file1, setFile1] = useState({});
  const [file2, setFile2] = useState({});
  const [file3, setFile3] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSelectFiles = (e) => {
    setFile1(e.target.files[0]);
    setFile2(e.target.files[0]);
    setFile3(e.target.files[0]);
  };

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
        // setDocument({
        //   ...document,
        //   senderUser: data.users[0].username,
        //   issuingAuthority: data.users[0].department,
        //   makerUser: data.users[0].username,
        // });
      } catch (e) {
        console.log(e);
      }
    };
    get();
  }, []);

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "employeeFullName":
        setDocument({ ...document, employeeFullName: value });
        break;
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "employeePatronymic":
        setDocument({ ...document, employeePatronymic: value });
        break;
      case "employeeSex":
        setDocument({ ...document, employeeSex: value });
        break;
      case "position":
        setDocument({ ...document, position: value });
        break;
      case "divisionName":
        setDocument({ ...document, divisionName: value });
        break;
      case "generalWorkExperience ":
        setDocument({ ...document, generalWorkExperience: value });
        break;
      case "positionWorkExperience":
        setDocument({ ...document, positionWorkExperience: value });
        break;
      case "lastCheckDate":
        setDocument({ ...document, lastCheckDate: value });
        break;
      case "checkPeriod":
        setDocument({ ...document, checkPeriod: value });
        break;
      case "periodType":
        setDocument({ ...document, periodType: value });
        break;
      case "workValidity":
        setDocument({ ...document, workValidity: value });
        break;
      case "comment":
        setDocument({ ...document, comment: value });
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
      if (file1?.name) {
        const formData = new FormData();
        formData.append("file", file1, file1.name);
        try {
          await axios.post(`${_LINK}/v1/api/labor/file/${data.id}`, formData, {
            headers: {
              Authorization: localStorage.getItem("token"),
              "Content-Type": "multipart/form-data",
            },
          });
        } catch (e) {
          console.log(e);
        }
      }

      if (file2?.name) {
        const formData = new FormData();
        formData.append("file", file2, file2.name);
        try {
          await axios.post(
            `${_LINK}/v1/api/eco/document/file/${data.id}/2`,
            formData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
      if (file3?.name) {
        const formData = new FormData();
        formData.append("file", file3, file3.name);
        try {
          await axios.post(
            `${_LINK}/v1/api/eco/document/file/${data.id}/3`,
            formData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
    alert("Запись добавлена");
  };

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
                href="/labor_protection/list/66"
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
                  <select
                    onInput={handleInput}
                    value={document?.employeeFullName}
                    name="employeeFullName"
                    id="employeeFullName"
                    className="create-doc__field-content"
                    style={{ width: "250px" }}
                  >
                    {users?.map((el, idx) => (
                      <option key={idx} value={el.username}>
                        {el.username}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="date"
                    id="dateFull"
                    onInput={handleInput}
                    value={document?.dateFull}
                  />
                </td>
                <td>
                  <select
                    id="employeeSex"
                    onInput={handleInput}
                    value={document?.employeeSex}
                  >
                    <option value="male">муж / male</option>
                    <option value="female">жен / female</option>
                  </select>
                </td>
                <td>
                  <select
                    onInput={handleInput}
                    value={document?.divisionName}
                    name="divisionName"
                    id="divisionName"
                    className="create-doc__field-content"
                  >
                    {users?.map((el, idx) => (
                      <option key={idx} value={el.department}>
                        {el.department}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select
                    onInput={handleInput}
                    value={document?.position}
                    name="position"
                    id="position"
                    className="create-doc__field-content"
                  >
                    {users?.map((el, idx) => (
                      <option key={idx} value={el.userdesc}>
                        {el.userdesc}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    id="generalWorkExperience"
                    onInput={handleInput}
                    value={document?.generalWorkExperience}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="positionWorkExperience"
                    onInput={handleInput}
                    value={document?.positionWorkExperience}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    id="lastCheckDate"
                    onInput={handleInput}
                    value={document?.lastCheckDate}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    id="profDanger"
                    onInput={handleInput}
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
                    onInput={handleInput}
                    value={document?.checkPeriod}
                  />
                </td>
                <td>
                  <select
                    id="periodType"
                    onInput={handleInput}
                    value={document?.periodType}
                  >
                    <option value="mandatory">
                      Обязательный периодический
                    </option>
                    <option value="preventative">
                      Периодический профилактический
                    </option>
                  </select>
                </td>
                <td>
                  <select
                    id="workValidity"
                    onInput={handleInput}
                    value={document?.workValidity}
                  >
                    <option value="yes">да/yes</option>
                    <option value="no">нет/no</option>
                  </select>
                </td>
                <td>
                  <textarea
                    id="comment"
                    onInput={handleInput}
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
                    <label htmlFor="file">
                      <span className="create-doc__label">
                        <img src={uploadIcon} alt="" />
                        <span>
                          {(file1?.name && file2.name && file3.name) ||
                            "Нажмите или перетащите файл для загрузки"}
                        </span>
                      </span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      hidden
                      multiple
                      onInput={handleSelectFiles}
                    />
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

export default MedExamination;
