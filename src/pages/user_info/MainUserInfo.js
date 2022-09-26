import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export const MainUserInfo = ({children}) => {

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
				<NavLink end to="/info" className="inner-nav__link">Организационная структура</NavLink>
				<NavLink end to="/info/folders/1" className="inner-nav__link">Документация HSE</NavLink>
				<NavLink end to="/info/folders/2" className="inner-nav__link">Документация по промышленной безопасности</NavLink>
			</nav>
			<div>
				{children}
			</div>
		</>
	)
}