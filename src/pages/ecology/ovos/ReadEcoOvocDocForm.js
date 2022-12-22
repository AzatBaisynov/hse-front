import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import uploadIcon from '../../../assets/images/upload-icon.svg';
import { _LINK } from '../../../data/links';
import { downloadFile } from '../../../data/downloader';


const ReadEcoOvocDocForm = () => {
	const [file1, setFile1] = useState({})
	const [file2, setFile2] = useState({})
	const [file3, setFile3] = useState({})
	const [document, setDocument] = useState({})
	const { dirId } = useSelector(store => store.files)
	const [link1, setLink1] = useState({})
	const [link2, setLink2] = useState({})
	const navigate = useNavigate()
	const {id} = useParams()

	const handleSelectFiles = (e) => {
		setFile1(e.target.files[0])
	}

	useEffect(() => {
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
				const l = await downloadFile(`${_LINK}/v1/api/file/${data?.file1?.name}`, data?.file1?.name)
				setLink1(l)
				const l2 = await downloadFile(`${_LINK}/v1/api/file/${data?.file2?.name}`, data?.file2?.name)
				setLink2(l2)
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
					console.log(e);
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
			<p className="create-doc__title">Создать документ</p>
			<form action="./pasropts_doc_list.html" className="create-doc__form">
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Имя файла</div>
						<input type="text" name="fileName" value={document.fileTitle} id="fileTitle" className="form__field-content" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Наименование документа</div>
						<input type="text" name="docName" value={document.docTitle} id="docTitle" className="form__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Дата создания документа</div>
						<input type="date" name="protocolDate" value={document.dateStart} id="dateStart" className="form__field-content form__field-content_protocol-date" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Дата передачи документа</div>
						<input type="date" name="protocolDate" value={document.dateEnd} id="dateEnd" className="form__field-content form__field-content_protocol-date" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="create-doc__field">
						<div className="create-doc__field-title">Отправитель</div>
						<input value={document.senderUser} name="responsible-department" id="senderUser" className="create-doc__field-content">
						</input>
					</div>
					<div className="create-doc__field">
						<div className="create-doc__field-title">Согласующий департамент</div>
						<input value={document.issuingAuthority} name="responsible-department" id="issuingAuthority" className="create-doc__field-content">
						</input>
					</div>
				</div>
				<div className="create-doc__row">
					<div className="create-doc__field">
						<div className="create-doc__field-title">Действие</div>
						<input value={document?.action} name="responsible-department" id="action" className="create-doc__field-content"/>
					</div>
					<div className="create-doc__field">
						<div className="create-doc__field-title">Отправитель</div>
						<input value={document.makerUser} name="responsible-department" id="makerUser" className="create-doc__field-content">
						</input>
					</div>
				</div>
				<div className="create-doc__field" >
					<div className="create-doc__field-title">Проектно-сметная документация (ПСД)</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						{link1?.download && (
							<a href={link1?.href} download={link1?.download}>
								<label htmlFor="upload-file1" >
									<span className="create-doc__label" >
										<img src={uploadIcon} alt="" style={{ cursor: "pointer" }} />
										<span style={{ cursor: "pointer" }} >{document?.file1?.name || "Нажмите или перетащите файл для загрузки"}</span>
									</span>
								</label>
							</a>
						)}
					</div>
				</div>
				<div className="create-doc__field" >
					<div className="create-doc__field-title">ОВОС/РООС</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						{link2?.download && (
							<a href={link2?.href} download={link2?.download}>
								<label htmlFor="upload-file2" >
									<span className="create-doc__label" >
										<img src={uploadIcon} alt="" style={{ cursor: "pointer" }} />
										<span style={{ cursor: "pointer" }} >{document?.file2?.name || "Нажмите или перетащите файл для загрузки"}</span>
									</span>
								</label>
							</a>
						)}
					</div>
				</div>
				<textarea name="comment" id="comment" value={document?.comment}
				class="form__comment form__field-content" placeholder="Комментарий"></textarea>

				<div className="create-doc__buttons">
					<button type="submit" onClick={(e) => {
						e.preventDefault()
						navigate(`/ecology/ovoc/edit/${document?.id}`, { replace: true })
					}} className="create-doc__button create-doc__button-text">Редактировать</button>
				</div>
			</form>
		</div>
	);
};

export default ReadEcoOvocDocForm;