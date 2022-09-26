import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import '../../assets/style/doc_list_style.css';
import { useSelector } from 'react-redux/es/exports';
import { Paginate } from '../../components/Paginate';
import { _LINK } from '../../data/links';
import axios from 'axios';
import filterImage from '../../assets/images/doc-lict-filter.png'

function DocList() {

    const { dirId } = useSelector(store => store.files)
    const { id } = useParams()

    const [page, setPage] = useState(0)
    const [back, setBack] = useState({})
    const navigate = useNavigate()

    const [search, setSearch] = useState("")
    const [isOld, setIsOld] = useState(false)
    
    

    useEffect(() => {
        const get = async () => {
            const config = {
                method: "get",
                url: `${_LINK}/v1/api/org/document/all/${page}/50/${id}`,
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            try {
                const { data } = await axios(config)
                setBack(data)
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


    const handleNavigate = (id) => {
    }

    return (
        <div className="doc-list-container">
            <div class="doc-list__head-panel">
                <div class="doc-list__buttons">
                    <span class="go-back-button button-general" onClick={() => {navigate(-1)}}>Назад</span>
                    <NavLink exact to="/info/create" className="create-doc-button button-general">Создать документ</NavLink>
                </div>
                <div class="doc-list__search-row">
                    <img src={filterImage} alt="filter" class="doc-list__filter" onClick={() => {
                        const popup = document.getElementById("filter");
                        popup.classList.toggle("show");
                    }}/>
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

                <tr className="doc-table__row doc-table__row_titles">
                    <td>Имя</td>
                    <td>Название документа</td>
                    <td>Код документа</td>
                    <td>Номер и дата протокола утверждения</td>
                    <td>Ответственный департамент</td>
                    <td>Срок пересмотра</td>
                    <td>ФИО исполнителя</td>
                </tr>
                {
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
                                navigate(`/info/get/${el.id}`, { replace: true })
                            }}
                        >
                            <td>{el?.fileTitle}</td>
                            <td>{el?.docTitle}</td>
                            <td>{el?.id}</td>
                            <td>{el?.protocolDate}</td>
                            <td>{el?.department?.name}</td>
                            <td>{el?.reviewPeriod}</td>
                            <td>{el?.executorFullName}</td>
                        </tr>
                    ))
                }

            </table>
            {
                back?.totalPages && <div className='pagination__container'><Paginate page={page} setPage={setPage} totalPages={back?.totalPages} /></div>
            }
        </div>
    );
}

export default DocList;

