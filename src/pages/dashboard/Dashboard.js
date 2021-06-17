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
import {useTranslation} from "react-i18next";

export default function Dashboard() {
    const [t] = useTranslation('common');

    return (
        <div>
            <div style={{height: "3vh"}}/>
            <Title>{t('dashboard.welcome', {framework:'React'})}, {globalData.user.username}!</Title>
            <div style={{height: "4vh"}}/>
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
                <div style={{height: "12vh"}}/>
            </Container>
            <Footer style ={{paddingBottom: "50px"}} description={t('welcome.thankYou', {framework:'React'})}/>
            <Container className="containerChatbot">
                    <Chatbot
                        config={config}
                        actionProvider={ActionProvider}
                        messageParser={MessageParser}
                    />
            </Container>
        </div>
    );
}