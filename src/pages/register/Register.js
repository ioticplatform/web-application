import React, {useState} from "react";
import "./Register.scss"
import {api} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";

export default function Register() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [email, setEmail] = useState("")

    let [error, setError] = useState("")
    let [registered, setRegistered] = useState(false)

    async function onRegisterClick(){
        try {
            await api.register(username, password, email)
            setRegistered(true)
        } catch (e){
            setError("Register Error")
        }
    }

    if (registered){
        return <Redirect to={"/home"}/>
    }

    return <div className="container">
        <div className="row">
            <p className="error">{error}</p>
        </div>
        <div className="row">
            <TextField label="Username" value={username} onChange={(it) => setUsername(it.target.value)}/>
        </div>
        <div className="row">
            <TextField label="Email" value={email} onChange={(it) => setEmail(it.target.value)}/>
        </div>
        <div className="row">
            <TextField label="Password" type="password" value={password} onChange={(it) => setPassword(it.target.value)}/>
        </div>
        <div className="row">
            <Button onClick={onRegisterClick}>Create Account</Button>
        </div>
    </div>
}