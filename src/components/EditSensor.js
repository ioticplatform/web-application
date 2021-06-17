import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {api} from "../repo/api";
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: "#355e35"
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditSensor({sensor, onFinishEdit}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    let [name, setName] = useState("")
    let [min_val, setMinVal] = useState(sensor.min_val)
    let [max_val, setMaxVal] = useState(sensor.max_val)
    let [measureUnit, setMeasureUnit] = useState(sensor.measure_unit)
    let [emailNotifications, setEmailNotifications] = useState(sensor.emailNotifications?sensor.emailNotifications:true)
    let [webNotifications, setWebNotifications] = useState(sensor.webNotifications?sensor.webNotifications:true)
    let [error, setError] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function onUpdateClick(){
        try{
            if (!name)
                name = sensor.name;
            await api.editSensor(sensor, measureUnit, name, min_val, max_val, emailNotifications, webNotifications)
            handleClose();
            onFinishEdit();
        } catch (e){
            setError("Info Error.")
        }
    }

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            EDIT SENSOR
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onUpdateClick}>
                            OK
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{maxWidth: '50%', marginLeft: "25%", marginTop: "10%"}}>
                <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h3>
                                Id:
                            </h3>
                            <TextField
                                fullWidth
                                label="You can not modify the sensor Id"
                                defaultValue={sensor._id}
                                disabled={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <h3>
                                Type:
                            </h3>
                            <TextField
                                fullWidth
                                label="You can not modify the sensor type"
                                defaultValue={sensor.type}
                                disabled={true}
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <h3>
                                Name:
                            </h3>
                            <TextField
                                id="name"
                                name="name"
                                label={sensor.name}
                                variant="filled"
                                fullWidth
                                value={name} onChange={(it) => setName(it.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <h3>
                                Measurement Unit:
                            </h3>
                            <TextField
                                id="outlined-select-currency"
                                select
                                fullWidth
                                label="Select measurement unit"
                                value={measureUnit}
                                onChange={(it) => setMeasureUnit(it.target.value)}
                                helperText="Please select one of the above."
                                variant="outlined">
                                {
                                    [
                                    {
                                        value: 'Celsius',
                                        label: 'Celsius',
                                    },
                                    {
                                        value: 'Fahrenheit',
                                        label: 'Fahrenheit',
                                    }
                                ].map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    <Grid item xs={4}>
                        <h3>
                            Min Value:
                        </h3>
                        <TextField
                            id="min_val"
                            name="min_val"
                            variant="filled"
                            fullWidth
                            value={min_val} onChange={(it) => setMinVal(it.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <h3>
                            Max Value:
                        </h3>
                        <TextField
                            id="max_val"
                            name="max_val"
                            variant="filled"
                            fullWidth
                            value={max_val} onChange={(it) => setMaxVal(it.target.value)}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <FormControlLabel control={<Checkbox checked={emailNotifications} onClick={(it) => setEmailNotifications(it.target.checked)}/> }
                                          label=<h5 style={{color: "black", fontWeight: "lighter"}}>Receive email notifications</h5>
                        />
                        <FormControlLabel control={<Checkbox checked={webNotifications} onChange={(it) => setWebNotifications(it.target.checked)}/> }
                                          label=<h5 style={{color: "black", fontWeight: "lighter"}}>Receive web notifications</h5>
                        />
                    </Grid>
                </Grid>
                </div>
            </Dialog>
        </div>
    );
}