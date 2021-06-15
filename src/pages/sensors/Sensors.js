import React, {useEffect, useState} from "react";
import {api, globalData} from "../../repo/api.js"
import {Redirect} from "react-router";
import MaterialTable from "material-table";
import moment from "moment";
import EditSensor from "../../components/EditSensor";
import DeleteSensor from "../../components/DeleteSensor";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export default function Sensors() {
    let [sensors, setSensors] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [sensorClicked, setSensorClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [t] = useTranslation('common');

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
        <h4 style={{color: "white"}}>In order to add a new sensor, please follow this
            <Link to="/instructions-new-sensor" style={{margin: "20px", color: "red"}}>instructions</Link>.
        </h4>
        <MaterialTable
            columns={[
                {
                    title: '#',
                    render: (it) => <p>{it.tableData.id + 1}</p>,
                    headerStyle: {width: "20px"}
                },
                {
                    title: t('sensors.name', {framework:'React'}),
                    field: 'name',
                    render: (sensor) => <p onClick={() => onSensorClick(sensor)}>{sensor.name}</p>,
                    cellStyle: {
                        backgroundColor: '#f2f2f7'
                    }
                },
                {
                    title: t('sensors.type', {framework:'React'}),
                    field: 'type',
                    render: (sensor) => <p onClick={() => onSensorClick(sensor)}>{sensor.type}</p>,
                    cellStyle: {
                        backgroundColor: '#f2f2f7'
                    }
                },
                {
                    title: t('sensors.unit', {framework:'React'}),
                    field: 'measure_unit',
                },
                {
                    title: t('sensors.created', {framework:'React'}),
                    field: 'timestamp',
                    render: ({timestamp}) => moment(timestamp).format("DD/MM/YY HH:mm")
                },
                {
                    title: t('sensors.edit', {framework:'React'}),
                    render: (rowData) => <EditSensor sensor={rowData} onFinishEdit={() => loadSensors()}/>},
                {
                    title: t('sensors.delete', {framework:'React'}),
                    render: (rowData) => <DeleteSensor sensor={rowData} onFinishDelete={() => loadSensors()}/>}
            ]}
            data={sensors}
            isLoading={isLoading}
            title={t('sensors.title', {framework:'React'})}
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