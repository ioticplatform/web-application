import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditDevice from "../../components/EditDevice"
import Copyright from "../../components/Copyright";
import ButtonBase from "../../components/ButtonBase";
import Title from '../../components/Title';
import {globalData} from "../../repo/api";
import Chart from "../../components/Chart"

import Chatbot from "react-chatbot-kit";

import config from "../../chatbot/config";
import MessageParser from "../../chatbot/MessageParser";
import ActionProvider from "../../chatbot/ActionProvider";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 0, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    fixedWidth: {
        width: 1300,
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedDimPaper = clsx(classes.paper, classes.fixedHeight, classes.fixedWidth);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
            <div>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="row">
                        <Title>Welcome, {globalData.user.username}!</Title>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedDimPaper}>
                                <ButtonBase />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Box pt={4}>
                            <Copyright />
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Chatbot
                            config={config}
                            actionProvider={ActionProvider}
                            messageParser={MessageParser}
                        />
                    </Grid>
                </Grid>
            </div>
    );
}