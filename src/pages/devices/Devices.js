import React, {useEffect, useState} from "react";
import {withStyles, makeStyles, lighten} from '@material-ui/core/styles';
import {api, globalData} from "../../repo/api.js"
import "./Devices.scss"
import {Redirect} from "react-router";

import MaterialTable from "material-table";
import EditDevice from "../../components/EditDevice";
import moment from "moment";
import DeleteDevice from "../../components/DeleteDevice";

export default function Devices() {
    let [devices, setDevices] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [deviceClicked, setDeviceClicked] = useState(false);


    async function loadDevices() {
        setLoading(true)
        let res = await api.getDevices();
        setLoading(false)
        setDevices(res.data.devices)
    }

    useEffect(() => {
        loadDevices()
    }, [])

    if (deviceClicked) {
        return <Redirect to="/device"/>
    }

    function onDeviceClick(device) {
        globalData.device = device;
        setDeviceClicked(true)
    }

    return <div style={{maxWidth: '100%'}}>
        <MaterialTable
            columns={[
                {
                    title: 'Name',
                    field: 'name',
                    render: (device) => <p onClick={() => onDeviceClick(device)}>{device.name}</p>
                },
                {
                    title: 'Description',
                    field: 'description',
                    render: (device) => <p onClick={() => onDeviceClick(device)}>{device.name}</p>
                },
                {
                    title: 'Timestamp',
                    field: 'timestamp',
                    render: ({timestamp}) => moment(timestamp).format("MM/DD HH:mm")
                },
                {
                    title: 'Edit',
                    render: (rowData) => <EditDevice device={rowData} onFinishEdit={() => loadDevices()}/>},
                {
                    title: 'Delete',
                    render: (rowData) => <DeleteDevice device={rowData} onFinishDelete={() => loadDevices()}/>}
            ]}
            data={devices}
            options={{
                filtering: true
            }}
            isLoading={isLoading}
            title="Devices"
        />
    </div>
}