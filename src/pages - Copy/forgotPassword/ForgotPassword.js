import React, {useState} from "react";
import {api, globalData} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import '../login/Login.scss'

export default function ForgotPassword() {
    let [credential, setCredential] = useState("")
    let [error, setError] = useState("")
    let [searched, setSearched] = useState(false)

    async function onSearchClick(){
        try {
            await api.forgotPassword(credential)
            setSearched(true)
            globalData.credential = credential;
        } catch (e){
            setError("This email/username is not associated with an IoTIC account.")
        }
    }

    if (searched){
        return <Redirect to={"/resetPassword"}/>
    }

    return <Container className="paper" component="main" maxWidth="xs">
        <div className="paper" style={{paddingTop: "50%"}}>
            <Typography component="h1" variant="h4" style={{color: "white"}}>
                Find your IoTIC account
            </Typography>
            <form className="form" noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email/Username"
                    value={credential} onChange={(it) => setCredential(it.target.value)}
                    autoFocus
                    style={{backgroundColor: "white"}}
                />
                <div className="row">
                    <p className="error">{error}</p>
                </div>
                <Button
                    onClick={onSearchClick}
                    variant="contained"
                    className="button"
                    style={{  backgroundColor: '#ffe680' }}
                >Search</Button>
            </form>
        </div>
    </Container>
}