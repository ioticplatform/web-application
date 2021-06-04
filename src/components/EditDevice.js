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

export default function EditDevice({device, onFinishEdit}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

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
            if (!name)
                name = device.name;
            if (!description)
                description = device.description;
            await api.editDevice(device, name, description)
            handleClose();
            onFinishEdit();
        } catch (e){
            setError("Please check the information again.")
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
                <div style={{maxWidth: '50%', marginLeft: "25%", marginTop: "10%"}}>
                    <Grid container spacing={5}>
                        <Grid item xs={6}>
                            <h3>
                                Id:
                            </h3>
                            <TextField
                                fullWidth
                                label="You can not modify the device Id"
                                defaultValue={device._id}
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
                                label={device.name}
                                variant="filled"
                                fullWidth
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
                                label={device.description? device.description:"Write a short description" +
                                    " for your device..."}
                                multiline
                                rows={4}
                                fullWidth
                                variant="filled"
                                value={description} onChange={(it) => setDescription(it.target.value)}
                            />
                        </Grid>
                        <div className="row">
                            <p className="error">{error}</p>
                        </div>
                    </Grid>
                </div>
            </Dialog>
        </div>
    );
}