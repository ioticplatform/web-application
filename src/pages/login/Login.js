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
import {useTranslation} from "react-i18next";
import clientId from '../../utils'
import GoogleLogin from 'react-google-login';
import { InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

export default function Login() {
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState("")
    let [loggedIn, setLoggedIn] = useState(false)
    let [register, setRegister] = useState(false)
    let [forgotPassword, setForgotPassword] = useState(false)
    const [t] = useTranslation('common');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    async function onSuccess (res) {
        console.log('login ', res);
        try{
            await api.loginWithGoogle(res.accessToken)
            setLoggedIn(true);
            globalData.setLoggedIn(true);
            globalData.setTitle("Dashboard");
        } catch (e){
            setError("")
        }
    };

    const onFailure = (res) => {
        console.log('login failed', res);
    };

    async function onLoginClick(){
        try{
            await api.login(username, password)
            setLoggedIn(true);
            globalData.setLoggedIn(true);
            globalData.setTitle("Dashboard");
        } catch (e){
            setError("Wrong Credentials.\n" +
                "Invalid username or password")
        }
    }

    async function onRegisterClick(){
        setRegister(true)
    }

    async function onForgotPasswordClick(){
        setForgotPassword(true)
    }

    if(loggedIn){
        if (globalData.user.role === "admin")
            return <Redirect to={"/admin"}/>
        else if (globalData.user.role === "support")
            return <Redirect to={"/support"}/>
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
                    {t('loginPage.title', {framework:'React'})}
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
                    {/*<TextField*/}
                    {/*    label="Password"*/}
                    {/*    type="password"*/}
                    {/*    value={password} onChange={(it) => setPassword(it.target.value)}*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    required*/}
                    {/*    fullWidth*/}
                    {/*    style={{backgroundColor: "white"}}*/}
                    {/*/>*/}
                    <TextField
                        label='Password'
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        style={{backgroundColor: "white"}}
                        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                        onChange={(it) => setPassword(it.target.value)}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <p className="error">{error}</p>
                    <FormControlLabel style={{height: '5px', paddingBottom: '20px'}}
                        control={<Checkbox value="remember" style={{color: "white", textColor:"white"}} />}
                        label=<h5 style={{color: "white", fontWeight: "lighter"}}>{t('loginPage.remember', {framework:'React'})}</h5>
                    />
                    <Button
                        onClick={onLoginClick}
                        variant="contained"
                        className="button"
                        style={{  backgroundColor: '#ffe680', marginBottom: '20px'}}
                    >
                        <b>{t('loginPage.loginButton', {framework:'React'})}</b>
                    </Button>

                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        // isSignedIn={true}
                        style={{  width: '100px' }}
                    />

                    <Grid container style={{bottom: "0"}}>
                        <Grid item xs>
                            <Link
                                component="buttonForgotPassword"
                                variant="body2"
                                style={{color: "lightBlue"}}
                                onClick={onForgotPasswordClick}>
                                {t('loginPage.forgot', {framework:'React'})}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                component="button"
                                variant="body2"
                                style={{color: "lightBlue"}}
                                onClick={onRegisterClick}>
                                {t('loginPage.signUp', {framework:'React'})}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}