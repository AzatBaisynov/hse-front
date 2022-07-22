import React, { useState } from 'react';
import '../assets/style/authorization_style.css';
import a from '../assets/images/AGP-logoauthorization-form-logo.svg';
import { useDispatch } from 'react-redux';
import { loginAction } from "../redux/actions/login";
import { _LINK } from '../data/links';
import axios from 'axios';

function Authorization () {

    const dispatch = useDispatch()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        const auth = JSON.stringify({ login, password })
        var config = {
            method: 'post',
            url: `${_LINK}/v1/api/auth`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: auth
        }
        console.log(auth)
        axios(config).then(({ data }) => {
            dispatch(loginAction(data))
        }).catch(() => {
            setMessage("Invalid data")
        })
    }

    return (
        <div className='authorization'>
            <div className="authorization-form">
                <img src={a} alt="" className="authorization-form-logo" />
                <h3 className="authorization-form__title" aria-colspan="authorization-form__title">АВТОРИЗАЦИЯ</h3>
                <form action="#" method="get">
                    <div>
                        <input type="text" placeholder="Имя пользователя" onInput={(e) => setLogin(e.target.value)} className="authorization-form__fields authorization-form__fields_username" />
                    </div>
                    <div>
                        <input type="password" placeholder="Пароль" onInput={(e) => setPassword(e.target.value)} className="authorization-form__fields authorization-form__fields_password" />
                    </div>
                    <button type="submit" className="authorization-form__button" onClick={handleSubmit}>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Authorization;