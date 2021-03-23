import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import "./Devices.scss"
import Paper from "@material-ui/core/Paper";
import {Redirect} from "react-router";

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';

function Device({device, onClick}) {
    return <StyledTableRow onClick={() => onClick(device)} key={device.id}>
        <StyledTableCell>{device.name}</StyledTableCell>
        <StyledTableCell>{device.description}</StyledTableCell>
        <StyledTableCell>{device.timestamp}</StyledTableCell>
        <StyledTableCell>Connected</StyledTableCell>
    </StyledTableRow>
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Devices() {
    const classes = useStyles();

    let [devices, setDevices] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [deviceClicked, setDeviceClicked] = useState(false);

    function onDeviceClick(device){
        globalData.device = device;
        setDeviceClicked(true)
    }

    useEffect(() => {
        async function fetch(){
            setLoading(true)
            let res = await api.getDevices();
            setLoading(false)
            setDevices(res.data.devices)
        }
        fetch()
    }, [])


    if(deviceClicked){
        return <Redirect to="/device"/>
    }

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
        <React.Fragment>
            <Title>Devices</Title>
            <Table size="large" stickyHeader="true">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Created</StyledTableCell>
                        <StyledTableCell>State</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <CircularProgress/> : devices.map(it => <Device key={it.id} device={it} onClick={onDeviceClick} />)}
                </TableBody>
            </Table>
        </React.Fragment>
            </Paper>
        </Grid>
    );
}