import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import MainFeaturedPost from '../MainFeaturedPost';
import Footer from '../Footer';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}));

const sections = [
    { title: 'Smart Home', url: '#' },
    { title: 'Smart Farming', url: '#' },
    { title: 'Low Costs', url: '#' },
    { title: 'OpenSource', url: '#' },
];

const mainFeaturedPost = {
    title: 'How it started...',
    image: 'how_it_started.jpg',
    description:
        "It started when we were thinking about choosing our diploma project...",

};

export default function HowItStarted() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Welcome to IoTIC!" sections={sections} />
                <main>
                    <MainFeaturedPost post={mainFeaturedPost}/>
                    <Grid container spacing={2} className={classes.mainGrid}>
                        <Grid item xs={12} >
                            <Paper>
                                <Typography color="textSecondary" className={classes.depositContext}>
                                    Apr 17, 2021
                                </Typography>
                                <Typography component="p" variant="h6">
                                    Arduino Smart Control allows you to communicate with your Arduino Nano through the Serial. It is possible to switch from one to 4 LEDs (monostable and bistable mode). The bistable mode has a time set to 1 second by default. In addition to switching the LEDs, you can monitor various sensors such as temperature, humidity, water sensor and brightness sensor. You can save, read and delete the memory with the data acquired or sent to the device.

                                    The software is based on the Xojo platform and is available only for Windows OS.

                                    You can download and install the beta version on this link:
                                </Typography>
                                <Paper variant="outlined">
                                    <img src="how_it_started.jpg"/>
                                </Paper>
                                <Typography align={"right"} color="textSecondary" className={classes.depositContext}>
                                    Author: Teia Vava
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </main>
            </Container>
            <Footer description="Thank you for choosing IoTIC!" />
        </React.Fragment>
    );
}