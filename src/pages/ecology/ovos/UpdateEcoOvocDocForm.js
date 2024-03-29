import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import uploadIcon from '../../../assets/images/upload-icon.svg';
import { _LINK } from '../../../data/links';


const UpdateEcoOvocDocForm = () => {
	const [file1, setFile1] = useState({})
	const [file2, setFile2] = useState({})
	const [file3, setFile3] = useState({})
	const [document, setDocument] = useState({})
	const { dirId } = useSelector(store => store.files)
	const [departments, setDepartments] = useState([])
	const [users, setUsers] = useState([])
	const {id} = useParams()

	const handleSelectFiles = (e) => {
		setFile1(e.target.files[0])
	}

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
				// setDocument({ ...document, action: document?.action, senderUser: data.users[0].username, issuingAuthority: data.departments[0].depName, makerUser: data.users[0].username })
			} catch (e) {
				// alert(e)
				console.log(e);
			}
		}
		get()

		const getDocument = async () => {
			const config = {
				method: "GET",
				url: `${_LINK}/v1/api/eco/document/id/${id}`,
				headers: {
					"Authorization": localStorage.getItem("token")
				}
			}
			try {
				const { data } = await axios(config)
				console.log(data)
				setDocument(data)
			} catch (e) {
				// alert(e)
				console.log(e);
			}
		}
		getDocument()
	}, [])

	const handleInput = (e) => {
		const { id, value } = e.target
		switch (id) {
			case "fileTitle": setDocument({ ...document, fileTitle: value })
				break
			case "docTitle": setDocument({ ...document, docTitle: value })
				break
			case "document-revision": setDocument({ ...document, documentRevision: value })
				break
			case "document-code": setDocument({ ...document, documentCode: value })
				break
			case "dateApproval": {
				setDocument({ ...document, dateApproval: value })
				break
			}
			case "dateStart": {
				setDocument({ ...document, dateStart: value })
				break
			}
			case "dateEnd": {
				setDocument({ ...document, dateEnd: value })
				break
			}
			case "organization": setDocument({ ...document, organization: value })
				break
			case "department": setDocument({ ...document, department: value })
				break
			case "terms": setDocument({ ...document, reviewPeriod: value })
				break
			case "reader": setDocument({ ...document, readerUser: value })
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
			case "comment": {
				setDocument({ ...document, comment: value })
				break
			}
			case "senderUser": {
				setDocument({ ...document, senderUser: value })
				break
			}
			case "issuingAuthority": {
				setDocument({ ...document, issuingAuthority: value })
				break
			}
			case "action": {
				setDocument({ ...document, action: value })
				break
			}
			case "makerUser": {
				setDocument({ ...document, makerUser: value })
				break
			}
		}
	}

	const handleSend = async (e) => {
		e.preventDefault()
		setDocument({...document, id})
		const config = {
			method: "POST",
			url: `${_LINK}/v1/api/eco/document/${dirId}`,
			headers: {
				"Authorization": localStorage.getItem("token"),
				"Content-Type": "application/json"
			},
			data: JSON.stringify(document)
		}
		try {
			const { data } = await axios(config)

			if (file1?.name) {
				console.log("filename", file1)
				const formData = new FormData()
				formData.append(
					'file',
					file1,
					file1.name
				)
				try {
					await axios.post(`${_LINK}/v1/api/eco/document/file/${data.id}/1`, formData, {
						headers: {
							'Authorization': localStorage.getItem("token"),
						}
					})
				} catch (e) {
					// alert(e)
					console.log(e);
				}
			}
			if (file2?.name) {
				const formData = new FormData()
				formData.append(
					'file',
					file2,
					file2.name
				)
				try {
					await axios.post(`${_LINK}/v1/api/eco/document/file/${data.id}/2`, formData, {
						headers: {
							'Authorization': localStorage.getItem("token"),
						}
					})
				} catch (e) {
					// alert(e)
					console.log();
				}
			}
			if (file3?.name) {
				const formData = new FormData()
				formData.append(
					'file',
					file3,
					file3.name
				)
				try {
					await axios.post(`${_LINK}/v1/api/eco/document/file/${data.id}/3`, formData, {
						headers: {
							'Authorization': localStorage.getItem("token"),
						}
					})
				} catch (e) {
					// alert(e)
					console.log(e);
				}
			}

			alert("Запись добавлена")
		} catch (e) {
			// alert(e)
			console.log(e);
		}
	}

	return (
		<div className="container" style={{ flexDirection: "column", alignItems: "center", gap: "0" }}>
			<p className="create-doc__title">Редактировать документ</p>
			<form action="./pasropts_doc_list.html" className="create-doc__form">
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Имя файла</div>
						<input type="text" name="fileName" value={document?.fileTitle} onInput={handleInput} id="fileTitle" className="form__field-content" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Наименование документа</div>
						<input type="text" name="docName" value={document?.docTitle} onInput={handleInput} id="docTitle" className="form__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Дата создания документа</div>
						<input type="date" name="protocolDate" value={document.dateStart} onInput={handleInput} id="dateStart" className="form__field-content form__field-content_protocol-date" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Дата передачи документа</div>
						<input type="date" name="protocolDate" value={document.dateEnd} onInput={handleInput} id="dateEnd" className="form__field-content form__field-content_protocol-date" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="create-doc__field">
						<div className="create-doc__field-title">Отправитель</div>
						<select onInput={handleInput} value={document?.senderUser} name="senderUser" id="senderUser" className="create-doc__field-content">
							{
								users?.map((el, idx) => (
									<option key={idx} value={el.username}>{el.username}</option>
								))
							}
						</select>
					</div>
					<div className="create-doc__field">
						<div className="create-doc__field-title">Согласующий департамент</div>
						<select onInput={handleInput} value={document?.issuingAuthority} name="responsible-department" id="issuingAuthority" className="create-doc__field-content">
							{
								departments?.map((el, idx) => (
									<option key={idx} value={el.depName}>{el.depName}</option>
								))
							}
						</select>
					</div>
				</div>
				<div className="create-doc__row">
					<div className="create-doc__field">
						<div className="create-doc__field-title">Действие</div>
						<select onInput={handleInput} value={document?.action} name="responsible-department" id="action" className="create-doc__field-content">
							<option value="Передать на ознакомление">Передать на ознакомление</option>
							<option value="Передать на рассмотрение">Передать на рассмотрение</option>
							<option value="Отправить на доработку">Отправить на доработку</option>
							<option value="Согласовать документ">Согласовать документ</option>
						</select>
					</div>
					<div className="create-doc__field">
						<div className="create-doc__field-title">Исполнитель</div>
						<select onInput={handleInput} name="makerUser" id="makerUser" className="create-doc__field-content">
							{
								users?.map((el, idx) => (
									<option key={idx} value={el.username}>{el.username}</option>
								))
							}
						</select>
					</div>
				</div>
				<div className="create-doc__field" >
					<div className="create-doc__field-title">Проектно-сметная документация (ПСД)</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						<label htmlFor="file1" >
							<span className="create-doc__label">
								<img src={uploadIcon} alt="" />
								<span>{file1?.name || "Нажмите или перетащите файл для загрузки"}</span>
							</span>
						</label>
						<input type="file" id="file1" hidden onInput={handleSelectFiles} />
					</div>
				</div>
				<div className="create-doc__field" >
					<div className="create-doc__field-title">ОВОС/РООС</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						<label htmlFor="file2" >
							<span className="create-doc__label">
								<img src={uploadIcon} alt="" />
								<span>{file2.name || "Нажмите или перетащите файл для загрузки"}</span>
							</span>
						</label>
						<input type="file" id="file2" hidden onInput={handleSelectFiles} />
					</div>
				</div>
				<textarea name="comment" id="comment" value={document?.comment} onInput={handleInput} class="form__comment form__field-content" placeholder="Комментарий"></textarea>

				<div className="create-doc__buttons">
					<a href="./pasropts_doc_list.html" className="create-doc__cancel-button create-doc__button-text">Отменить</a>
					<button onClick={handleSend} type="submit" className="create-doc__button create-doc__button-text">Сохранить</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateEcoOvocDocForm;