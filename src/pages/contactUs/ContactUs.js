import React, {useState} from "react";
import "./ContactUs.scss"
import {api, globalData} from "../../repo/api.js"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Redirect} from "react-router";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

export default function ContactUs() {
    let [subject, setSubject] = useState("")
    let [phone, setPhone] = useState("")
    let [text, setText] = useState("")
    let [sent, setSent] = useState(false)
    let [error, setError] = useState("")

    const Mailto = ({ email, subject, body, children }) => {
        return (
            <a style={{color: "white", paddingBottom: "10px"}}href={`mailto:${email}?subject=${encodeURIComponent(subject) || ''}&body=${encodeURIComponent(body) || ''}`}>{children}</a>
        );
    };

    async function onSendClick(){
        try{
            await api.sendMessage(globalData.user.username, subject, phone, text)
            setSent(true);
        } catch (e){
            setError("Please complete all the required fields!")
        }
    }

    if (sent){
        return <Redirect to={"/dashboard"}/>
    }

    return (
        <Container className="paper" component="main" maxWidth="xs">
            <div className="paper">
                <Typography component="h1" variant="h4" style={{color: "white"}}>
                    Contact us
                </Typography>
                <form className="form" noValidate>
                    <PhoneInput
                        inputStyle={{height: '6vh', width:'100%'}}
                        country={'ro'}
                        fullWidth
                        value={phone}
                        onChange={it => setPhone(it)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Subject"
                        value={subject} onChange={(it) => setSubject(it.target.value)}
                        autoFocus
                        style={{backgroundColor: "white"}}
                    />
                    <TextField
                        label="Your message for us..."
                        multiline
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        rows={12}
                        value={text} onChange={(it) => setText(it.target.value)}
                        style={{backgroundColor: "white"}}
                    />
                    <div className="row">
                        <p className="error">{error}</p>
                    </div>
                    <Button
                        onClick={onSendClick}
                        variant="contained"
                        className="button"
                        style={{  backgroundColor: '#ffe680' }}
                    >
                        <b>Send</b>
                    </Button>
                </form>
                <Mailto email="iotic.team@outlook.com"
                        subject="Question"
                        body="Please write your message here. We are thrilled to support! :)">
                    <EmailIcon style={{color: "white", paddingTop: "20px"}}/> Send us an email
                </Mailto>
                <div style={{color: "white"}}>
                    <PhoneIcon style={{paddingTop: "20px"}}/> +40 727975236
                </div>
            </div>
        </Container>
    );
}