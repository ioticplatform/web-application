import React, {useEffect, useState} from "react";
import {api, globalData} from "../../repo/api.js"
import "./Devices.scss"
import {Redirect} from "react-router";
import MaterialTable from "material-table";
import EditDevice from "../../components/EditDevice";
import moment from "moment";
import DeleteDevice from "../../components/DeleteDevice";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export default function Devices() {
    let [devices, setDevices] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [deviceClicked, setDeviceClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [t] = useTranslation('common');

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
        <h4 style={{color: "white"}}>In order to add a new device, please follow this
            <Link to="/instructions-new-device" style={{margin: "20px", color: "red"}}>instructions</Link>.
        </h4>
        <MaterialTable
            columns={[
                {
                    title: '#',
                    render: (it) => <p>{it.tableData.id + 1}</p>,
                    headerStyle: {width: "20px"}
                },
                {
                    title: t('devices.name', {framework:'React'}),
                    field: 'name',
                    render: (device) => <p onClick={() => onDeviceClick(device)}>{device.name}</p>,
                    cellStyle: {
                        backgroundColor: '#f2f2f7'
                    }
                },
                {
                    title: t('devices.description', {framework:'React'}),
                    field: 'description',
                    render: (device) => <p onClick={() => onDeviceClick(device)}>{device.description}</p>
                },
                {
                    title: t('devices.created', {framework:'React'}),
                    field: 'timestamp',
                    render: ({timestamp}) => moment(timestamp).format("DD/MM/YY HH:mm")
                },
                {
                    title: t('devices.edit', {framework:'React'}),
                    render: (rowData) => <EditDevice device={rowData} onFinishEdit={() => loadDevices()}/>},
                {
                    title: t('devices.delete', {framework:'React'}),
                    render: (rowData) => <DeleteDevice device={rowData} onFinishDelete={() => loadDevices()}/>}
            ]}
            data={devices}
            isLoading={isLoading}
            title={t('devices.title', {framework:'React'})}
            onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
            options={{
                filtering: true,
                headerStyle: {
                    backgroundColor: '#E8E8F0',
                    fontSize: 20
                },
                rowStyle: x => {
                    if (x.tableData.id % 2) {
                        return {backgroundColor: "#f7f7fa"}
                    }
                },
                filterCellStyle: {
                    backgroundColor: '#E8E8F0'
                }
            }}
        />
    </div>
}