import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {useTranslation} from "react-i18next";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function TotalData() {
    const classes = useStyles();
    const [t] = useTranslation('common');

    return (
        <React.Fragment>
            <Title><h4 style={{"color": "black"}}>
                {t('dashboard.receivedData', {framework:'React'})}
            </h4></Title>
            <Typography component="p" variant="h4">
                3,024.00
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                on {new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toString()}
            </Typography>
        </React.Fragment>
    );
}