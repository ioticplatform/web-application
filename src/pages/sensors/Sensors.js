import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import "./Sensors.scss"
import { MDBContainer } from 'mdbreact';
import {Redirect} from "react-router";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';

function Sensor({sensor, onClick}) {
    return <StyledTableRow onClick={() => onClick(sensor)} key={sensor.id}>
        <StyledTableCell>{sensor.type}</StyledTableCell>
        {/*<StyledTableCell>{sensor.description}</StyledTableCell>*/}
        {/*<StyledTableCell>{sensor.timestamp}</StyledTableCell>*/}
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
        paddingTop: '50',
    },
});

export default function Sensors() {
    const classes = useStyles();

    let [sensors, setSensors] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [sensorClicked, setSensorClicked] = useState(false);

    function onSensorClick(sensor){
        globalData.sensor = sensor;
        setSensorClicked(true)
    }

    useEffect(() => {
        async function fetch(){
            setLoading(true)
            let res = await api.getSensors();
            setLoading(false)
            setSensors(res.data.sensors)
            globalData.setTitle("Sensors");
        }
        fetch()
    }, [])


    if(sensorClicked){
        return <Redirect to="/sensor"/>
    }

    return (
        <MDBContainer>
            <p className="ml-15 ml-lg-0">
                <Title>' '</Title>
                <Title>Sensors</Title>
                <Table size="large" className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Description</StyledTableCell>
                            <StyledTableCell>Created</StyledTableCell>
                            <StyledTableCell>State</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? <CircularProgress/> : sensors.map(it => <Sensor key={it.id} sensor={it} onClick={onSensorClick} />)}
                    </TableBody>
                </Table>
            </p>
        </MDBContainer>
    );
}