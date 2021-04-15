import React, {useState} from "react";
import {api, globalData} from "../../repo/api.js"
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

export default function ForgotPassword() {
    const classes = useStyles();

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

    return <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Typography component="h1" variant="h3">
                Find your IoTIC account
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email/Username"
                    value={credential} onChange={(it) => setCredential(it.target.value)}
                    autoFocus
                />
                <div className="row">
                    <p className="error">{error}</p>
                </div>
                <Button
                    onClick={onSearchClick}
                    fullWidth
                    variant="contained"
                    color="primary"
                >Search</Button>
            </form>
        </div>
    </Container>
}