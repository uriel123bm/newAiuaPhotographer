// import React from "react";
// import '../styles/Block.css'
// function Block({title, text, type}) {
//     return (
//         <div className="block-card" type={type}>
//             <h3>{title}</h3>
//             <p>{text}</p>
//         </div>
//     )
// }
//
// export default Block
import React from "react";
import '../styles/Block.css';

function Block({ title, text, type }) {
    return (
        <div className="block-card" type={type}>
            <div className="block-card-inner">
                <div className="block-card-front">
                    {/* הצד הקדמי עם התמונה כרקע */}
                    <h3>{title}</h3>
                </div>
                <div className="block-card-back">
                    {/* הצד האחורי עם הטקסט */}
                    <h3>{title}</h3>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

export default Block;
