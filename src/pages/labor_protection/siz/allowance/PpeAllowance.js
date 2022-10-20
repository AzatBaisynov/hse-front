import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import uploadIcon from "../../../../assets/images/upload-icon.svg";
import { _LINK } from "../../../../data/links";

const PpeAllowance = () => {
  const [file, setFile] = useState({})
	const [document, setDocument] = useState({})
	const { dirId } = useSelector((store) => store.files)

  console.log(dirId);

	const handleSelectFiles = (e) => {
		setFile(e.target.files[0])
	}

  console.log(file);

	const handleInput = (e) => {
		const { id, value } = e.target
		switch (id) {
			case "fileName": setDocument({ ...document, fileName: value })
				break
			case "dateFull": setDocument({ ...document, dateFull: value})
        break
      case "docName ": setDocument({ ...document, docName : value})
        break
      case "comment": setDocument({ ...document, comment: value})
        break
		}
	}

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
      if (file?.name) {
				const formData = new FormData()
				formData.append(
					'file',
					file,
					file.name
				)
				try {
					await axios.post(`${_LINK}/v1/api/labor/create/update/${data.id}`, formData, {
						headers: {
							'Authorization': localStorage.getItem("token"),
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
      <p className="create-doc__title">Норма выдачи СИЗ</p>
      <form action="#" className="create-doc__form">
        <div className="create-doc__row">
          <div className="form__field">
            <div className="form__field-title">Имя файла</div>
            <input
              type="text"
              name="fileName"
              id="fileName"
              className="form__field-content"
              onInput={handleInput}
            />
          </div>
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
        </div>
        <div className="form__field">
          <div className="form__field-title">Наименование документа</div>
          <input
            type="text"
            name="docName"
            id="docName"
            className="form__field-content form__field-content_long"
            onInput={handleInput}
          />
        </div>
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
        <textarea
          name="comment"
          id="comment"
          className="form__comment form__field-content"
          placeholder="Комментарий"
          defaultValue={""}
          onInput={handleInput}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <a
            href="./utilization_contracts_doc_list.html"
            className="create-doc__cancel-button create-doc__button-text"
          >
            Отменить
          </a>
          <button
            type="submit"
            className="create-doc__button create-doc__button-text"
          onClick={handleSend}>
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PpeAllowance;
