import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from "../../components/ButtonBase";
import Title from '../../components/Title';
import {globalData} from "../../repo/api";
import Chatbot from "react-chatbot-kit";
import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";
import TotalData from "../../components/TotalData";
import Footer from "../firstPage/Footer";
import "./Dashboard.scss";

export default function Dashboard() {
    return (
        <React.Fragment>
            <Title>Welcome, {globalData.user.username}!</Title>
            <div style={{height: "14vh"}}/>
            <Container>
                <Grid container spacing={1}>
                        <Paper className="fixedDimPaper">
                            <ButtonBase />
                        </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper className="fixedHeightPaper">
                        <TotalData />
                    </Paper>
                </Grid>
            </Container>
            <Footer description="Thank you for choosing IoTIC!"/>
            <Container className="containerChatbot">
                    <Chatbot
                        config={config}
                        actionProvider={ActionProvider}
                        messageParser={MessageParser}
                    />
            </Container>
        </React.Fragment>
    );
}