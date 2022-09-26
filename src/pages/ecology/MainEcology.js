import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const MainEcology = ({ children }) => {

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
				<NavLink end to="/ecology/folders/3/nest/0" className="inner-nav__link">Отходы</NavLink>
				<NavLink end to="/ecology/folders/4/nest/0" className="inner-nav__link">Планы</NavLink>
				<NavLink end to="/ecology/folders/5/nest/0" className="inner-nav__link">Проекты эмиссии</NavLink>
				<NavLink end to="/ecology/folders/6/nest/0" className="inner-nav__link">Проекты ОВОС</NavLink>
				<NavLink end to="/ecology/folders/7/nest/0" className="inner-nav__link">Программы производственного экологического контроля</NavLink>
			</nav>
			<div>
				{children}
			</div>
		</>
	)
}