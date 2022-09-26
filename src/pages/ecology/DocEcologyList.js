import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import '../../assets/style/doc_list_style.css';
import { useSelector } from 'react-redux/es/exports';
import { Paginate } from '../../components/Paginate';
import { _LINK } from '../../data/links';
import axios from 'axios';
import filterImage from '../../assets/images/doc-lict-filter.png'

const DocEcologyList = () => {

	const { dirId } = useSelector(store => store.files)
	const { id } = useParams()

	const [page, setPage] = useState(0)
	const [back, setBack] = useState({})
	const navigate = useNavigate()

	const [search, setSearch] = useState("")
	const [isOld, setIsOld] = useState(false)


	const statusWriter = (str) => {
		switch (str) {
			case "Передать на ознакомление" : {
				return (<p className='primary' style={{ width: "150px", color: "#fff"}}>Создан</p>)
			}
			case "Передать на рассмотрение": {
				return (<p className='warn' style={{ width: "150px", color: "#fff", background: "#E89F5D;" }}>На рассмотрении</p>)
			}
			case "Отправить на доработку": {
				return (<p className='error' style={{ width: "150px", color: "#fff", background: "#E85D5D;" }}>Отправлен на
					доработку</p>)
			}
			case "Согласовать документ": {
				return (<p className='success' style={{ width: "150px", color: "#fff", background: "#78CA85;" }}>Согласован</p>)
			}
		}
	}

	useEffect(() => {
		const get = async () => {
			const config = {
				method: "get",
				url: `${_LINK}/v1/api/eco/document/all/${page}/50/${id}`,
				headers: {
					"Authorization": localStorage.getItem("token")
				}
			}
			try {
				const { data } = await axios(config)
				setBack(data)
				console.log(data)
			} catch (e) {
				alert(e)
			}
		}
		get()
	}, [page])

	useEffect(() => {
		if (isOld) {
			const newB = back
			newB.content.reverse()
			setBack(newB)
		}
	}, [isOld])

	return (
		<div className="doc-list-container">
			<div class="doc-list__head-panel">
				<div class="doc-list__buttons">
					<span class="go-back-button button-general" onClick={() => { navigate(-1) }}>Назад</span>
					{(+id === 10 || +id === 11 || +id === 12 || +id === 37 || +id === 33) && <NavLink exact to="/ecology/create" className="create-doc-button button-general">Создать документ</NavLink>}
					{(+id > 12 && +id < 21 ) && <NavLink exact to="/ecology/util/create" className="create-doc-button button-general">Создать документ</NavLink>}
					{(+id === 22 || (+id === 26) || +id === 29 || +id === 35) && <NavLink exact to="/ecology/plan/create" className="create-doc-button button-general">Создать документ</NavLink>}
					{(+id === 27 || +id === 30  || +id === 34) && <NavLink exact to="/ecology/plan2/create" className="create-doc-button button-general">Создать документ</NavLink>}
					{(+id === 28 || +id === 31 || +id === 36) && <NavLink exact to="/ecology/plan3/create" className="create-doc-button button-general">Создать документ</NavLink>}
					{(+id === 32) && <NavLink exact to="/ecology/ovoc/create" className="create-doc-button button-general">Создать документ</NavLink>}
				</div>
				<div class="doc-list__search-row">
					<img src={filterImage} alt="filter" class="doc-list__filter" onClick={() => {
						const popup = document.getElementById("filter");
						popup.classList.toggle("show");
					}} />
					<div class="filter-popup" id="filter">
						<p class="filter-title">Фильтр</p>
						<form action="" class="filter-form">
							<div class="form__field">
								<label for="filterDate" class="form__field-title">Дата</label>
								<input type="date" name="filterDate" id="filterDate" class="form__field-content" />
							</div>
							<div class="form__field">
								<label for="responsibleDepartment" class="form__field-title">Ответственный департамент</label>
								<select name="responsibleDepartment" id="responsibleDep" class="form__field-content">
									<option value="security-dep">Департамент безопасности</option>
									<option value="hr-dep">Департамент HR</option>
									<option value="iso-dep">Департамент ПБ, ОТ, Э и ИСО</option>
									<option value="inner-control-dep">Служба внутреннего контроля</option>
								</select>
							</div>
							<div class="form__field">
								<label for="revisionTime" class="form__field-title">Срок пересмотра</label>
								<select name="revisionTime" id="revisionTime" class="form__field-content">
									<option value="3-months">3 месяца</option>
									<option value="6-months">6 месяцев</option>
									<option value="1-year">1 год</option>
									<option value="3years">3 года</option>
								</select>
							</div>
							<div class="form__field">
								<label for="" class="form__field-title">ФИО исполнителя</label>
								<input type="text" name="employeeName" id="employeeName" class="form__field-content" />
							</div>
							<button type="submit" class="filter-button">Применить</button>
						</form>
					</div>
					<input type="search" name="doc-search" id="#" class="doc-filter__search" placeholder="Поиск по ключевым словам" />
				</div>
			</div>
			<table className="doc-table">

				{
					(() => {
						if (+id < 32) {
							return (
								<tr className="doc-table__row doc-table__row_titles">
									<td>Имя</td>
									<td>Название документа</td>
									<td>Код документа</td>
									<td>Номер и дата протокола утверждения</td>
									<td>Исполнительная организация</td>
								</tr>
							)
						} else if (+id === 37) {
							return (
								<tr className="doc-table__row doc-table__row_titles">
									<td>Имя</td>
									<td>Наименование документа</td>
									<td>Код документа</td>
									<td>Номер и дата протокола утверждения</td>
									<td>Срок деиствия</td>
									<td>Исполнительная организация</td>
								</tr>
							)
						} else {
							return (
								<tr className="doc-table__row doc-table__row_titles">
									<td>Имя</td>
									<td>Наименование документа</td>
									<td>Отправитель</td>
									<td>Дата создания документа</td>
									<td>Согласующий департамент</td>
									<td>Дата передачи документа</td>
									<td>Актуальный статус</td>
								</tr>
							)
						}
					})()
				}
				{
					(+id < 32) && (
						back?.content?.filter((el, idx) => {
							if (search) {
								return el.docTitle.toLowerCase().includes(search.toLowerCase())
							} else {
								return el
							}
						}).map((el, idx) => (
							<tr className="doc-table__row" id={idx} onContextMenu={(e) => {
								e.preventDefault()
								console.log("hello world")
							}}
								onClick={(e) => {
									console.log(el)
									if (+id === 10 || +id === 11 || +id === 12) navigate(`/ecology/get/${el.id}`, { replace: true })
									if (+id > 12 && +id < 21)  navigate(`/ecology/util/get/${el.id}`, { replace: true })
									if (+id === 22 || +id === 26 || +id === 29) navigate(`/ecology/plan2/get/${el.id}`, { replace: true })
									if (+id === 27 ) navigate(`/ecology/plan2/get/${el.id}`, { replace: true })
									if (+id === 28) navigate(`/ecology/plan3/get/${el.id}`, { replace: true })
								}}
							>
								<td>{el?.fileTitle}</td>
								<td>{el?.docTitle}</td>
								<td>{el?.id}</td>
								<td>{el?.dateApproval}</td>
								<td>{el?.organization}</td>
							</tr>
						))
					)
				}
				{
					(+id === 32) && (
						back?.content?.filter((el, idx) => {
							console.log("TEEEEEE")
							if (search) {
								return el.docTitle.toLowerCase().includes(search.toLowerCase())
							} else {
								return el
							}
						}).map((el, idx) => (
							<tr className="doc-table__row" id={idx} onContextMenu={(e) => {
								e.preventDefault()
								console.log("hello world")
							}}
								onClick={(e) => {
									console.log(el)
									if (+id === 10 || +id === 11 || +id === 12) navigate(`/ecology/get/${el.id}`, { replace: true })
									if (+id > 12 && +id < 21) navigate(`/ecology/util/get/${el.id}`, { replace: true })
									if (+id === 22 || +id === 26 || +id === 29) navigate(`/ecology/plan2/get/${el.id}`, { replace: true })
									if (+id === 27) navigate(`/ecology/plan2/get/${el.id}`, { replace: true })
									if (+id === 28) navigate(`/ecology/plan3/get/${el.id}`, { replace: true })
									if (+id === 32) navigate(`/ecology/ovoc/get/${el.id}`, { replace: true })

								}}
							>
								<td>{el?.fileTitle}</td>
								<td>{el?.docTitle}</td>
								<td>{el?.senderUser}</td>
								<td>{el?.dateStart}</td>
								<td>{el?.issuingAuthority}</td>
								<td>{el?.dateEnd}</td>
								<td>{statusWriter(el?.action)}</td>
							</tr>
						))
					)
				}

			</table>

			{
				back?.totalPages && <div className='pagination__container'><Paginate page={page} setPage={setPage} totalPages={back?.totalPages} /></div>
			}
		</div>
	);
};

export default DocEcologyList;