import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import uploadIcon from '../../../assets/images/upload-icon.svg';
import { _LINK } from '../../../data/links';


const CreateEcoWasteDocForm = () => {
	const [file1, setFile1] = useState({})
	const [file2, setFile2] = useState({})
	const [file3, setFile3] = useState({})
	const [document, setDocument] = useState({})
	const { dirId } = useSelector(store => store.files)
	console.log(dirId);

	const handleSelectFiles1 = (e) => {
		setFile1(e.target.files[0]);
	}

	const handleSelectFiles2 = (e) => {
		setFile2(e.target.files[0]);
	}

	const handleSelectFiles3 = (e) => {
		setFile3(e.target.files[0]);
	}

	console.log(file1);
	console.log(file2);
	console.log(file3);

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

		console.log(config);
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
					console.log(e)
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
					console.log(e)
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
					console.log(e)
				}
			}

			alert("Запись добавлена")
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className="container" style={{ flexDirection: "column", alignItems: "center", gap: "0" }}>
			<p className="create-doc__title">Создать документ</p>
			<form action="./pasropts_doc_list.html" className="create-doc__form">
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Имя файла</div>
						<input type="text" name="fileName" onInput={handleInput} id="fileTitle" className="form__field-content" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Наименование документа</div>
						<input type="text" name="docName" onInput={handleInput} id="docTitle" className="form__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Номер и дата утверждения файла</div>
						<input type="date" name="protocolDate" onInput={handleInput} id="dateApproval" className="form__field-content form__field-content_protocol-date" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Срок действия</div>
						<input type="date" name="startDate" onInput={handleInput} id="dateStart" className="form__field-validity" />
						<input type="date" name="endDate" onInput={handleInput} id="dateEnd" className="form__field-validity" />
					</div>
				</div>
				<div className="form__field">
					<div className="form__field-title">Исполнительная организация</div>
					<input type="text" name="executiveOrganization" onInput={handleInput} id="organization" className="form__field-content form__field-content_long" />
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
						<input type="file" id="file1" hidden multiple onInput={handleSelectFiles1} />
					</div>
				</div>
				<div className="create-doc__buttons">
					<button onClick={handleSend} type="submit" className="create-doc__button create-doc__button-text">Сохранить</button>
				</div>
			</form>
		</div>
	);
};

export default CreateEcoWasteDocForm;