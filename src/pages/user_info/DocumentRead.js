import React, { useEffect, useState } from 'react';
import '../../assets/style/create_doc_form_style.css';
import uploadIcon from '../../assets/images/upload-icon.svg';
import DropzoneComponent from './DropzoneComponent';
import { _LINK } from '../../data/links';
import axios from 'axios';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate, useParams } from "react-router-dom";
import { downloadFile } from '../../data/downloader';

function DocumentRead() {

	const [file, setFile] = useState({})
	const [departments, setDepartments] = useState([])
	const [users, setUsers] = useState([])
	const [document, setDocument] = useState({ backup: false, oneClickRead: false, unlimitedArch: false, reader: { id: 1 } })
	const { dirId } = useSelector(store => store.files)
	const [doc, setDoc] = useState({})
	const [link, setLink] = useState({})

	const navigate = useNavigate()

	const {id} = useParams()

	useEffect(() => {
		const get = async () => {
			const config = {
				method: "GET",
				url: `${_LINK}/v1/api/org/all`,
				headers: {
					"Authorization": localStorage.getItem("token")
				}
			}
			try {
				const { data } = await axios(config)
				setDepartments(data.departments)
				setDocument({ ...document, department: { id: data.departments[0].id }, reviewPeriod: "3-months" })
			} catch (e) {
				console.log(e)
			}
		}
		// get()
		const getUsers = async () => {
			const config = {
				method: "GET",
				url: `${_LINK}/v1/api/org/users/all`,
				headers: {
					"Authorization": localStorage.getItem("token")
				}
			}
			try {
				const { data } = await axios(config)
				setUsers(data)
			} catch (e) {
				console.log(e)
			}
		}
		// getUsers()
		const getDocument = async () => {
			const config = {
				method: "GET",
				url: `${_LINK}/v1/api/org/document/id/${id}`,
				headers: {
					"Authorization": localStorage.getItem("token")
				}
			}
			try {
				const { data } = await axios(config)
				console.log(data)
				setDoc(data)
				const l =  await downloadFile(`${_LINK}/v1/api/file/${data?.file?.name}`, data?.file?.name)
				setLink(l)
				console.log(l)
			} catch (e) {
				console.log(e)
			}
		}
		getDocument()
	}, [])

	const handleSelectFiles = (e) => {
		setFile(e.target.files[0])
	}

	const handleInput = (e) => {
		const { id, value } = e.target
		switch (id) {
			case "file-name": setDocument({ ...document, fileTitle: value })
				break
			case "document-name": setDocument({ ...document, docTitle: value })
				break
			case "protocol-date": {
				setDocument({ ...document, protocolDate: value })
			}
				break
			case "fullName": setDocument({ ...document, executorFullName: value })
				break
			case "department": setDocument({ ...document, department: { id: value } })
				break
			case "terms": setDocument({ ...document, reviewPeriod: value })
				break
			case "reader": setDocument({ ...document, reader: { id: value } })
				break
			case "one-click-read": {
				setDocument({ ...document, oneClickRead: e.target.checked })
			}
				break
			case "unlimitted-archivation": {
				setDocument({ ...document, unlimitedArch: e.target.checked })
			}
				break
			case "backup": {
				setDocument({ ...document, backup: e.target.checked })
			}
				break
		}
	}


	const handleSend = async (e) => {
		e.preventDefault()
		const config = {
			method: "POST",
			url: `${_LINK}/v1/api/org/document/${dirId}`,
			headers: {
				"Authorization": localStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			data: JSON.stringify(document)
		}
		try {
			const { data } = await axios(config)
			alert("Запись добавлена")
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="create-doc-container">
			<p className="create-doc__title">Просмотр документа</p>
			<form action="" className="create-doc__form">
				<div className="create-doc__row">
					{/* FILE NAME  */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Имя файла</div>
						<input onInput={handleInput} value={doc?.fileTitle} type="text" name="file-name" id="file-name" className="create-doc__field-content" />
					</div>
					{/*  DOCUMENT NAME */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Название документа</div>
						<input onInput={handleInput} value={doc?.docTitle} type="text" name="file-name" id="document-name" className="create-doc__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					{/* FILE NAME  */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Редакция документа</div>
						<input onInput={handleInput} value={doc?.documentRevision} type="text" name="file-name" id="document-revision" className="create-doc__field-content" />
					</div>
					{/*  DOCUMENT NAME */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Код документа</div>
						<input onInput={handleInput} value={doc?.documentCode} type="text" name="file-name" id="document-code" className="create-doc__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					{/* DATE OF APPROVAL */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Номер и дата протокола
							утверждения</div>
						<input onInput={handleInput} value={doc?.protocolDate} type="date" name="file-name" id="protocol-date" className="create-doc__field-content" />
					</div>
					{/* NAME OF EXECUTOR  */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">ФИО Исполнителя </div>
						<input onInput={handleInput} value={doc?.executorFullName} type="text" name="file-name" id="fullName" className="create-doc__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					{/* RESPONSIBLE DEPARTMENT */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Ответственный департамент</div>
						<input onInput={handleInput} value={doc?.department} type="text" name="file-name" id="fullName" className="create-doc__field-content" />
						{/* <select onInput={handleInput} value={doc?.department?.name} name="responsible-department" id="department" className="create-doc__field-content">
							{
								departments?.map((el, idx) => (
									<option key={idx} value={el.id}>{el.name}</option>
								))
							}
						</select> */}
					</div>
					{/* REVISION TIME */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Срок пересмотра</div>
						<input onInput={handleInput} value={doc?.reviewPeriod} type="text" name="file-name" id="fullName" className="create-doc__field-content" />
						{/* <select onInput={handleInput} name="revision-time" id="terms" className="create-doc__field-content">
							<option value="3-months">3 месяца</option>
							<option value="6-months">6 месяцев</option>
							<option value="1-year">1 год</option>
							<option value="3-years">3 года</option>
						</select> */}
					</div>
				</div>
				{/* DOCUMENT UPLOADING  */}
				<div className="create-doc__field">
					<div className="create-doc__field-title">Документ</div>
					<div className="create-doc__upload-file form__field-content form__field-content_long" style={{ cursor: "pointer", width: "965px" }} >
						{ link?.download && (
							<a href={link?.href} download={link?.download}>
							<label htmlFor="upload-file" >
								<span className="create-doc__label" >
									<img src={uploadIcon} alt="" style={{ cursor: "pointer" }} />
									<span style={{ cursor: "pointer" }} >{doc?.file?.name || "Нажмите или перетащите файл для загрузки"}</span>
								</span>
							</label>
							</a>
						)}
					</div>
				</div>
				<div className="create-doc__field" style={{alignSelf: "flex-start"}}>
					<div className="create-doc__field">
						<div className="create-doc__field-title">Доступ к чтению</div>
						<input onInput={handleInput} value={doc?.readerUser} type="text" name="file-name" id="fullName" className="create-doc__field-content" />
						{/* <select onInput={handleInput} name="responsible-department" id="reader" className="create-doc__select-user create-doc__field-content">
							{
								users?.map((el, idx) => (
									<option key={idx} value={el.id}>{el.fullName}</option>
								))
							}
						</select> */}
					</div>
					<div className="create-doc__field">
						<div className="create-doc__checkbox-container">
							{/* ONE-CICK READ */}
							<div className="create-doc__checkbox">
								<input onInput={handleInput} disabled="disabled" type="checkbox" defaultChecked={doc?.oneClickRead} name="one-click-read" id="one-click-read" className="checkbox" />
								<label htmlFor="one-click-read">Чтение в один клик</label>
							</div>
							{/* UNLIMITED ARCHIVATION  */}
							<div className="create-doc__checkbox">
								<input onInput={handleInput} disabled="disabled" type="checkbox" defaultChecked={doc?.unlimitedArch} name="unlimitted-archivation" id="unlimitted-archivation" className="checkbox" />
								<label htmlFor="unlimitted-archivation">Не ограниченный объем документов для архивации</label>
							</div>
							{/* BACKUP  */}
							<div className="create-doc__checkbox">
								<input onInput={handleInput} disabled="disabled" defaultChecked={doc?.backup} type="checkbox" name="backup" id="backup" className="checkbox" />
								<label htmlFor="backup">Резервная копия </label>
							</div>
						</div>
					</div>
				</div>
				{/* CHECKBOXES  */}
				{/* ADDITION BUTTON  */}
				{/* <button onClick={handleSend} type="submit" className="create-doc__button">Добавить документ</button> */}
				<div class="create-doc__buttons">
					<button onClick={(e) => {
						e.preventDefault()
						navigate(`/info/edit/${doc?.id}`, { replace: true })
					}} class="create-doc__button create-doc__button-text">Редактировать</button>
				</div>
			</form>
		</div>
	);
}

export default DocumentRead;