import "../assets/style/main_page.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from "../assets/images/AGP-logoauthorization-form-logo.svg";
import pointer from "../assets/images/arrow-pointer.svg";
import React, { useEffect, useState } from "react";
import "../assets/style/doc_list_style.css";
import { _LINK } from "../data/links";
import axios from "axios";

const MainPage = () => {
  const [page, setPage] = useState(0);
  const [back, setBack] = useState({});
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isOld, setIsOld] = useState(false);

  useEffect(() => {
    const get = async () => {
      console.log("hello 222");
      const config = {
        method: "get",
        url: `${_LINK}/v1/api/labor/dir/71`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      console.log("Hello");
      try {
        const { data } = await axios(config);
        setBack(data);
        console.log(data);
      } catch (e) {
        alert(e);
      }
    };
    get();
  }, [page]);

  useEffect(() => {
    console.log(back);
  });

  useEffect(() => {
    if (isOld) {
      const newB = back;
      newB.content.reverse();
      setBack(newB);
    }
  }, [isOld]);

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
        <input
          type="radio"
          name="tab"
          id="tab1"
          className="notifications__radio"
          defaultChecked
        />
        <label htmlFor="tab1" className="notifications__tab">
          Новые задачи
        </label>
        <input
          type="radio"
          name="tab"
          id="tab2"
          className="notifications__radio"
        />
        <label htmlFor="tab2" className="notifications__tab">
          В работе
        </label>
        {/* NOTIFICATION PANELS */}
        <div className="notification__panel" id="newTasksPanel">
          <img src={pointer} alt="pointer" />
          <a>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            omnis aliquid aut quibusdam iure accusamus odit assumenda, qui
            suscipit quod corrupti nisi nulla laboriosam consectetur atque
            impedit quidem debitis quam!
          </a>
          <br />
          <br />
          <img src={pointer} alt="pointer" />
          <a>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum
            omnis aliquid aut quibusdam iure accusamus odit assumenda.
          </a>
          {Object.keys(back).map((key, idx) => (
            <div
              className="doc-table__row"
              id={idx}
              onContextMenu={(e) => {
                e.preventDefault();
                console.log("hello world");
              }}
              onClick={(e) => {
                console.log(key);
                navigate(`/labor/siz/allowance/get/${back[key].id}`, {
                  replace: true,
                });
              }}
            >
			  Сообщение о потребности в закупе от: {back[key]?.employeeFullName} 
            </div>
          ))}
        </div>
        <div className="notification__panel" id="inWorkPanel" />
      </div>
    </div>
  );
};

export default MainPage;
