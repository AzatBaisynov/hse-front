import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const MainLaborProtection = ({ children }) => {

	useEffect(() => {
		const body = document.querySelector("body")
		body.style.background = 'none'
		return () => {
			const body = document.querySelector("body")
			body.removeAttribute("style")
		}
	}, [])


	return (
		<>
			<nav className="inner-nav">
				<NavLink end to="/labor_protection/folders/8/nest/0" className="inner-nav__link">СИЗ</NavLink>
				<NavLink end to="/labor_protection/folders/9/nest/0" className="inner-nav__link">Наряд-допуск</NavLink>
				<NavLink end to="/labor_protection/folders/10/nest/0" className="inner-nav__link">ПНБ</NavLink>
				<NavLink end to="/labor_protection/folders/11/nest/0" className="inner-nav__link">Транспортная безопасность</NavLink>
				<NavLink end to="/labor_protection/folders/12/nest/0" className="inner-nav__link">Управление сотрудниками</NavLink>
				<NavLink end to="/labor_protection/folders/13/nest/0" className="inner-nav__link">Управление подрядчиками</NavLink>
			</nav>
			<div>
				{children}
			</div>
		</>
	)
}