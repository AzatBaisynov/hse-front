import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr.css";

const Pnbr = () => {
  // const [file, setFile] = useState({})
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  
  useEffect(() => {
    console.log(dirId);
  }, []);

  // const handleSelectFiles = (e) => {
  // 	setFile(e.target.files[0])
  // }

  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "dateFull":
        setDocument({ ...document, dateFull: value });
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
      case "divisionCode":
        setDocument({ ...document, divisionCode: value });
        break;
      case "issuancePeriod":
        setDocument({ ...document, issuancePeriod: value });
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
    console.log(document);
    const config = {
      method: "POST",
      url: `${_LINK}/v1/api/labor/create/update`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(document),
    };
    console.log(dirId);
    try {
      const { data } = await axios(config);
      console.log(data);
      alert("Запись добавлена");
    } catch (e) {
      alert(e);
    }
    alert("Запись добавлена");
  };

  return (
    <div className="create-doc-container">
      <div className="pnbr">
        {/* Title */}
        {/*------------------------------- PNBR -------------------------------*/}
        <h1 className="create-doc__title">
          Статистика отчетов (сводная) по ПНБ и ПНБВ
        </h1>
        {/* Subtitle PNBR */}
        <h2 className="create-doc__subtitle">Сводный отчет по ПНБР</h2>
        {/* Reporting period */}
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title form__field-title_blue">
              Начало отчетного периода:
            </div>
            <input
              type="date"
              name="startDatePnbr"
              id="startDatePnbr"
              className="form__field-content form__field-content_short"
            />
          </div>
          <div className="form__field">
            <div className="form__field-title form__field-title_blue">
              Конец отчетного периода:
            </div>
            <input
              type="date"
              name="endDatePnbr"
              id="endDatePnbr"
              className="form__field-content form__field-content_short"
            />
          </div>
        </div>
        {/* Pnbr table */}
        <table className="pnbr-table">
          <tbody>
            <tr>
              <th rowSpan={2}>№ п/п</th>
              <th rowSpan={2}>Филиал</th>
              <th colSpan={3}>Количество проведенных ПНБ</th>
              <th colSpan={3}>Анализ результатов</th>
              <th rowSpan={2}>Примечание</th>
            </tr>
            <tr>
              <th>по графику</th>
              <th>не по графику</th>
              <th>фактически</th>
              <th>безопасно</th>
              <th>опасно</th>
              <th>прочерк</th>
            </tr>
            <tr>
              <td className="pnbr-table__num">1</td>
              <td className="pnbr-table__cs">УТГ Алматы</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr>
              <td className="pnbr-table__num">2</td>
              <td className="pnbr-table__cs">УТГ Тараз</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr>
              <td className="pnbr-table__num">3</td>
              <td className="pnbr-table__cs">УТГ Шымкент</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr className="pnbr-table__total">
              <td colSpan={2}>Всего:</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
        {/*-------------------------------- PNBV --------------------------------*/}
        {/* Subtitle PNBV */}
        <h2 className="create-doc__subtitle">Сводный отчет по ПНБВ</h2>
        {/* Reporting period */}
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title form__field-title_blue">
              Начало отчетного периода:
            </div>
            <input
              type="date"
              name="startDatePnbv"
              id="startDatePnbv"
              className="form__field-content form__field-content_short"
            />
          </div>
          <div className="form__field">
            <div className="form__field-title form__field-title_blue">
              Конец отчетного периода:
            </div>
            <input
              type="date"
              name="endDate"
              id="endDatePnbv"
              className="form__field-content form__field-content_short"
            />
          </div>
        </div>
        {/* Pnbr table */}
        <table className="pnbr-table">
          <tbody>
            <tr>
              <th rowSpan={2}>№ п/п</th>
              <th rowSpan={2}>Филиал</th>
              <th colSpan={3}>Количество проведенных ПНБВ</th>
              <th colSpan={3}>Анализ результатов</th>
              <th rowSpan={2}>Примечание</th>
            </tr>
            <tr>
              <th>по графику</th>
              <th>не по графику</th>
              <th>фактически</th>
              <th>безопасно</th>
              <th>опасно</th>
              <th>прочерк</th>
            </tr>
            <tr>
              <td className="pnbr-table__num">1</td>
              <td className="pnbr-table__cs">ЦА</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr>
              <td className="pnbr-table__num">2</td>
              <td className="pnbr-table__cs">УТГ Алматы</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr>
              <td className="pnbr-table__num">3</td>
              <td className="pnbr-table__cs">УТГ Тараз</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr>
              <td className="pnbr-table__num">4</td>
              <td className="pnbr-table__cs">УТГ Шымкент</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td contentEditable="true" />
            </tr>
            <tr className="pnbr-table__total">
              <td colSpan={2}>Всего:</td>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
        {/* Comment */}
        <p
          className="create-doc__subtitle"
          style={{ textAlign: "left", marginBottom: 10 }}
        >
          Пояснение:
        </p>
        <textarea
          name="comment"
          id="comment"
          cols={30}
          rows={10}
          className="form__comment"
          style={{width: '100%'}}
          placeholder="Comment"
          defaultValue={""}
        />
        {/* Prepared by */}
        <p
          className="create-doc__subtitle"
          style={{ textAlign: "left", marginBottom: 10 }}
        >
          Подготовлено :
        </p>
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title form__field-title_blue">
              Ведущий инженер по охране труда{" "}
            </div>
            <input
              type="text"
              name=""
              id=""
              className="form__field-content"
              style={{ width: 845, textAlign: "right" }}
              defaultValue="Досжанова А.А."
            />
          </div>
        </div>
        <div className="create-doc__row" style={{ marginTop: 20 }}>
          <div className="form__field">
            <div className="form__field-title form__field-title_blue">
              Директор ДПБ, ОТ и Э
            </div>
            <input
              type="text"
              name=""
              id=""
              className="form__field-content"
              style={{ width: 845, textAlign: "right" }}
              defaultValue="Нугуманов Р.К."
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default Pnbr;
