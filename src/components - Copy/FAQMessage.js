import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {api} from "../repo/api";

export default function FAQMessage({message, onFinishFAQ}) {
    let [error, setError] = useState("")
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    async function onFAQClick(){
        try{
            await api.addFAQMessage(message);
            onFinishFAQ();
        } catch (e){
            setError("Could not delete this message.");
        }
        handleClose();
    }

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={onFAQClick}>
                {message.faq ? <FavoriteIcon /> : <FavoriteBorderIcon/>}
            </IconButton>
        </div>
    );
}