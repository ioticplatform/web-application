import React, {useState} from "react";
import "./Login.scss"
import {api, globalData} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState("")
    let [loggedIn, setLoggedIn] = useState(false)
    let [register, setRegister] = useState(false)
    let [forgotPassword, setForgotPassword] = useState(false)

    async function onLoginClick(){
        try{
            await api.login(username, password)
            setLoggedIn(true);
            globalData.setLoggedIn(true);
            globalData.setTitle("Dashboard");
        } catch (e){
            setError("Login Error")
        }
    }

    async function onRegisterClick(){
        setRegister(true)
    }

    async function onForgotPasswordClick(){
        setForgotPassword(true)
    }

    if(loggedIn){
        return <Redirect to={"/dashboard"}/>
    }

    if(register){
        return <Redirect to={"/register"}/>
    }

    if(forgotPassword){
        return <Redirect to={"/forgotPassword"}/>
    }

    return (
        <Container className="paper" component="main" maxWidth="xs">
            <div className="paper">
                <paper variant="outlined">
                    <img src="circle-cropped.png" />
                </paper>
                <Typography component="h1" variant="h4" style={{color: "white"}}>
                    Sign in
                </Typography>
                <form className="form" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Username"
                        value={username} onChange={(it) => setUsername(it.target.value)}
                        autoComplete="email"
                        autoFocus
                        style={{backgroundColor: "white"}}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password} onChange={(it) => setPassword(it.target.value)}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        style={{backgroundColor: "white"}}
                    />
                    <div className="row">
                        <p className="error">{error}</p>
                    </div>
                    <FormControlLabel
                        control={<Checkbox value="remember" style={{color: "white", textColor:"white"}} />}
                        label=<h5 style={{color: "white", fontWeight: "lighter"}}>Remember me</h5>
                    />
                    <Button
                        onClick={onLoginClick}
                        variant="contained"
                        className="button"
                        style={{  backgroundColor: '#ffe680' }}
                    >
                        <b>Login</b>
                    </Button>
                    <Grid container style={{bottom: "0"}}>
                        <Grid item xs>
                            <Link
                                component="buttonForgotPassword"
                                variant="body2"
                                style={{color: "lightBlue"}}
                                onClick={onForgotPasswordClick}>
                                {"Forgot password?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                style={{color: "lightBlue"}}
                                onClick={onRegisterClick}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}