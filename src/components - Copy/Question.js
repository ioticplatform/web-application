import React from "react";
import "./Question.scss"

export default function Question(props) {
    return <div className="question">
        <div><h2 style={{textDecoration: "underline"}}>{props.text}</h2></div>
        <div style={{top: "0"}}><h3 style={{fontWeight: "light"}}>{props.answer}</h3></div>
    </div>
}

