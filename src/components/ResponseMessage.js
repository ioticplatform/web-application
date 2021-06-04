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
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
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

export default function ResponseMessage({message, onFinishEdit}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    let [answer, setAnswer] = useState("")
    let [error, setError] = useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function onUpdateClick(){
        try{
            if (!answer)
                answer = "We are sorry for your inconvenience.";
            await api.editMessage(message, answer)
            handleClose();
            onFinishEdit();
        } catch (e){
            setError("Info Error.")
        }
    }

    return (
        <div>
            <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClickOpen}>
                <QuestionAnswerIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Answer message
                        </Typography>
                        <Button autoFocus color="inherit" onClick={onUpdateClick}>
                            Send
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={{maxWidth: '50%', marginLeft: "25%", marginTop: "10%"}}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <h3>
                                {message.text}
                            </h3>
                            <TextField
                                id="description"
                                name="description"
                                label={"Your answer..."}
                                multiline
                                rows={4}
                                fullWidth
                                variant="filled"
                                value={answer} onChange={(it) => setAnswer(it.target.value)}
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