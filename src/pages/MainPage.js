import React from 'react';
import "../assets/style/main_page.css"
import logo from "../assets/images/AGP-logoauthorization-form-logo.svg"
import pointer from "../assets/images/arrow-pointer.svg"

const MainPage = () => {

	return (
		<div className="container">
			<div className="home-content">
				{/* HSE TITLE */}
				<div className="hse-logo-container">
					<p className="red">H</p>
					<p className="blue">S</p>
					<p className="light-blue">E</p>
				</div>
				<h1 className="hse-full">Health. Safety. Environment.</h1>
				<img src={logo} alt="logo" className="home__img" />
			</div>
			<div className="notifications">
				{/* TABS */}
				<input type="radio" name="tab" id="tab1" className="notifications__radio" defaultChecked />
				<label htmlFor="tab1" className="notifications__tab">Новые задачи</label>
				<input type="radio" name="tab" id="tab2" className="notifications__radio" />
				<label htmlFor="tab2" className="notifications__tab">В работе</label>
				{/* NOTIFICATION PANELS */}
				<div className="notification__panel" id="newTasksPanel">
					<img src={pointer} alt="pointer" />
					<a>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum omnis aliquid aut quibusdam iure accusamus odit assumenda, qui suscipit quod corrupti nisi nulla laboriosam consectetur atque impedit quidem debitis quam!</a><br /><br />
					<img src={pointer} alt="pointer" />
					<a>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum omnis aliquid aut quibusdam iure accusamus odit assumenda.</a>
				</div>
				<div className="notification__panel" id="inWorkPanel" />
			</div>
		</div>

	);
};

export default MainPage;