import React, {useEffect, useState} from "react";
import {api, globalData} from "../../repo/api.js"
import {Redirect} from "react-router";
import MaterialTable from "material-table";
import moment from "moment";
import EditSensor from "../../components/EditSensor";
import DeleteSensor from "../../components/DeleteSensor";

export default function Sensors() {
    let [sensors, setSensors] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [sensorClicked, setSensorClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);


    async function loadSensors() {
        setLoading(true)
        let res = await api.getSensors();
        setLoading(false)
        setSensors(res.data.sensors)
        // globalData.setTitle("Sensors");
    }

    useEffect(() => {
        loadSensors()
    }, [])

    if (sensorClicked) {
        return <Redirect to="/sensor"/>
    }

    function onSensorClick(sensor) {
        globalData.sensor = sensor;
        setSensorClicked(true)
    }

    return <div style={{maxWidth: '100%', marginTop: "60px"}}>
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
                    render: (sensor) => <p onClick={() => onSensorClick(sensor)}>{sensor.type}</p>,
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
            title="Sensors"
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