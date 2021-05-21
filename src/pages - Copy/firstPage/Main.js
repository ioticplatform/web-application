import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";


const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        background: "#f0f0f5"
    },
    fixedHeight: {
        height: 240,
    }}
));

export default function Main() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
            <Grid item xs={12} md={4}>
                <Paper className={fixedHeightPaper}>
                    <Title>Total users</Title>
                    <Typography component="p" variant="h4">
                        3,024.00
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                        on {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toString()}
                    </Typography>
                </Paper>
            </Grid>
    );
}