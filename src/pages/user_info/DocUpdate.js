import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import uploadIcon from '../../assets/images/upload-icon.svg';
import { _LINK } from '../../data/links';
import { downloadFile } from '../../data/downloader';

const DocUpdate = () => {

	const [document, setDocument] = useState({ backup: false, oneClickRead: false, unlimitedArch: false, reader: { id: 1 } })
	const { dirId } = useSelector(store => store.files)
	const [doc, setDoc] = useState({})
	const [departments, setDepartments] = useState([])
	const [link, setLink] = useState({})
	const [file, setFile] = useState({})
	const [users, setUsers] = useState([])
	const { id } = useParams()
	const navigate = useNavigate()


	useEffect(() => {
		const get = async () => {
			const config = {
				method: "GET",
				url: `${_LINK}/v1/api/org/ldap/all`,
				headers: {
					"Authorization": localStorage.getItem("token")
				}
			}
			try {
				const { data } = await axios(config)
				console.log(data)
				setDepartments(data.departments)
				setUsers(data.users)
				setDocument({ ...document, readerUser: data.users[0].username, department: data.departments[0].depName, reviewPeriod: "3-months" })
			} catch (e) {
				alert(e)
			}
		}
		get()
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
				const l = await downloadFile(`${_LINK}/v1/api/file/${data?.file?.name}`, data?.file?.name)
				setLink(l)
				console.log(l)
			} catch (e) {
				alert(e)
			}
		}
		getDocument()
	}, [])

	const handleInput = (e) => {
		const { id, value } = e.target
		console.log(id, value)
		switch (id) {
			case "file-name": setDoc({ ...doc, fileTitle: value })
				break
			case "document-name": setDoc({ ...doc, docTitle: value })
				break
			case "document-revision": setDoc({ ...doc, documentRevision: value })
				break
			case "document-code": setDoc({ ...doc, documentCode: value })
				break
			case "protocol-date": {
				setDoc({ ...doc, protocolDate: value })
			}
				break
			case "fullName": setDoc({ ...doc, executorFullName: value })
				break
			case "department": setDoc({ ...doc, department: value })
				break
			case "terms": setDoc({ ...doc, reviewPeriod: value })
				break
			case "reader": setDoc({ ...doc, readerUser: value })
			console.log("heh")
				break
			case "one-click-read": {
				setDoc({ ...doc, oneClickRead: e.target.checked })
			}
				break
			case "unlimitted-archivation": {
				setDoc({ ...doc, unlimitedArch: e.target.checked })
			}
				break
			case "backup": {
				setDoc({ ...doc, backup: e.target.checked })
			}
				break
		}
	}

	const handleSelectFiles = (e) => {
		setFile(e.target.files[0])
	}

	const handleSend = async (e) => {
		e.preventDefault()
		const config = {
			method: "POST",
			url: `${_LINK}/v1/api/org/document/update`,
			headers: {
				"Authorization": localStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			data: JSON.stringify(doc)
		}
		console.log("test", doc)
		try {
			const { data } = await axios(config)

			if (file?.name) {
				const formData = new FormData()
				formData.append(
					'file',
					file,
					file.name
				)
				try {
					await axios.post(`${_LINK}/v1/api/org/document/file/${data.id}`, formData, {
						headers: {
							'Authorization': localStorage.getItem("token"),
						}
					})
				} catch (e) {
					alert(e)
				}
			}

			alert("Запись изменена")
		} catch (e) {
			alert(e)
		}
	}

	const termsArray = [
		"3 месяца",
		"6 месяцев",
		"1 год",
		"3 года"
	]

	return (
		<div className="create-doc-container">
			<p className="create-doc__title">Редактировать документ</p>
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
						<select onInput={handleInput} value={doc?.department?.name} name="responsible-department" id="department" className="create-doc__field-content">
							{
								<option value={doc?.department?.id}>{doc?.department}</option>
							}
							{
								departments?.filter(el => doc?.department !== el.depName).map((el, idx) => (
									<option key={idx} value={el.depName}>{el.depName}</option>
								))
							}
						</select>
					</div>
					{/* REVISION TIME */}
					<div className="create-doc__field">
						<div className="create-doc__field-title">Срок пересмотра</div>
						<select onInput={handleInput} name="revision-time" id="terms" className="create-doc__field-content">
							<option value={doc?.reviewPeriod}>{doc?.reviewPeriod}</option>
							{
								(doc?.reviewPeriod !== "3 месяца") && <option value="3 месяца">3 месяца</option>
							}
							{
								(doc?.reviewPeriod !== "6 месяцев") && <option value="6 месяцев">6 месяцев</option>
							}
							{
								(doc?.reviewPeriod !== "1 год") && <option value="1 год">1 год</option>
							}
							{
								(doc?.reviewPeriod !== "3 года") && <option value="3 года">3 года</option>
							}
						</select>
					</div>
				</div>
				{/* DOCUMENT UPLOADING  */}
				<div className="create-doc__field">
					<div className="create-doc__field-title">Загрузка документа</div>
					<div className="create-doc__upload-file create-doc__field-content">
						<label htmlFor="upload-file" >
							<span className="create-doc__label">
								<img src={uploadIcon} alt="" />
								<span>{file?.name || "Нажмите или перетащите файл для загрузки"}</span>
							</span>
						</label>
						<input type="file" id="upload-file" hidden onInput={handleSelectFiles} />
					</div>
				</div>
				<div className="create-doc__field" style={{ alignSelf: "flex-start" }}>
					<div className="create-doc__field">
						<div className="create-doc__field-title">Доступ к чтению</div>
						<select onInput={handleInput} name="responsible-department" id="reader" className="create-doc__field-content">
							{
								<option value={doc?.readerUser}>{doc?.readerUser}</option>
							}
							{
								users?.filter(el => el.username !== doc?.readerUser)?.map((el, idx) => (
									<option key={idx} value={el.username}>{el.username}</option>
								))
							}
						</select>

					</div>
					<div className="create-doc__checkbox-container">
						{/* ONE-CICK READ */}
						<div className="create-doc__checkbox">
							<input onInput={handleInput} type="checkbox" defaultChecked={doc?.oneClickRead} name="one-click-read" id="one-click-read" className="checkbox" />
							<label htmlFor="one-click-read">Чтение в один клик</label>
						</div>
						{/* UNLIMITED ARCHIVATION  */}
						<div className="create-doc__checkbox">
							<input onInput={handleInput} type="checkbox" defaultChecked={doc?.unlimitedArch} name="unlimitted-archivation" id="unlimitted-archivation" className="checkbox" />
							<label htmlFor="unlimitted-archivation">Не ограниченный объем документов для архивации</label>
						</div>
						{/* BACKUP  */}
						<div className="create-doc__checkbox">
							<input onInput={handleInput} type="checkbox" defaultChecked={doc?.backup} name="backup" id="backup" className="checkbox" />
							<label htmlFor="backup">Резервная копия </label>
						</div>
					</div>
				</div>
				{/* CHECKBOXES  */}
				<div className="create-doc__field">

				</div>
				{/* ADDITION BUTTON  */}
				<div style={{ alignSelf: "flex-end" }}>
					<button className='create-doc__decline' onClick={(e) => {
						e.preventDefault()
						navigate(`/info/get/${doc?.id}`, { replace: true })
					}}>Отменить</button>
					<button onClick={handleSend} type="submit" className="create-doc__button">Сохранить</button>
				</div>
			</form>
		</div>
	)
};

export default DocUpdate;