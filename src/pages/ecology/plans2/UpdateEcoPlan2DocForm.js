import React, { useEffect, useState } from 'react';
import uploadIcon from '../../../assets/images/upload-icon.svg';
import { useSelector } from 'react-redux';
import { _LINK } from '../../../data/links';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { downloadFile } from '../../../data/downloader';



const UpdateEcoPlanDocForm = () => {
	const [file1, setFile1] = useState({})
	const [file2, setFile2] = useState({})
	const [file3, setFile3] = useState({})
	const [document, setDocument] = useState({})
	const { dirId } = useSelector(store => store.files)
	const { id } = useParams();
	const navigate = useNavigate();

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
			} catch (e) {
				console.log(e)(e)
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
			case "issuingAuthority" : {
				setDocument({ ...document, issuingAuthority: value })
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
					console.log(e)(e)
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
					console.log(e)(e)
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
					console.log(e)(e)
				}
			}

			console.log(e)("Запись добавлена")
		} catch (e) {
			console.log(e)(e)
		}
	}

	return (
		<div className="container" style={{ flexDirection: "column", alignItems: "center", gap: "0" }}>
			<p className="create-doc__title">Создать документ</p>
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
						<div className="form__field-title">Номер и дата утверждения файла</div>
						<input type="date" name="protocolDate" value={document?.dateApproval} onInput={handleInput} id="dateApproval" className="form__field-content form__field-content_protocol-date" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Срок действия</div>
						<input type="date" value={document?.dateStart} name="startDate" onInput={handleInput} id="dateStart" className="form__field-validity" />
						<input type="date" value={document?.dateEnd} name="endDate" onInput={handleInput} id="dateEnd" className="form__field-validity" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Исполнительная организация</div>
						<input type="text" name="executiveOrganization" value={document?.organization} onInput={handleInput} id="organization" className="form__field-content " />
					</div>
					<div className="form__field">
						<div className="form__field-title">Номер документа заключения</div>
						<input type="text" name="fileName" value={document?.docNumber} onInput={handleInput} id="docNumber" className="form__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Дата выдачи заключения</div>
						<input type="date" name="protocolDate" value={document?.dateGiven} onInput={handleInput} id="dateGiven" className="form__field-content form__field-content_protocol-date" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Орган выдачи</div>
						<select className='form__field-content' name="fileName" onInput={handleInput} value={document?.issuingAuthority} id="issuingAuthority">
							<option value="Министерство экологии, геологии и природных ресурсов РК">Министерство экологии, геологии и природных ресурсов РК</option>
							<option value="Департамент экологии Алматинской области (АО)">Департамент экологии Алматинской области (АО)</option>
							<option value="Департамент экологии Жамбылской области (ЖО)">Департамент экологии Жамбылской области (ЖО)</option>
							<option value="Департамент экологии Туркестанской области (ТО)">Департамент экологии Туркестанской области (ТО)</option>
							<option value="Управление природных ресурсов и регулирования природопользования Алматинской области (АО)">Управление природных ресурсов и регулирования природопользования Алматинской области (АО)</option>
							<option value="Управление природных ресурсов и регулирования природопользования Жамбылской области (ЖО)">Управление природных ресурсов и регулирования природопользования Жамбылской области (ЖО)</option>
							<option value="Управление природных ресурсов и регулирования природопользования Туркестанской области (ТО)">Управление природных ресурсов и регулирования природопользования Туркестанской области (ТО)</option>
						</select>
					</div>
				</div>
				<div className="create-doc__field" >
					<div className="create-doc__field-title">Загрузка документа</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						<label htmlFor="file1" >
							<span className="create-doc__label">
								<img src={uploadIcon} alt="" />
								<span>{file1?.name || "Нажмите или перетащите файл для загрузки"}</span>
							</span>
						</label>
						<input type="file"  id="file1" hidden onInput={handleSelectFiles} />
					</div>
				</div>
				<textarea name="comment" id="comment" onInput={handleInput} value={document?.comment} class="form__comment form__field-content" placeholder="Комментарий"></textarea>

				<div className="create-doc__buttons">
					<a onClick={(e) => {
						e.preventDefault()
						navigate(`/ecology/plan2/get/${document?.id}`, { replace: true })
					}} className="create-doc__cancel-button create-doc__button-text">Отменить</a>
					<button onClick={handleSend} type="submit" className="create-doc__button create-doc__button-text">Сохранить</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateEcoPlanDocForm;