import React, {useState} from "react";
import "./Login.scss"
import {api, globalData} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from "../../components/Copyright";
import Footer from "../firstPage/Footer";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    }
}));

export default function Login() {
    const classes = useStyles();

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
        <React.Fragment>
            <CssBaseline />
            <Container className={classes.paper} component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <paper variant="outlined">
                        <img src="circle-cropped.png" />
                    </paper>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Username"
                            value={username} onChange={(it) => setUsername(it.target.value)}
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password} onChange={(it) => setPassword(it.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="current-password"
                        />
                        <div className="row">
                            <p className="error">{error}</p>
                        </div>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            onClick={onLoginClick}
                            fullWidth
                            variant="contained"
                            color="primary"
                        >Login</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link
                                    component="buttonForgotPassword"
                                    variant="body2"
                                    onClick={onForgotPasswordClick}>
                                    {"Forgot password?"}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={onRegisterClick}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Footer description="Thank you for choosing IoTIC!"/>
        </React.Fragment>
    );
}