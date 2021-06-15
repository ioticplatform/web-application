import React, {useState} from "react";
import {api, globalData} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";
import '../login/Login.scss'
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

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
            // globalData.setLoggedIn(true);
            setError("We sent you an email. Please confirm your account and then login.")
        } catch (e){
            setError("Register Error")
        }
    }

    // if (registered){
    //     return <Redirect to={"/dashboard"}/>
    // }

    return <Container className="paper" component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
            <div className="row">
                <p className="error" style={{color: "green"}}>{error}</p>
            </div>
            <paper variant="outlined">
                <img src="anonymous-user.png" style={{height: "30vh", width: "30vh"}}/>
            </paper>
            <Typography component="h1" variant="h4" style={{color: "white"}}>
                Register
            </Typography>
            <form className="form" noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    value={username} onChange={(it) => setUsername(it.target.value)}
                    autoComplete="username"
                    autoFocus
                    style={{backgroundColor: "white"}}
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
                    autoComplete="current-password"
                    style={{backgroundColor: "white"}}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" style={{color: "white", textColor:"white"}} />}
                    label=<h5 style={{color: "white", fontWeight: "lighter"}}>Remember me</h5>
                />
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" style={{color: "white", textColor:"white"}} />}
                    label=<h5 style={{color: "white", fontWeight: "lighter"}}>I have read and agree to the Privacy Policy.</h5>
                />
                <Button
                    onClick={onRegisterClick}
                    variant="contained"
                    className="button"
                    style={{  backgroundColor: '#ffe680' }}
                >Create Account</Button>
            </form>
        </div>
    </Container>
}