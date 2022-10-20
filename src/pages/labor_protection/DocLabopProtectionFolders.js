import React, { useEffect, useState } from 'react';
import '../../assets/style/doc_folders_style.css';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { _LINK } from '../../data/links';
import { setDir } from '../../redux/actions/files';
import folderIcon from '../../assets/images/folder-icon.svg';

function DocLaborProtectionFolders() {

	const [dirs, setDirs] = useState([])
	const dispatch = useDispatch()

	const { id, nest } = useParams()

	useEffect(() => {
		const get = async () => {
			if (nest === "0"){
				const config = {
					method: "GET",
					url: `${_LINK}/v1/api/eco/dir/${id}/1`,
					headers: {
						"Authorization": localStorage.getItem("token")
					}
				}
				try {
					const { data } = await axios(config)
					console.log(data)
					setDirs(data)
				} catch (e) {
					alert(e)
				}
			} else {
				const config = {
					method: "GET",
					url: `${_LINK}/v1/api/eco/dirs/alone/${id}`,
					headers: {
						"Authorization": localStorage.getItem("token")
					}
				}
				try {
					const { data } = await axios(config)
					console.log(data)
					setDirs(data.dirs)
				} catch (e) {
					alert(e)
				}
			}
		}
		get()
	}, [id])



	return (
		<div className="container">
			{
				dirs?.map((el, idx) => {
					if (el.dirs.length) {
						return (
                            // CHANGE LINK
							<NavLink exact to={`/labor_protection/folders/${el.id}/nest/1`} onClick={() => {
								dispatch(setDir(el.id))
							}} className="doc-folder" key={idx}>
								<img src={folderIcon} alt="folder-icon" />
								<p className="doc-folder__name">{el.name}</p>
							</NavLink>
						)
					} else {
						return (
                            // CHANGE LINK
							<NavLink exact to={`/labor_protection/list/${el.id}`} onClick={() => {
								dispatch(setDir(el.id))
							}} className="doc-folder" key={idx}>
								<img src={folderIcon} alt="folder-icon" />
								<p className="doc-folder__name">{el.name}</p>
							</NavLink>
						)
					}
				})
			}
		</div>
	);
}

export default DocLaborProtectionFolders;