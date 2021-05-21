import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {api} from "../repo/api";

export default function DeleteMessage({message, onFinishDelete}) {
    let [error, setError] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    async function onDeleteClick(){
        try{
            await api.deleteMessage(message);
            onFinishDelete();
        } catch (e){
            setError("Could not delete this message.");
        }
        handleClose();
    }

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={onDeleteClick}>
                <DeleteIcon />
            </IconButton>
        </div>
    );
}