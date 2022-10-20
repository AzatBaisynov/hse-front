import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uploadIcon from "../../../assets/images/upload-icon.svg"
import { _LINK } from "../../../data/links";

const PurchaseRequestMessage = () => {
  const [file, setFile] = useState({})
  const [document, setDocument] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { dirId } = useSelector((store) => store.files)
	const [link, setLink] = useState({})

  const handleSelectFiles = (e) => {
		setFile(e.target.files[0])
	}

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
        console.log(data);
        setDocument(data);
      } catch (e) {
        alert(e);
      }
    };
    getDocument();
  }, []);

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
      setDocument(data)
				const l = await downloadFile(`${_LINK}/v1/api/file/${data?.file?.name}`, data?.file?.name)
				setLink(l)
				console.log(l)
    } catch (e) {
      alert(e);
    }
    alert("Запись добавлена");
  };

  
  return (
    <div className="container" style={{ flexDirection: "column", alignItems: "center", gap: "0" }}>
      <p className="create-doc__title">Сообщение о потребности в закупе</p>
      <form action="#" className="create-doc__form">
        <div className="form__fields-comment">
          <div className="form__vertical-field-container">
            {/* EMPLOYEE FULL NAME */}
            <div className="form__field">
              <div className="form__field-title">ФИО</div>
              <input
                type="text"
                name="employeeFullName"
                id="employeeFullName"
                className="form__field-content"
                value={document?.employeeFullName}
              />
            </div>
            {/* DATE */}
            <div className="form__field">
              <div className="form__field-title">Дата</div>
              <input
                type="date"
                name="dateFull"
                id="dateFull"
                className="form__field-content"
                value={document?.dateFull}
              />
            </div>
            {/* DIVISION CODE */}
            <div className="form__field">
              <div className="form__field-title">№ КС</div>
              <input
                type="text"
                name="divisionCode"
                id="divisionCode"
                className="form__field-content"
                value={document?.divisionCode}
              />
            </div>
          </div>
          {/* COMMENT */}
          <textarea
            name="comment"
            id="comment"
            className="form__comment form__field-content"
            placeholder="Сообщение"
            style={{ height: 154 }}
            value={document?.comment}
          />
        </div>
        {/* DOCUMENT UPLOADING */}
        <div className="create-doc__field" >
					<div className="create-doc__field-title">Загрузка документа</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						<label htmlFor="file" >
							<span className="create-doc__label">
								<img src={uploadIcon} alt="" />
								<span>{file?.name || "Нажмите или перетащите файл для загрузки"}</span>
							</span>
						</label>
						<input type="file" id="file" hidden/>
					</div>
				</div>
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="./management_programs_doc_list.html"
            className="create-doc__decline"
          >
            Отменить
          </a>
          <button
            type="submit"
            className="create-doc__button"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseRequestMessage;
