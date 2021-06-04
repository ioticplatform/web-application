import React, {useEffect, useState} from "react";
import {withStyles} from '@material-ui/core/styles';
import {api} from "../../repo/api.js"
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';
import {MDBContainer} from "mdbreact";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StorageIcon from '@material-ui/icons/Storage';
import FavoriteIcon from '@material-ui/icons/Timeline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialTable from "material-table";
import DeleteData from "../../components/DeleteData";
import GoogleAnalytics from "./GoogleAnalytics";

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

export default function Admin() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let [users, setUsers] = useState([]);
    let [isLoading, setLoading] = useState(false);

    async function loadData() {
        setLoading(true)
        let res = await api.getUsers();
        setLoading(false)
        setUsers(res.data.users)
    }

    useEffect(() => {
        loadData()
    }, [])

    function level(val, minVal, maxVal){
        if (val < minVal)
            return "low"
        else if (val > maxVal)
            return "high"
        else return "normal"
    }

    return (
        <MDBContainer>
            <p className="mx-auto">
                <Title>Admin</Title>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example">
                        <Tab label="Users" icon={<StorageIcon />} {...a11yProps(0)} />
                        <Tab label="Statistics" icon={<FavoriteIcon />} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div style={{maxWidth: '100%'}}>
                        <MaterialTable
                            columns={[
                                {
                                    title: 'ID',
                                    field: '_id',
                                    cellStyle: {
                                        backgroundColor: '#f2f2f7',
                                    }
                                },
                                {
                                    title: 'Name',
                                    field: 'name',
                                },
                                {
                                    title: 'Email',
                                    field: 'email',
                                },
                                {
                                    title: 'Confirmed',
                                    field: 'confirmed',
                                },
                                {
                                    title: 'Delete',
                                    render: (rowData) => <DeleteData data={rowData} onFinishDelete={() => loadData()}/>
                                }
                            ]}
                            data={users}
                            isLoading={isLoading}
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
                                }
                            }}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <GoogleAnalytics/>
                </TabPanel>
            </p>
        </MDBContainer>
    );
}

export { Data, StyledTableRow, StyledTableCell }