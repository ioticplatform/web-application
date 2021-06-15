import React, {useEffect, useState} from "react";
import {api, globalData} from "../../repo/api.js"
import {Redirect} from "react-router";
import MaterialTable from "material-table";
import moment from "moment";
// import EditSensor from "../../components/EditSensor";
import DeleteActor from "../../components/DeleteActor";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";

export default function Actors() {
    let [actors, setActors] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [actorClicked, setActorClicked] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [t] = useTranslation('common');

    async function loadActors() {
        setLoading(true)
        let res = await api.getActors();
        setLoading(false)
        setActors(res.data.actors)
    }

    useEffect(() => {
        loadActors()
    }, [])

    if (actorClicked) {
        return <Redirect to="/actor"/>
    }

    function onActorClick(actor) {
        globalData.actor = actor;
        setActorClicked(true)
    }

    return <div style={{maxWidth: '100%', marginTop: "60px"}}>
        <h4 style={{color: "white"}}>In order to add a new actor, please follow this
            <Link to="/instructions-new-actor" style={{margin: "20px", color: "red"}}>instructions</Link>.
        </h4>
        <MaterialTable
            columns={[
                {
                    title: '#',
                    render: (it) => <p>{it.tableData.id + 1}</p>,
                    headerStyle: {width: "20px"}
                },
                {
                    title: t('actors.name', {framework:'React'}),
                    field: 'name',
                    render: (actor) => <p onClick={() => onActorClick(actor)}>{actor.name}</p>,
                    cellStyle: {
                        backgroundColor: '#f2f2f7'
                    }
                },
                {
                    title: t('actors.type', {framework:'React'}),
                    field: 'type',
                    render: (actor) => <p onClick={() => onActorClick(actor)}>{actor.type}</p>,
                    cellStyle: {
                        backgroundColor: '#f2f2f7'
                    }
                },
                {
                    title: t('actors.created', {framework:'React'}),
                    field: 'timestamp',
                    render: ({timestamp}) => moment(timestamp).format("DD/MM/YY HH:mm")
                },
                // {
                //     title: t('actors.edit', {framework:'React'}),
                //     render: (rowData) => <EditSensor actor={rowData} onFinishEdit={() => loadActors()}/>},
                {
                    title: t('actors.delete', {framework:'React'}),
                    render: (rowData) => <DeleteActor actor={rowData} onFinishDelete={() => loadActors()}/>}
            ]}
            data={actors}
            isLoading={isLoading}
            title={t('actors.title', {framework:'React'})}
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