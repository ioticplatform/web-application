import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {api} from "../repo/api";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DeleteDevice({device, onFinishDelete}) {
    let [error, setError] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function onDeleteClick(){
        try{
            await api.deleteDevice(device);
            onFinishDelete();
        } catch (e){
            setError("Could not delete this device.");
        }
        handleClose();
    }

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClickOpen}>
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this device?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please remember that this action cannot be undone.
                        All your data will be erased and you will not be able to retrieve them.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        BACK
                    </Button>
                    <Button onClick={onDeleteClick} color="secondary" autoFocus>
                        DELETE
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}