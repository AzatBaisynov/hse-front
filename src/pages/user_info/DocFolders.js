import React, { useEffect, useState } from 'react';
import '../../assets/style/doc_folders_style.css';
import folderIcon from'../../assets/images/folder-icon.svg';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { _LINK } from '../../data/links';
import { setDir } from '../../redux/actions/files';

function DocFolders() {

    const [dirs, setDirs] = useState([])
    const dispatch = useDispatch()
    
    const { id } = useParams()

    useEffect(() => {
        const get = async () => {
            const config = {
                method: "GET",
                url: `${_LINK}/v1/api/org/dir/${id}/1`,
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
        }
        get()
    }, [id])

    

    return ( 
        <div className="container">
            {
                dirs?.map((el, idx) => (
                    <NavLink exact to={`/info/list/${el.id}`} onClick={() => {
                        dispatch(setDir(el.id))
                    }} className="doc-folder" key={idx}>
                        <img src={folderIcon} alt="folder-icon" />
                        <p className="doc-folder__name">{el.name}</p>
                    </NavLink>
                ))
            }
        </div>
     );
}

export default DocFolders;