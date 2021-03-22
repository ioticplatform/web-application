import React, {useState} from "react";
import "./Login.scss"
import {api} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";

export default function Login() {
    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState("")
    let [loggedIn, setLoggedIn] = useState(false)

    async function onLoginClick(){
        try{
            await api.login(login,password)
            setLoggedIn(true)
        } catch (e){
            setError("Login Error")
        }
    }

    if(loggedIn){
        return <Redirect to={"/home"}/>
    }

    return <div className="container">
        <div className="row">
            <p className="error">{error}</p>
        </div>
        <div className="row">
            <TextField label="Login" value={login} onChange={(it) => setLogin(it.target.value)}/>
        </div>
        <div className="row">
            <TextField label="Password" type="password" value={password} onChange={(it) => setPassword(it.target.value)}/>
        </div>
        <div className="row">
            <Button onClick={onLoginClick}>Login</Button>
        </div>
    </div>
}