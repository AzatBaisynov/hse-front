import React, { useEffect, useState } from 'react';
import '../../assets/style/org_structure_style.css';
import employee from "../../assets/images/employee.svg";
import { _LINK } from '../../data/links';
import axios from 'axios';
import empty from "../../assets/images/hollow-resume.png"

function OrgStructure() {


    const [structure, setStructure] = useState({})
    const [currentEmployee, setCurrentEmployee] = useState({})
    const [currentPosition, setCurrentPosition] = useState({})
    const [currentDepartment, setCurrentDepartment] = useState([])

    useEffect(() => {
        const get = async () => {
            const config = {
                method: "GET",
                url: `${_LINK}/v1/api/org/all`,
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }
            try {
                const { data } = await axios(config)
                // setCurrentEmployee(data.me)
                setStructure(data)
                console.log(data)
            } catch (e) {
                alert(e)
            }
        }
        get()
    }, [])

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
                // setCurrentEmployee(data.me)
                setStructure({ departments: data.departments })
                console.log(data)
            } catch (e) {
                alert(e)
            }
        }
        get()
    }, [])

    useEffect(() => {
        if (currentEmployee.id) {
            const get = async () => {
                const config = {
                    method: "GET",
                    url: `${_LINK}/v1/api/org/position/${currentEmployee.id}`,
                    headers: {
                        "Authorization": localStorage.getItem("token")
                    }
                }
                try {
                    const { data } = await axios(config)
                    setCurrentPosition(data)
                } catch (e) {
                    alert(e)
                }
            }
            get()
        }
    }, [currentEmployee])

    const handleChangeUser = async (user) => {
        
        setCurrentEmployee(user)
        
    }

    const handleChangeDepartment = async (department) => {
        const config = {
            method: "GET",
            url: `${_LINK}/v1/api/org/ldap/users/${department.depName}`,
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }
        try {
            const { data } = await axios(config)
            console.log("data", data)
            setCurrentDepartment(data)
        } catch (e) {
            alert(e)
        }
    }

    return (
        <div className="org-structure-container" >
            <div className="org-structure department-list">
                <input type="search" name="department-list-search" placeholder="keywords" id="#" className="department-list__search" />
                <details open>
                    <summary className="department-list__departments">Asian Gas Pipeline</summary>
                    {
                        structure?.departments?.map((el, idx) => (
                            <details key={idx} onClick={() => handleChangeDepartment(el)}>
                                <summary className="department-list__departments">{el?.depName}</summary>
                            </details>
                        ))
                    }
                </details>
            </div>
            <div className="org-structure department-details">
                <p className="department-details__department-name">Служба внутреннего контроля</p>
                <div className="org-structure__employee-list">
                    {
                        currentDepartment?.map((el, idx) => (
                            <div className="department-details__employee" key={idx} id={el.id} onClick={() => {
                                handleChangeUser(el)
                            }}>
                                <img src={employee} alt="employee-icon" id={el.id} />
                                <p id={el.id} >{el?.username}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                currentEmployee?.username ? (
                    <div className="org-structure employee-details">
                        <img src={employee} alt="employee-icon" className="employee-details__img" />
                        <p className="employee-details__name">{currentEmployee?.username}</p>
                        <div className="employee-details__contact-info">
                            <div className="employee-details__value">
                                <p>Телефон</p>
                                <p>Email</p>
                                <p>Должность</p>
                            </div>
                            <div className="employee-details__value employee-details__value_darker">
                                <p>{currentEmployee?.phone || "-"}</p>
                                <p>{currentEmployee?.usermail || "-"}</p>
                                <p>{currentEmployee?.userdesc || "-"}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="org-structure employee-details employee-details_empty">
                        <img src={empty} alt="empty user" />
                    </div>
                )
            }

        </div>
    );
}

export default OrgStructure;

