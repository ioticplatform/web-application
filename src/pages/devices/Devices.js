import React, {useEffect, useState} from "react";
import {withStyles, makeStyles, lighten} from '@material-ui/core/styles';
import {api, globalData} from "../../repo/api.js"
import "./Devices.scss"
import {Redirect} from "react-router";

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from "@material-ui/core/TableSortLabel";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
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
                {title: 'Name', render: (device) => <p onClick={() => onDeviceClick(device)}>{device.name}</p>},
                {title: 'Description', field: 'description'},
                {
                    title: 'Timestamp',
                    field: 'timestamp',
                    render: ({timestamp}) => moment(timestamp).format("MM/DD HH:mm")
                },
                {title: 'edit', render: (rowData) => <EditDevice device={rowData} onFinishEdit={() => loadDevices()}/>},
                {title: 'delete', render: (rowData) => <DeleteDevice device={rowData}/>}
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