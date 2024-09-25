import React from "react";
import '../styles/Block.css'
import {useNavigate} from "react-router-dom";
function Block({title, text, type}) {

    const navigate = useNavigate()


    const handleClicked =()=>{
        navigate("/packages")
    }
    return (
        <div className="block-card" type={type} onClick={handleClicked}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Block