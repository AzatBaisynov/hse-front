import React from 'react';
import CreateDocForm from './CreateDocForm';
import DocFolders from './DocFolders';
import DocList from './DocList';
import OrgStructure from './OrgStructure';
import { MemoryRouter, NavLink, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DocumentRead from './DocumentRead';

export const MainUserInfo = () => {

	let history = createBrowserHistory()

	return (
		<MemoryRouter>
			<nav className="inner-nav">
				<NavLink exact to="/" className="inner-nav__link">Организационная структура</NavLink>
				<NavLink exact to="/folders/1" className="inner-nav__link">Документация HSE</NavLink>
				<NavLink exact to="/folders/2" className="inner-nav__link">Документация по промышленной безопасности</NavLink>
			</nav>
			{/* <CreateDocForm /> */}
			{/* <DocFolders /> */}
			{/* <DocList /> */}
			{/* <OrgStructure /> */}
			<Switch>
				<Route exact path="/" component={OrgStructure} />
				<Route exact path="/folders/:id" component={DocFolders} />
				<Route exact path="/list" component={DocList} />
				<Route exact path="/create" component={CreateDocForm} />
				<Route exact path="/get/:id" component={DocumentRead} />
			</Switch>
		</MemoryRouter>
	)
}