import React, {useEffect, useState} from "react";
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
    const [selectedRow, setSelectedRow] = useState(null);


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

    return <div style={{maxWidth: '100%', marginTop: "60px"}}>
        <MaterialTable
            columns={[
                {
                    title: 'Name',
                    field: 'name',
                    render: (device) => <p onClick={() => onDeviceClick(device)}>{device.name}</p>,
                    cellStyle: {
                        backgroundColor: '#E8E8F0'
                    }
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
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
                headerStyle: {
                    backgroundColor: '#000000',
                    color: '#FFF'
                },
                rowStyle: rowData => ({
                    backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
                })
            }}
        />
    </div>
}