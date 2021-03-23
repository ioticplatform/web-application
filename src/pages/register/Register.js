import React, {useState} from "react";
import "./Register.scss"
import {api} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";

import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        width: '100%',
        marginTop: theme.spacing(1),
    }
}));

export default function Register() {
    const classes = useStyles();

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

    return <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <div className="row">
                <p className="error">{error}</p>
            </div>
            <paper variant="outlined">
                <img src="anonymous-user.png" />
            </paper>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    value={username} onChange={(it) => setUsername(it.target.value)}
                    autoComplete="username"
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    value={email} onChange={(it) => setEmail(it.target.value)}
                    autoComplete="username"
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
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I have read and agree to the Privacy Policy."
                />
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive promotions and updates via email."
                />
                <Button
                    onClick={onRegisterClick}
                    fullWidth
                    variant="contained"
                    color="primary"
                >Create Account</Button>
            </form>
        </div>
    </Container>
}