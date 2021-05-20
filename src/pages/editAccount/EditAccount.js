import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {api} from "../../repo/api";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Edit Info'];

export default function EditAccount() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    let [email, setEmail] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [address, setAddress] = useState("")
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [city, setCity] = useState("")
    let [country, setCountry] = useState("")
    let [state, setState] = useState("")
    let [zip, setZip] = useState("")

    let [error, setError] = useState("")

    async function onUpdateClick(){
        try{
            await api.editAccount(password)
            handleNext()
        } catch (e){
            setError("Info Error.")
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Edit Account
                    </Typography>
                </Toolbar>
            </AppBar>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Done.
                                </Typography>
                                <Typography variant="subtitle1">
                                    Your personal info had been successfully updated.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Personal Info
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="firstName"
                                                name="firstName"
                                                label="First name"
                                                fullWidth
                                                autoComplete="given-name"
                                                value={firstName} onChange={(it) => setFirstName(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="lastName"
                                                name="lastName"
                                                label="Last name"
                                                fullWidth
                                                autoComplete="family-name"
                                                value={lastName} onChange={(it) => setLastName(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="username"
                                                name="username"
                                                label="Username"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                value={username} onChange={(it) => setUsername(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="email"
                                                name="email"
                                                label="Email"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                value={email} onChange={(it) => setEmail(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                type="password"
                                                id="password"
                                                name="password"
                                                label="Password"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                value={password} onChange={(it) => setPassword(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="address"
                                                name="address"
                                                label="Address"
                                                fullWidth
                                                autoComplete="shipping address-line2"
                                                value={address} onChange={(it) => setAddress(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="city"
                                                name="city"
                                                label="City"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                value={city} onChange={(it) => setCity(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="state"
                                                name="state"
                                                label="State/Province/Region"
                                                value={state} onChange={(it) => setState(it.target.value)}
                                                fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="zip"
                                                name="zip"
                                                label="Zip / Postal code"
                                                fullWidth
                                                autoComplete="shipping postal-code"
                                                value={zip} onChange={(it) => setZip(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="country"
                                                name="country"
                                                label="Country"
                                                fullWidth
                                                autoComplete="shipping country"
                                                value={country} onChange={(it) => setCountry(it.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                                <div className={classes.buttons}>
                                    {activeStep !== 0 && (
                                        <Button onClick={handleBack} className={classes.button}>
                                            Back
                                        </Button>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onUpdateClick}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Update' : 'Next'}
                                    </Button>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>
    );
}