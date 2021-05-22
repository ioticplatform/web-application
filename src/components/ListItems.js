import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HelpIcon from '@material-ui/icons/Help';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {EmailOutlined, FeedbackOutlined, PersonRounded} from "@material-ui/icons";
import {Redirect} from "react-router";
import {useTranslation} from "react-i18next";

export function MainListItems() {
    let [navigateAccount, setNavigateAccount] = useState(false)
    let [navigateDashboard, setNavigateDashboard] = useState(false)
    const [t] = useTranslation('common');

    async function onAccountClick() {
        setNavigateAccount(true)
    }

    async function onDashboardClick() {
        setNavigateDashboard(true)
    }

    if (navigateAccount) {
        return <Redirect to={"/account"}/>
    }

    if (navigateDashboard) {
        return <Redirect to={"/dashboard"}/>
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

export function InfoListItems() {
    let [navigateContactUs, setNavigateContactUs] = useState(false)
    let [navigateFAQ, setNavigateFAQ] = useState(false)
    let [navigateMyQuestions, setNavigateMyQuestions] = useState(false)

    const [t] = useTranslation('common');

    async function onContactUsClick() {
        setNavigateContactUs(true)
    }

    async function onFAQClick() {
        setNavigateFAQ(true)
    }

    async function onMyQuestionsClick() {
        setNavigateMyQuestions(true)
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
    </div>);
}