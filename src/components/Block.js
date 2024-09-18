import React from "react";
import '../styles/Block.css'
function Block({title, text, type}) {
    return (
        <div className="block-card" type={type}>
            <h3>{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Block