import React, {useState} from "react";
import "./Login.scss"
import {api} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                IoTIC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    }
}));

export default function Login() {
    const classes = useStyles();

    let [login, setLogin] = useState("")
    let [password, setPassword] = useState("")
    let [error, setError] = useState("")
    let [loggedIn, setLoggedIn] = useState(false)
    let [register, setRegister] = useState(false)

    async function onLoginClick(){
        try{
            await api.login(login,password)
            setLoggedIn(true)
        } catch (e){
            setError("Login Error")
        }
    }

    async function onRegisterClick(){
        setRegister(true)
    }

    if(loggedIn){
        return <Redirect to={"/home"}/>
    }

    if(register){
        return <Redirect to={"/register"}/>
    }
    document.body.style.background = "url('background-white.jpg') repeat center";

    return  <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <div className="row">
                <p className="error">{error}</p>
            </div>
            <paper variant="outlined">
                <img src="circle-cropped.png" />
            </paper>
            {/*<Avatar src="/broken-image.jpg" />*/}
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
                    value={login} onChange={(it) => setLogin(it.target.value)}
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
                        <Link href="#" variant="body2">
                            Forgot password?
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
        <Box mt={8}>
            <Copyright />
        </Box>
    </Container>
}