import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {api, globalData} from "../../repo/api";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "black",
        color: "white",
        alignItems: "center"
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

    let [email, setEmail] = useState(globalData.user.email)
    let [username, setUsername] = useState(globalData.user.username)
    let [password, setPassword] = useState(globalData.user.password)
    let [address, setAddress] = useState(globalData.user.address)
    let [firstName, setFirstName] = useState(globalData.user.firstName)
    let [lastName, setLastName] = useState(globalData.user.lastName)
    let [city, setCity] = useState(globalData.user.city)
    let [country, setCountry] = useState(globalData.user.country)
    let [state, setState] = useState(globalData.user.state)
    let [zip, setZip] = useState(globalData.user.zipCode)

    let [error, setError] = useState("")

    async function onUpdateClick(){
        try{
            await api.editAccount(address, firstName, lastName, city, country, state, zip)
            handleNext()
        } catch (e){
            setError("Info Error.")
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className={classes.appBar}>

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
                                        Edit Personal Info
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="firstName"
                                                name="firstName"
                                                variant="filled"
                                                label="First name"
                                                fullWidth
                                                value={firstName} onChange={(it) => setFirstName(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="lastName"
                                                name="lastName"
                                                variant="filled"
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
                                                variant="outlined"
                                                disabled={true}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                value={username} onChange={(it) => setUsername(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="email"
                                                variant="outlined"
                                                disabled={true}
                                                InputProps={{
                                                    readOnly: true,
                                                }}
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
                                                disabled={true}
                                                variant="outlined"
                                                InputProps={{
                                                    readOnly: true,
                                                }}
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
                                                variant="filled"
                                                label="Address"
                                                fullWidth
                                                autoComplete="shipping address-line2"
                                                value={address} onChange={(it) => setAddress(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="city"
                                                name="city"
                                                variant="filled"
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
                                                variant="filled"
                                                label="State/Province/Region"
                                                value={state} onChange={(it) => setState(it.target.value)}
                                                fullWidth/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="zip"
                                                name="zip"
                                                variant="filled"
                                                label="Zip / Postal code"
                                                fullWidth
                                                autoComplete="shipping postal-code"
                                                value={zip} onChange={(it) => setZip(it.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="country"
                                                name="country"
                                                variant="filled"
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
            </main>
        </React.Fragment>
    );
}