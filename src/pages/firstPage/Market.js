import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../components/Title';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import clsx from "clsx";
import MobileStoreButton from 'react-mobile-store-button';

const useStyles = makeStyles((theme) => ({
    depositContext: {
        flex: 1,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    }}
));

export default function Market(props) {
    const { store, url } = props;

    return (
                <div>
                    <MobileStoreButton
                        store={store}
                        url={url}
                        height={"90px"}
                        width={"200px"}
                    />
                </div>
    );
}