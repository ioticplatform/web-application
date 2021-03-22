import React, {useEffect, useState} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import Paper from "@material-ui/core/Paper";
import "./Home.scss"
import {Redirect} from "react-router";

function Device({device, onClick}) {
    return <Paper className="paper" onClick={() => onClick(device)}>
        <div className="container">
            <div className="row">Name: {device.name}</div>
            <div className="row">Description: {device.description}</div>
        </div>
    </Paper>
}

export default function Home() {
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

    return <div className="container">
        <div className="row">
            <p>Welcome Home {globalData.user.username}</p>
        </div>
        {isLoading ? <CircularProgress/> : devices.map(it => <Device key={it.id} device={it} onClick={onDeviceClick} />)}
    </div>
}