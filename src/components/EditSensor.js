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
import Paper from "@material-ui/core/Paper";
import {api} from "../repo/api";
import MenuItem from '@material-ui/core/MenuItem';

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
    let [measureUnit, setMeasureUnit] = useState("")

    let [error, setError] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function onUpdateClick(){
        try{
            await api.editSensor(sensor, measureUnit)
            handleClose();
            onFinishEdit();
        } catch (e){
            setError("Info Error.")
        }
    }

    console.log(sensor)

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
                    </Grid>
                </div>
            </Dialog>
        </div>
    );
}