import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uploadIcon from "../../../../assets/images/upload-icon.svg"
import { _LINK } from "../../../../data/links";

const PurchaseRequestMessage = () => {
  const [file, setFile] = useState({})
	const [document, setDocument] = useState({})
	const { dirId } = useSelector((store) => store.files)

	const handleSelectFiles = (e) => {
		setFile(e.target.files[0])
	}

	const handleInput = (e) => {
		const { id, value } = e.target
		switch (id) {
			case "employeeFullName": setDocument({ ...document, employeeFullName: value })
				break
			case "dateFull": setDocument({ ...document, dateFull: value})
        break
      case "divisionCode ": setDocument({ ...document, divisionCode : value})
        break
      case "comment": setDocument({ ...document, comment: value})
        break
		}
	}

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
      if (file?.name) {
				const formData = new FormData()
				formData.append(
					'file',
					file,
					file.name
				)
				try {
					await axios.post(`${_LINK}/v1/api/labor/file/${data.id}`, formData, {
						headers: {
							'Authorization': localStorage.getItem("token"),
              'Content-Type': "multipart/form-data",
						}
					})
				} catch (e) {
					alert(e)
				}
			}
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
                onInput={handleInput}
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
                onInput={handleInput}
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
                onInput={handleInput}
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
            defaultValue={""}
            onInput={handleInput}
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
						<input type="file" id="file" hidden onInput={handleSelectFiles} />
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
            onClick={handleSend}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseRequestMessage;
