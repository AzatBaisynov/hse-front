import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { _LINK } from "../../../../data/links";
import "../../../../assets/style/pnbr.css";

const PnbStatistics = () => {
  const [document, setDocument] = useState({});
  const { id } = useParams();

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
              value={document?.startDatePnbr}
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
              value={document?.startDatePnbr}
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
              <td><input type="text" id="almatyPlan" value={document?.almatyPlan}/></td>
              <td><input type="text" id="almatyOutPlan" value={document?.almatyOutPlan}/></td>
              <td><input type="text" id="almatyFact" value={document?.almatyFact}/></td>
              <td><input type="text" id="almatySafe" value={document?.almatySafe}/></td>
              <td><input type="text" id="almatyDanger" value={document?.almatyDanger}/></td>
              <td><input type="text" id="almatyNone" value={document?.almatyNone}/></td>
              <td><textarea id="almatyComment" value={document?.almatyComment}/></td>
            </tr>
            <tr>
              <td className="pnbr-table__num">2</td>
              <td className="pnbr-table__cs">УТГ Тараз</td>
              <td><input type="text" id="tarazPlan" value={document?.tarazPlan}/></td>
              <td><input type="text" id="tarazOutPlan" value={document?.tarazOutPlan}/></td>
              <td><input type="text" id="tarazFact" value={document?.tarazFact}/></td>
              <td><input type="text" id="tarazSafe" value={document?.tarazSafe}/></td>
              <td><input type="text" id="tarazDanger" value={document?.tarazDanger}/></td>
              <td><input type="text" id="tarazNone" value={document?.tarazNone}/></td>
              <td><textarea id="tarazComment" value={document?.tarazComment}/></td>
            </tr>
            <tr>
              <td className="pnbr-table__num">3</td>
              <td className="pnbr-table__cs">УТГ Шымкент</td>
              <td><input type="text" id="shymkentPlan" value={document?.shymkentPlan}/></td>
              <td><input type="text" id="shymkentOutPlan" value={document?.shymkentOutPlan}/></td>
              <td><input type="text" id="shymkentFact" value={document?.shymkentFact}/></td>
              <td><input type="text" id="shymkentSafe" value={document?.shymkentSafe}/></td>
              <td><input type="text" id="shymkentDanger" value={document?.shymkentDanger}/></td>
              <td><input type="text" id="shymkentNone" value={document?.shymkentNone}/></td>
              <td><textarea id="shymkentComment" value={document?.shymkentComment}/></td>
            </tr>
            <tr className="pnbr-table__total">
              <td colSpan={2}>Всего:</td>
              <td><input type="text" id="planTotal" value={document?.planTotal}/></td>
              <td><input type="text" id="outPlanTotal" value={document?.outPlanTotal}/></td>
              <td><input type="text" id="factTotal" value={document?.factTotal}/></td>
              <td><input type="text" id="safeTotal" value={document?.safeTotal}/></td>
              <td><input type="text" id="dangerTotal" value={document?.dangerTotal}/></td>
              <td><input type="text" id="noneTotal" value={document?.noneTotal}/></td>
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
              value={document?.startDatePnbv}
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
              value={document?.endDatePnbv}
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
              <td><input type="text" id="pnbvCaPlan" value={document?.pnbvCaPlan}/></td>
              <td><input type="text" id="pnbvCaOutPlan" value={document?.pnbvCaOutPlan}/></td>
              <td><input type="text" id="pnbvCaFact" value={document?.pnbvCaFact}/></td>
              <td><input type="text" id="pnbvCaSafe" value={document?.pnbvCaSafe}/></td>
              <td><input type="text" id="pnbvCaDanger" value={document?.pnbvCaDanger}/></td>
              <td><input type="text" id="pnbvCaNone" value={document?.pnbvCaNone}/></td>
              <td><textarea id="pnbvCaComment" value={document?.pnbvCaComment}/></td>
            </tr>
            <tr>
              <td className="pnbr-table__num">2</td>
              <td className="pnbr-table__cs">УТГ Алматы</td>
              <td><input type="text" id="pnbvAlmatyPlan" value={document?.pnbvAlmatyPlan}/></td>
              <td><input type="text" id="pnbvAlmatyOutPlan" value={document?.pnbvAlmatyOutPlan}/></td>
              <td><input type="text" id="pnbvAlmatyFact" value={document?.pnbvAlmatyFact}/></td>
              <td><input type="text" id="pnbvAlmatySafe" value={document?.pnbvAlmatySafe}/></td>
              <td><input type="text" id="pnbvAlmatyDanger" value={document?.pnbvAlmatyDanger}/></td>
              <td><input type="text" id="pnbvAlmatyNone" value={document?.pnbvAlmatyNone}/></td>
              <td><textarea id="pnbvAlmatyComment" value={document?.pnbvAlmatyComment}/></td>
            </tr>
            <tr>
              <td className="pnbr-table__num">3</td>
              <td className="pnbr-table__cs">УТГ Тараз</td>
              <td><input type="text" id="pnbvTarazPlan" value={document?.pnbvTarazPlan}/></td>
              <td><input type="text" id="pnbvTarazOutPlan" value={document?.pnbvTarazOutPlan}/></td>
              <td><input type="text" id="pnbvTarazFact" value={document?.pnbvTarazFact}/></td>
              <td><input type="text" id="pnbvTarazSafe" value={document?.pnbvTarazSafe}/></td>
              <td><input type="text" id="pnbvTarazDanger" value={document?.pnbvTarazDanger}/></td>
              <td><input type="text" id="pnbvTarazNone" value={document?.pnbvTarazNone}/></td>
              <td><textarea id="pnbvTarazComment" value={document?.pnbvTarazComment}/></td>
            </tr>
            <tr>
              <td className="pnbr-table__num">4</td>
              <td className="pnbr-table__cs">УТГ Шымкент</td>
              <td><input type="text" id="pnbvShymkentPlan" value={document?.pnbvShymkentPlan}/></td>
              <td><input type="text" id="pnbvShymkentOutPlan" value={document?.pnbvShymkentOutPlan}/></td>
              <td><input type="text" id="pnbvShymkentFact" value={document?.pnbvShymkentFact}/></td>
              <td><input type="text" id="pnbvShymkentSafe" value={document?.pnbvShymkentSafe}/></td>
              <td><input type="text" id="pnbvShymkentDanger" value={document?.pnbvShymkentDanger}/></td>
              <td><input type="text" id="pnbvShymkentNone" value={document?.pnbvShymkentNone}/></td>
              <td><textarea id="pnbvShymkentComment" value={document?.pnbvShymkentComment}/></td>
            </tr>
            <tr className="pnbr-table__total">
              <td colSpan={2}>Всего:</td>
              <td><input type="text" id="pnbvPlanTotal" value={document?.pnbvPlanTotal}/></td>
              <td><input type="text" id="pnbvOutPlanTotal" value={document?.pnbvOutPlanTotal}/></td>
              <td><input type="text" id="pnbvFactTotal" value={document?.pnbvFactTotal}/></td>
              <td><input type="text" id="pnbvSafeTotal" value={document?.pnbvSafeTotal}/></td>
              <td><input type="text" id="pnbvDangerTotal" value={document?.pnbvDangerTotal}/></td>
              <td><input type="text" id="pnbvNoneTotal" value={document?.pnbvNoneTotal}/></td>
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
          value={document?.comment}
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
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <NavLink exact to="/labor_protection/list/57">
          <button
            type="submit"
            className="create-doc__button create-doc__button-text">
            Закрыть
          </button>
          </NavLink>
        </div>
      </div>
    </div>

  );
};

export default PnbStatistics;
