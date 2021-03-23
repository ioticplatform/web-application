import React, {useEffect, useState} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import "./Sensors.scss"
import Paper from "@material-ui/core/Paper";
import {Redirect} from "react-router";

function Sensor({sensor, onClick}) {
    return <Paper className="paper" onClick={() => onClick(sensor)}>
        <div className="container">
            <div className="row">Type: {sensor.type}</div>
        </div>
    </Paper>
}

export default function Sensors() {
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
        }
        fetch()
    }, [])


    if(sensorClicked){
        return <Redirect to="/sensor"/>
    }

    return <div className="container">
        <div className="row">
            <p>Sensors {globalData.user.username}</p>
        </div>
        {isLoading ? <CircularProgress/> : sensors.map(it => <Sensor key={it.id} sensor={it} onClick={onSensorClick} />)}
    </div>
}