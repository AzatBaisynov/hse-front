import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { _LINK } from "../../../../data/links";
import uploadIcon from "../../../../assets/images/upload-icon.svg";
import "../../../../assets/style/ppe_reviews.css";

const PpeAllowanceEdit = () => {
  const [file, setFile] = useState({});
  const [document, setDocument] = useState({});
  const { dirId } = useSelector((store) => store.files);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSelectFiles = (e) => {
    setFile(e.target.files[0]);
  };

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
  
  const handleInput = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "fileName":
        setDocument({ ...document, fileName: value });
        break;
      case "dateFull":
        setDocument({ ...document, dateFull: value });
        break;
      case "docName ":
        setDocument({ ...document, docName: value });
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
        "Authorization": localStorage.getItem("token"),
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
        console.log(formData);
				try {
					await axios.post(`${_LINK}/v1/api/labor/file/${data.id}`, formData, {
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
    <div
      className="container"
      style={{ flexDirection: "column", alignItems: "center", gap: "0" }}
    >
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
              value={document?.fileName} onInput={handleInput}
            />
          </div>
          <div className="form__field">
            <div className="form__field-title">Дата</div>
            <input
              type="date"
              name="dateFull"
              id="dateFull"
              className="form__field-content"
              value={document?.dateFull} onInput={handleInput}
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
            value={document?.docName} onInput={handleInput}
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
          value={document?.comment} onInput={handleInput}
        />
        {/* ADDITION BUTTON */}
        <div className="create-doc__buttons">
          <button
            type="submit"
            onClick={handleSend}
            className="create-doc__button create-doc__button-text"
          >
            Сохранить
          </button>
        </div>
      </form>
    </div>
  );
};

export default PpeAllowanceEdit;
