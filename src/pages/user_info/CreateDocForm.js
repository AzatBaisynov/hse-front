import React, { useEffect, useState } from 'react';
import '../../assets/style/create_doc_form_style.css';
import uploadIcon from '../../assets/images/upload-icon.svg';
import DropzoneComponent from './DropzoneComponent';
import { _LINK } from '../../data/links';
import axios from 'axios';
import { useSelector } from 'react-redux/es/exports';

function CreateDocForm() {

    const [file, setFile] = useState({})
    const [departments, setDepartments] = useState([])
    const [users, setUsers] = useState([])
    const [document, setDocument] = useState({ backup: false, oneClickRead: false, unlimitedArch : false, reader: {id: 1}})
    const { dirId } = useSelector(store => store.files)

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
                setDocument({ ...document, readerUser: data.users[0].username, department: data.departments[0].depName, reviewPeriod: "3-months"})
            } catch (e) {
                console.log(e)
            }
        }
        get()
    }, [])

    const handleSelectFiles = (e) => {
        setFile(e.target.files[0])
    }

    const handleInput = (e) => {
        const {id, value} = e.target
        switch (id) {
            case "file-name" : setDocument({...document, fileTitle: value})
            break
            case "document-name" : setDocument({...document, docTitle: value})
            break
            case "document-revision" : setDocument({...document, documentRevision: value})
            break
            case "document-code" : setDocument({...document, documentCode: value})
            break
            case "protocol-date" : {
                setDocument({...document, protocolDate : value})
            }
            break
            case "fullName" : setDocument({...document, executorFullName: value}) 
            break
            case "department" : setDocument({...document, department: value})
            break
            case "terms" : setDocument({...document, reviewPeriod: value})
            break
            case "reader" : setDocument({...document, readerUser: value})
            break
            case "one-click-read" : {
                setDocument({...document, oneClickRead: e.target.checked})
            }
            break
            case "unlimitted-archivation" : {
                setDocument({...document, unlimitedArch: e.target.checked})
            } 
            break
            case "backup" : {
                setDocument({...document, backup: e.target.checked})
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
                "Content-Type" : "application/json"
            },
            data: JSON.stringify(document)
        }
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
                    console.log(e)
                }
            }

            alert("Запись добавлена")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="create-doc-container">
            <p className="create-doc__title">Создать документ</p>
            <form action="" className="create-doc__form">
                <div className="create-doc__row">
                    {/* FILE NAME  */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Имя файла</div>
                        <input onInput={handleInput} type="text" name="file-name" id="file-name" className="create-doc__field-content" />
                    </div>
                    {/*  DOCUMENT NAME */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Название документа</div>
                        <input onInput={handleInput} type="text" name="file-name" id="document-name" className="create-doc__field-content" />
                    </div>
                </div>
                <div className="create-doc__row">
                    {/* FILE NAME  */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Редакция документа</div>
                        <input onInput={handleInput} type="text" name="file-name" id="document-revision" className="create-doc__field-content" />
                    </div>
                    {/*  DOCUMENT NAME */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Код документа</div>
                        <input onInput={handleInput} type="text" name="file-name" id="document-code" className="create-doc__field-content" />
                    </div>
                </div>
                <div className="create-doc__row">
                    {/* DATE OF APPROVAL */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Номер и дата протокола
                            утверждения</div>
                        <input onInput={handleInput} type="date" name="file-name" id="protocol-date" className="create-doc__field-content" />
                    </div>
                    {/* NAME OF EXECUTOR  */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">ФИО Исполнителя </div>
                        <input onInput={handleInput} type="text" name="file-name" id="fullName" className="create-doc__field-content" />
                    </div>
                </div>
                <div className="create-doc__row">
                    {/* RESPONSIBLE DEPARTMENT */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Ответственный департамент</div>
                        <select onInput={handleInput} name="responsible-department" id="department" className="create-doc__field-content">
                            {
                                departments?.map((el, idx) => (
                                    <option key={idx} value={el.depName}>{el.depName}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* REVISION TIME */}
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Срок пересмотра</div>
                        <select onInput={handleInput} name="revision-time" id="terms" className="create-doc__field-content">
                            <option value="3 месяца">3 месяца</option>
                            <option value="6 месяцев">6 месяцев</option>
                            <option value="1 год">1 год</option>
                            <option value="3 года">3 года</option>
                        </select>
                    </div>
                </div>
                {/* DOCUMENT UPLOADING  */}
                <div className="create-doc__field">
                    <div className="create-doc__field-title">Загрузка документа</div>
                    <div className="create-doc__upload-file form__field-content form__field-content_long" style={{width: "965px"}}>
                        <label htmlFor="upload-file" >
                            <span className="create-doc__label">
                                <img src={uploadIcon} alt="" />
                                <span>{file?.name || "Нажмите или перетащите файл для загрузки" }</span>
                            </span>
                        </label>
                        <input type="file" id="upload-file" hidden onInput={handleSelectFiles}/>
                    </div>
                </div>
                <div className="create-doc__field" style={{alignSelf: "flex-start"}}>
                    <div className="create-doc__field">
                        <div className="create-doc__field-title">Доступ к чтению</div>
                        <select onInput={handleInput} name="responsible-department" id="reader" className="create-doc__field-content">
                            {
                                users?.map((el, idx) => (
                                    <option key={idx} value={el.username}>{el.username}</option>
                                ))
                            }
                        </select>
                        
                    </div>
                    <div className="create-doc__checkbox-container">
                        {/* ONE-CICK READ */}
                        <div className="create-doc__checkbox">
                            <input onInput={handleInput} type="checkbox" name="one-click-read" id="one-click-read" className="checkbox" />
                            <label htmlFor="one-click-read">Чтение в один клик</label>
                        </div>
                        {/* UNLIMITED ARCHIVATION  */}
                        <div className="create-doc__checkbox">
                            <input onInput={handleInput} type="checkbox" name="unlimitted-archivation" id="unlimitted-archivation" className="checkbox" />
                            <label htmlFor="unlimitted-archivation">Не ограниченный объем документов для архивации</label>
                        </div>
                        {/* BACKUP  */}
                        <div className="create-doc__checkbox">
                            <input onInput={handleInput} type="checkbox" name="backup" id="backup" className="checkbox" />
                            <label htmlFor="backup">Резервная копия </label>
                        </div>
                    </div>
                </div>
                {/* CHECKBOXES  */}
                <div className="create-doc__field">
                    
                </div>
                {/* ADDITION BUTTON  */}
                <button onClick={handleSend} type="submit" className="create-doc__button">Добавить документ</button>
            </form>
        </div>
    );
}

export default CreateDocForm;