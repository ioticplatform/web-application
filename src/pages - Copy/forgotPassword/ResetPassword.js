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

export default function ResetPassword() {
    const classes = useStyles();

    let [newPassword, setNewPassword] = useState("")
    let [resetPasswordCode, setResetPasswordCode] = useState("")
    let [error, setError] = useState("")
    let [searched, setSearched] = useState(false)

    async function onSearchClick(){
        try {
            await api.resetPassword(globalData.credential, newPassword, resetPasswordCode)
            setSearched(true)
        } catch (e){
            setError("This email/username is not associated with an IoTIC account.")
        }
    }

    if (searched){
        return <Redirect to={"/login"}/>
    }

    return <Container className={classes.paper} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <div className="row">
                <p className="error">{error}</p>
            </div>
            <Typography component="h1" variant="h3">
                Reset password
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    type="password"
                    margin="normal"
                    required
                    fullWidth
                    label="New password"
                    value={newPassword} onChange={(it) => setNewPassword(it.target.value)}
                    autoFocus
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Received code"
                    value={resetPasswordCode} onChange={(it) => setResetPasswordCode(it.target.value)}
                    autoFocus
                />
                <Button
                    onClick={onSearchClick}
                    fullWidth
                    variant="contained"
                    color="primary"
                >Reset</Button>
            </form>
        </div>
    </Container>
}