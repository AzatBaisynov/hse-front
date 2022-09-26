import React from 'react';
import '../assets/style/navigation.css';
import logo from '../assets/images/AGP-logoauthorization-form-logo.svg';
import logOut from '../assets/images/header-logout.svg';
import userInfo from '../assets/images/sidebar-user-info.svg';
import reports from '../assets/images/sidebar-reports.svg';
import laborSafety from '../assets/images/sidebar-labor-safety.svg';
import ecology from '../assets/images/sidebar-ecology.svg';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../redux/actions/login';
import { Link } from 'react-router-dom';

function Navigation() {

    const dispatch = useDispatch()


    return (
        <div>
            <header className="header">
                <Link to="/"><img src={logo} alt="agp_logo" className="header__logo" /></Link>
                <div className="header__search-and-logout">
                    <input type="search" name="header-search-field" id="#" className="header__search-field" />
                    <button onClick={() => dispatch(logoutAction())}><img src={logOut} alt="header-logout-icon" className="header__logout-icon" /></button>
                </div>
            </header>
            <aside className="sidebar">
                <Link to="/info"><img src={userInfo} alt="user-info" /></Link>
                <Link to="/info"><p className="sidebar__module-title">Инфо для пользователя</p></Link>
                <a href="#"><img src={reports} alt="reports" /></a>
                <p className="sidebar__module-title">Отчеты</p>
                <a href="#"><img src={laborSafety} alt="labor-protection" /></a>
                <p className="sidebar__module-title">Охрана труда </p>
                <Link to="/ecology/folders/3/nest/0"><img src={ecology} alt="ecology" /></Link>
                <Link to="/ecology/folders/3/nest/0"><p className="sidebar__module-title">Экология</p></Link>
            </aside>
        </div>
    );
}

export default Navigation;