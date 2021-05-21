import React, {useEffect, useState} from "react";
import {api, globalData} from "../../repo/api.js"
import {Redirect} from "react-router";
import MaterialTable from "material-table";
import moment from "moment";
import EditDevice from "../../components/EditSensor";
import DeleteDevice from "../../components/DeleteSensor";
import EditSensor from "../../components/EditSensor";
import DeleteSensor from "../../components/DeleteSensor";

export default function Device() {
    let [sensors, setDeviceSensors] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [sensorClicked, setSensorClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


    async function loadSensors() {
        setLoading(true)
        let res = await api.getDeviceSensors();
        setLoading(false)
        setDeviceSensors(res.data.sensors)
        // globalData.setTitle("Device " + globalData.device.name);
    }

    useEffect(() => {
        loadSensors()
    }, [])

    if (sensorClicked) {
        return <Redirect to="/sensor"/>
    }

    function onDeviceClick(device) {
        globalData.sensor = device;
        setSensorClicked(true)
    }

    return <div style={{marginTop: "60px"}}>
        <MaterialTable
            columns={[
                {
                    title: '#',
                    render: (it) => <p>{it.tableData.id + 1}</p>,
                    headerStyle: {width: "20px"}
                },
                {
                    title: 'Type',
                    field: 'type',
                    render: (sensor) => <p onClick={() => onDeviceClick(sensor)}>{sensor.type}</p>,
                    cellStyle: {
                        backgroundColor: '#f2f2f7'
                    }
                },
                {
                    title: 'Measurement Unit',
                    field: 'measure_unit',
                },
                {
                    title: 'Created',
                    field: 'timestamp',
                    render: ({timestamp}) => moment(timestamp).format("DD/MM/YY HH:mm")
                },
                {
                    title: 'Edit',
                    render: (rowData) => <EditSensor sensor={rowData} onFinishEdit={() => loadSensors()}/>},
                {
                    title: 'Delete',
                    render: (rowData) => <DeleteSensor sensor={rowData} onFinishDelete={() => loadSensors()}/>}
            ]}
            data={sensors}
            isLoading={isLoading}
            title={globalData.device.name + " - Sensors"}
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
            }
            }
        />
    </div>
}