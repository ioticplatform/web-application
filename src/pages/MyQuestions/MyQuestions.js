import React, {useState, useEffect} from "react";
import "../FAQ/FAQ.scss"
import {api} from "../../repo/api.js"
import Question from "../../components/Question";

export default function MyQuestions() {
    let [questions, setquestions] = useState([]);
    let [isLoading, setLoading] = useState(false);

    async function loadFAQ() {
        setLoading(true)
        let res = await api.getFAQ();
        setLoading(false)
        setquestions(res.data.messages)
    }

    useEffect(() => {
        loadFAQ()
    }, [])

    return (
        <div style={{paddingTop: "3%"}}>
            <h3 style={{color: "gray"}}> My questions </h3>
            <div style={{paddingLeft: "30%"}}>
                {questions.map(it => (
                    <Question text={it.text} answer={it.answer}></Question>
                ))}
            </div>
        </div>
    );
}