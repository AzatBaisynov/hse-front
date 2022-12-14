import React, { useEffect, useState } from "react";
import "../../../../assets/style/doc_folders_style.css";
import { NavLink, useParams } from "react-router-dom";
import folderIcon from "../../../../assets/images/folder-icon.svg";
import { useSelector } from 'react-redux/es/exports';

function ScheduleYearFolders() {
  const { dirId } = useSelector(store => store.files)

  let pnbr = '';

  if (dirId === 49) {
    pnbr = 'schedule_year';
  } else if (dirId === 50) {
    pnbr = 'schedule_month';
  } else if (dirId === 51) {
    pnbr = 'schedule_week';
  } else if (dirId === 53) {
    pnbr = 'fact_year';
  } else if (dirId === 54) {
    pnbr = 'fact_month';
  } else if (dirId === 55) {
    pnbr = 'fact_week';
  } 

  return (
    <div className="container">
      <NavLink to={`/labor_protection/pnb_${pnbr}`} className="doc-folder">
        <img src={folderIcon} alt="folder-icon" />
        <p className="doc-folder__name">ПНБР</p>
      </NavLink>
      <NavLink to={`/labor_protection/pnbv_${pnbr}`} className="doc-folder">
        <img src={folderIcon} alt="folder-icon" />
        <p className="doc-folder__name">ПНБВ</p>
      </NavLink>
    </div>
  );
}

export default ScheduleYearFolders;
