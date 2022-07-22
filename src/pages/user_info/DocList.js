import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../../assets/style/doc_list_style.css';
import { useSelector } from 'react-redux/es/exports';
import { Paginate } from '../../components/Paginate';
import { _LINK } from '../../data/links';
import axios from 'axios';

function DocList() {

    const { dirId } = useSelector(store => store.files)

    const [page, setPage] = useState(0)
    const [back, setBack] = useState({})

    const [search, setSearch] = useState("")
    const [isOld, setIsOld] = useState(false)

    useEffect(() => {
        const get = async () => {
            const config = {
                method: "get",
                url: `${_LINK}/v1/api/org/document/all/${page}/50/${dirId}`,
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

    const history = useHistory()

    const handleNavigate = (id) => {
        history.push(`/get/${id}`)
    }

    return (
        <div className="doc-list-container">
            <div className="doc-filter">
                <div className="doc-filter__row">
                    <select name="date-filter" id="" className="doc-filter__filters" onInput={(e) => setIsOld(e.target.value) }>
                        <option value={false}>Сначала новые</option>
                        <option value={true}>Сначала старые</option>
                    </select>
                    <input type="search" name="doc-search" id="#" className="doc-filter__search" onInput={(e) => setSearch(e.target.value)}/>
                    <NavLink exact to="/create" className="doc-filter__add">Добавить</NavLink>
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
                    back?.content?.filter((el,idx) => {
                        if (search) {
                            return el.docTitle.toLowerCase().includes(search.toLowerCase())
                        } else {
                            return el
                        }
                    }).map((el, idx) => (
                        <tr onClick={() => handleNavigate(el.id)} className="doc-table__row" id={idx}>
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

