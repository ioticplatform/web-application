import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import "./Devices.scss"
import { MDBContainer } from 'mdbreact';
import {Redirect} from "react-router";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';
import EditDevice from "../../components/EditDevice"
import DeleteDevice from "../../components/DeleteDevice"


function Device({device, onClick}) {
    return <StyledTableRow  key={device.id}>
        <StyledTableCell onClick={() => onClick(device)}>{device.name}</StyledTableCell>
        <StyledTableCell onClick={() => onClick(device)}>{device.description}</StyledTableCell>
        <StyledTableCell onClick={() => onClick(device)}>{device.timestamp}</StyledTableCell>
        <StyledTableCell>Connected</StyledTableCell>
        <StyledTableCell>
            <EditDevice device={device}></EditDevice>
        </StyledTableCell>
        <StyledTableCell>
            <DeleteDevice device={device}></DeleteDevice>
        </StyledTableCell>
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
        paddingTop: '50',
    },
    container: {
        paddingTop: '50',
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

    function onDeleteClick(device){
        setDevices(devices.filter(it => it._id != device._id))
    }

    useEffect(() => {
        async function fetch(){
            setLoading(true)
            let res = await api.getDevices();
            setLoading(false)
            setDevices(res.data.devices)
            globalData.setTitle("Devices");
        }
        fetch()
    }, [])


    if(deviceClicked){
        return <Redirect to="/device"/>
    }

    return (
        <MDBContainer>
        <p className="ml-15 ml-lg-0">
            <Title>' '</Title>
            <Title>Devices</Title>
            <Table size="large" className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Description</StyledTableCell>
                        <StyledTableCell>Created</StyledTableCell>
                        <StyledTableCell>State</StyledTableCell>
                        <StyledTableCell>Edit</StyledTableCell>
                        <StyledTableCell>Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? <CircularProgress/> : devices.map(it =>
                        <StyledTableRow  key={it.id}>
                        <StyledTableCell onClick={() => onDeviceClick(it)}>{it.name}</StyledTableCell>
                        <StyledTableCell onClick={() => onDeviceClick(it)}>{it.description}</StyledTableCell>
                        <StyledTableCell onClick={() => onDeviceClick(it)}>{it.timestamp}</StyledTableCell>
                        <StyledTableCell>Connected</StyledTableCell>
                        <StyledTableCell>
                        <EditDevice device={it}></EditDevice>
                        </StyledTableCell>
                        <StyledTableCell onClick={() => onDeleteClick(it)}>
                        <DeleteDevice device={it}></DeleteDevice>
                        </StyledTableCell>
                        </StyledTableRow>)}
                </TableBody>
            </Table>
        </p>
        </MDBContainer>
    );
}