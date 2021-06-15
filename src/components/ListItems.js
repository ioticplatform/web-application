import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HelpIcon from '@material-ui/icons/Help';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RoomIcon from '@material-ui/icons/Room';
import LayersIcon from '@material-ui/icons/Layers';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {EmailOutlined, FeedbackOutlined, PersonRounded} from "@material-ui/icons";
import {Redirect, useHistory} from "react-router";
import {useTranslation} from "react-i18next";
import {globalData} from "../repo/api";
import PropTypes from "prop-types";

export function MainListItems(props) {
    const { handleDrawerClose } = props;

    let [navigateAccount, setNavigateAccount] = useState(false)
    let [navigateDashboard, setNavigateDashboard] = useState(false)
    let [navigateMaps, setNavigateMaps] = useState(false)
    let [navigateAutomation, setAutomation] = useState(false)
    const [t] = useTranslation('common');
    let history = useHistory();

    async function onAccountClick() {
        setNavigateAccount(true)
        handleDrawerClose();
    }

    async function onMapsClick() {
        setNavigateMaps(true)
        handleDrawerClose();
    }

    async function onAutomationClick() {
        setAutomation(true)
        handleDrawerClose();
    }

    async function onDashboardClick() {
        setNavigateDashboard(true)
        handleDrawerClose();
    }

    if (navigateAccount) {
        return <Redirect to={"/account"}/>
    }

    if (navigateMaps) {
        return <Redirect to={"/maps"}/>
    }

    if (navigateDashboard) {
        return <Redirect to={"/dashboard"}/>
    }

    if (navigateAutomation) {
        // window.location.href = 'http://localhost:1880'
        // return <div/>
        return <Redirect to={"/automation"}/>
    }

    return <div>
            <ListItem button onClick={onAccountClick}>
                <ListItemIcon>
                    <PersonRounded />
                </ListItemIcon>
                <ListItemText primary={t('dashboard.myAccount', {framework:'React'})} />
            </ListItem>
            <ListItem button onClick={onDashboardClick}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={t('dashboard.buy', {framework:'React'})} />
            </ListItem>
            <ListItem button onClick={onMapsClick}>
                <ListItemIcon>
                    <RoomIcon/>
                </ListItemIcon>
                <ListItemText primary="Maps" />
            </ListItem>
            <ListItem button onClick={onAutomationClick}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Automation"/>
            </ListItem>
        </div>
}

MainListItems.propTypes = {
    handleDrawerClose: PropTypes.any
};


export function SecondaryListItems() {
    return (<div>
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
    </div>);
}

export function InfoListItems(props) {
    const { handleDrawerClose } = props;

    let [navigateContactUs, setNavigateContactUs] = useState(false)
    let [navigateFAQ, setNavigateFAQ] = useState(false)
    let [navigateMyQuestions, setNavigateMyQuestions] = useState(false)
    let [navigateLogout, setNavigateLogout] = useState(false)

    const [t] = useTranslation('common');

    async function onContactUsClick() {
        setNavigateContactUs(true)
        handleDrawerClose();
    }

    async function onFAQClick() {
        setNavigateFAQ(true)
        handleDrawerClose();
    }

    async function onMyQuestionsClick() {
        setNavigateMyQuestions(true)
        handleDrawerClose();
    }

    async function onLogoutClick() {
        setNavigateLogout(true)
    }

    if (navigateMyQuestions) {
        return <Redirect to={"/myQuestions"}/>
    }

    if (navigateContactUs) {
        return <Redirect to={"/contact"}/>
    }

    if (navigateFAQ) {
        return <Redirect to={"/faq"}/>
    }

    if (navigateLogout) {
        globalData.setLoggedIn(false);
        return <Redirect to={"/login"}/>
    }

    return (<div>
        <ListSubheader inset>Info</ListSubheader>
        <ListItem button onClick={onContactUsClick}>
            <ListItemIcon>
                <EmailOutlined />
            </ListItemIcon>
            <ListItemText primary={t('dashboard.contactUs', {framework:'React'})} />
        </ListItem>
        <ListItem button onClick={onFAQClick}>
            <ListItemIcon>
                <FeedbackOutlined />
            </ListItemIcon>
            <ListItemText primary="FAQ" />
        </ListItem>
        <ListItem button onClick={onMyQuestionsClick}>
            <ListItemIcon>
                <HelpIcon />
            </ListItemIcon>
            <ListItemText primary={t('dashboard.myQuestions', {framework:'React'})} />
        </ListItem>
        <ListItem button onClick={onLogoutClick}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={t('dashboard.logOut', {framework:'React'})} />
        </ListItem>
    </div>);
}
InfoListItems.propTypes = {
    handleDrawerClose: PropTypes.any
};