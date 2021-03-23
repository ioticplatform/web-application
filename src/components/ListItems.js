import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {EmailOutlined, FeedbackOutlined, PersonRounded} from "@material-ui/icons";
import {Redirect} from "react-router";


export function MainListItems() {
    let [navigateAccount, setNavigateAccount] = useState(false)

    async function onAccountClick() {
        setNavigateAccount(true)
    }

    if (navigateAccount) {
        return <Redirect to={"/account"}/>
    }

    return <div>
            <ListItem button onClick={onAccountClick}>
                <ListItemIcon>
                    <PersonRounded />
                </ListItemIcon>
                <ListItemText primary="My Account" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Buy Devices" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div>
}

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current week" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current year" />
        </ListItem>
    </div>
);

export const infoListItems = (
    <div>
        <ListSubheader inset>Info</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <EmailOutlined />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <FeedbackOutlined />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
        </ListItem>
    </div>
)