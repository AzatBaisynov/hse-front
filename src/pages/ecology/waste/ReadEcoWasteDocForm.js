import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import uploadIcon from '../../../assets/images/upload-icon.svg';
import { _LINK } from '../../../data/links';
import { downloadFile } from '../../../data/downloader';


const ReadEcoWasteDocForm = () => {
	const [file1, setFile1] = useState({})
	const [file2, setFile2] = useState({})
	const [file3, setFile3] = useState({})
	const [document, setDocument] = useState({})
	const [link, setLink] = useState({})
	const {id} = useParams();
	const navigate = useNavigate()

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
				setLink(l)
				console.log(l)
			} catch (e) {
				console.log(e)
			}
		}
		getDocument()
	}, [])

	const handleSelectFiles = (e) => {
		setFile1(e.target.files[0])
	}

	return (
		<div className="container" style={{ flexDirection: "column", alignItems: "center", gap: "0" }}>
			<p className="create-doc__title">Просмотр документа</p>
			<form action="./pasropts_doc_list.html" className="create-doc__form">
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Имя файла</div>
						<input type="text" value={document?.fileTitle} name="fileName" id="fileTitle" className="form__field-content" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Наименование документа</div>
						<input type="text" name="docName" value={document?.docTitle} id="docTitle" className="form__field-content" />
					</div>
				</div>
				<div className="create-doc__row">
					<div className="form__field">
						<div className="form__field-title">Номер и дата утверждения файла</div>
						<input type="date" name="protocolDate" value={document?.dateApproval} id="dateApproval" className="form__field-content form__field-content_protocol-date" />
					</div>
					<div className="form__field">
						<div className="form__field-title">Срок действия</div>
						<input type="date" name="startDate" id="dateStart" value={document?.dateStart} className="form__field-validity" />
						<input type="date" name="endDate" id="dateEnd" value={document?.dateEnd} className="form__field-validity" />
					</div>
				</div>
				<div className="form__field">
					<div className="form__field-title">Исполнительная организация</div>
					<input type="text" name="executiveOrganization" id="organization" value={document?.organization} className="form__field-content form__field-content_long" />
				</div>
				<div className="create-doc__field" >
					<div className="create-doc__field-title">Загрузка документа</div>
					<div className="create-doc__upload-file create-doc__field-content" style={{ width: "886px" }}>
						{link?.download && (
							<a href={link?.href} download={link?.download}>
								<label htmlFor="upload-file" >
									<span className="create-doc__label" >
										<img src={uploadIcon} alt="" style={{ cursor: "pointer" }} />
										<span style={{ cursor: "pointer" }} >{document?.file1?.name || "Нажмите или перетащите файл для загрузки"}</span>
									</span>
								</label>
							</a>
						)}
					</div>
				</div>
				<div className="create-doc__buttons">
					<button type="submit" onClick={(e) => {
						e.preventDefault()
						navigate(`/ecology/edit/${document?.id}`, { replace: true })
					}} className="create-doc__button create-doc__button-text">Редактировать</button>
				</div>
			</form>
		</div>
	);
};

export default ReadEcoWasteDocForm;