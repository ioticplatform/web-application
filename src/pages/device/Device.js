import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import Paper from "@material-ui/core/Paper";
import {Redirect} from "react-router";

import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';

function Sensor({sensor, onClick}) {
    return <StyledTableRow onClick={() => onClick(sensor)} key={sensor._id}>
        <StyledTableCell>{sensor.type}</StyledTableCell>
        <StyledTableCell>{sensor.measure_unit}</StyledTableCell>
        <StyledTableCell>{sensor.timestamp}</StyledTableCell>
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

export default function Device() {
    const classes = useStyles();

    let [sensors, setDeviceSensors] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [sensorClicked, setSensorClicked] = useState(false);

    function onSensorClick(sensor){
        globalData.sensor = sensor;
        setSensorClicked(true)
    }

    useEffect(() => {
        async function fetch(){
            setLoading(true)
            let res = await api.getDeviceSensors();
            setLoading(false)
            setDeviceSensors(res.data.sensors)
        }
        fetch()
    }, [])


    if(sensorClicked){
        return <Redirect to="/sensor"/>
    }

    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <React.Fragment>
                    <Title>{globalData.device.name}</Title>
                    <Table size="large" stickyHeader="true">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Unit</StyledTableCell>
                                <StyledTableCell>Created</StyledTableCell>
                                <StyledTableCell>State</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? <CircularProgress/> : sensors.map(it => <Sensor key={it._id} sensor={it} onClick={onSensorClick} />)}
                        </TableBody>
                    </Table>
                </React.Fragment>
            </Paper>
        </Grid>
    );
}