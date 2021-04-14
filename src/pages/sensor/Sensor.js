import React, {useEffect, useState} from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {api, globalData} from "../../repo/api.js"
import {Redirect} from "react-router";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';
import {MDBContainer} from "mdbreact";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Storage';
import FavoriteIcon from '@material-ui/icons/Timeline';
import PersonPinIcon from '@material-ui/icons/PieChart';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Chart from "react-google-charts";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

function Data({data, onClick}) {
    return <StyledTableRow onClick={() => onClick(data)} key={data._id}>
        <StyledTableCell>{data.value}</StyledTableCell>
        <StyledTableCell>{data.timestamp}</StyledTableCell>
        <StyledTableCell>OK</StyledTableCell>
    </StyledTableRow>
}

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Sensor() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let [data, setSensorData] = useState([]);
    let [chart_data, setChartSensorData] = useState([]);
    let [isLoading, setLoading] = useState(false);
    let [dataClicked, setDataClicked] = useState(false);

    function onDataClick(data){
        setDataClicked(true)
    }

    useEffect(() => {
        async function fetch(){
            setLoading(true)
            let res = await api.getSensorData();
            setLoading(false)
            setSensorData(res.data.data)
            setChartSensorData(res.data.data.map(x => ["Date(" + x.timestamp + ")", x.value]))
            globalData.setTitle("Sensor " + globalData.sensor.type);
        }
        fetch()
    }, [])


    if(dataClicked){
        return <Redirect to="/data"/>
    }

    return (
        <MDBContainer>
            <p className="mx-auto">
                <Title>' '</Title>
                <Title>' '</Title>
                <Title>Data</Title>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        <Tab label="Received Data" icon={<PhoneIcon />} {...a11yProps(0)} />
                        <Tab label="Charts" icon={<FavoriteIcon />} {...a11yProps(1)} />
                        <Tab label="PieChart" icon={<PersonPinIcon />} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Table size="large" stickyHeader="true">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Time</StyledTableCell>
                                <StyledTableCell>State</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? <CircularProgress/> : data.map(it => <Data key={it._id} data={it} onClick={onDataClick} />)}
                        </TableBody>
                    </Table>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {isLoading ? <CircularProgress/> : <Chart
                        width={'100%'}
                        height={'500px'}
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={[...[['Date', 'value']], ...chart_data]}
                        options={{
                            title: 'Variation',
                            hAxis: { title: 'time', titleTextStyle: { color: '#333' } },
                            vAxis: { title: 'value'},
                            chartArea: { width: '50%', height: '70%' },
                        }}
                    />}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {isLoading ? <CircularProgress/> : <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Task', 'Hours per Day'],
                            ['Normal', 11],
                            ['Lower', 2],
                            ['Higher', 2],
                        ]}
                        options={{
                            title: 'Levels',
                            slices: {
                                0: {color: 'Green'},
                                1: {color: 'Blue'},
                                2: {color: 'Red'},
                            }
                        }}

                        rootProps={{'data-testid': '1'}}
                    />}
                </TabPanel>
            </p>
        </MDBContainer>
    );
}

export { Data, StyledTableRow, StyledTableCell }