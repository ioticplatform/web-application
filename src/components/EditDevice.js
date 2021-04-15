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

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDevice({device}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    let [id, setId] = useState("")
    let [name, setName] = useState("")
    let [description, setDescription] = useState("")

    let [error, setError] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function onUpdateClick(){
        try{
            await api.editDevice(device, name, description)
            handleClose();
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
                            EDIT DEVICE
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onUpdateClick}>
                            OK
                        </Button>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.paper}>
                    <React.Fragment>
                        <React.Fragment>
                            <React.Fragment>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>
                                        <h3>
                                            ID:
                                        </h3>
                                        <TextField
                                            disabled="disabled"
                                            autoComplete='on'
                                            label={device._id}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h3>
                                            Name:
                                        </h3>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label={device.name}
                                            fullWidth
                                            autoComplete=""
                                            value={name} onChange={(it) => setName(it.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <h3>
                                            Description:
                                        </h3>
                                        <TextField
                                            id="description"
                                            name="description"
                                            label={device.description}
                                            fullWidth
                                            autoComplete=""
                                            value={description} onChange={(it) => setDescription(it.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </React.Fragment>
                    </React.Fragment>
                </Paper>
            </Dialog>
        </div>
    );
}