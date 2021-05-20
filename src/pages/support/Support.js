import React, {useEffect, useState} from "react";
import {withStyles} from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import {api, globalData} from "../../repo/api.js"
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Title from '../../components/Title';
import {MDBContainer} from "mdbreact";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MaterialTable from "material-table";
import DeleteData from "../../components/DeleteData";

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

export default function Support() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let [messages, setMessages] = useState([]);
    let [isLoading, setLoading] = useState(false);

    async function loadData() {
        setLoading(true)
        let res = await api.getMessages();
        setLoading(false)
        setMessages(res.data.messages)
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
                <Title>Support</Title>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example">
                        <Tab label="Messages" icon={<EmailIcon />} {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div style={{maxWidth: '100%'}}>
                        <MaterialTable
                            columns={[
                                {
                                    title: 'Username',
                                    field: 'username',
                                    cellStyle: {
                                        backgroundColor: '#f2f2f7',
                                    }
                                },
                                {
                                    title: 'Subject',
                                    field: 'subject',
                                },
                                {
                                    title: 'Phone',
                                    field: 'phone',
                                },
                                {
                                    title: 'Message',
                                    field: 'message',
                                },
                                {
                                    title: 'FAQ',
                                    render: (rowData) => <DeleteData data={rowData} onFinishDelete={() => loadData()}/>
                                },
                                {
                                    title: 'Delete',
                                    render: (rowData) => <DeleteData data={rowData} onFinishDelete={() => loadData()}/>
                                }
                            ]}
                            data={messages}
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
            </p>
        </MDBContainer>
    );
}

export { Data, StyledTableRow, StyledTableCell }