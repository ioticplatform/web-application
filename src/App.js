import './App.scss';
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Login from "./pages/login/Login";
import Devices from "./pages/devices/Devices";
import Dashboard from "./pages/dashboard/Dashboard";
import Device from "./pages/device/Device";
import Register from "./pages/register/Register";
import Sensor from "./pages/sensor/Sensor";
import Sensors from "./pages/sensors/Sensors";
import EditAccount from "./pages/editAccount/EditAccount";
import {InfoListItems, MainListItems} from "./components/ListItems"
import List from "@material-ui/core/List";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AppBar from "@material-ui/core/AppBar";
import {globalData} from "./repo/api";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import FirstPage from "./pages/firstPage/FirstPage";
import HowItStarted from "./pages/firstPage/articles/HowItStarted";
import DIY from "./pages/firstPage/articles/DIY";
import Admin from "./pages/admin/Admin";
import ContactUs from "./pages/contactUs/ContactUs";
import Support from "./pages/support/Support";
import FAQ from "./pages/FAQ/FAQ";
import GoogleAnalytics from "./pages/admin/GoogleAnalytics"
import {useTranslation} from "react-i18next";
import MyQuestions from "./pages/MyQuestions/MyQuestions";
import InstructionsDevice from "./pages/instructions/InstructionsDevice";
import InstructionsSensor from "./pages/instructions/InstructionsSensor";
import Maps from "./pages/maps/Maps";
import Actors from "./pages/actors/Actors";
import Automation from "./pages/automation/Automation";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },

    appBar: {
        position: "fixed",
        backgroundColor: "#355e35",
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

function ShowAppBar() {
    const classes = useStyles();
    let [title, setTitle] = useState(false);
    globalData.setTitle = setTitle
    const [open, setOpen] = React.useState(false);
    const [t, i18n] = useTranslation('common');

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return <div>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography component="h1" variant="h6" noWrap className={classes.title}>
                    {title}
                </Typography>
                <button style={{backgroundColor: "#355e35", border: "#355e35"}}
                        onClick={() => i18n.changeLanguage('ro')}><img className="photo" src={"ro.png"}/></button>
                <button style={{backgroundColor: "#355e35", border: "#355e35"}}
                        onClick={() => i18n.changeLanguage('en')}><img className="photo" src={"en.png"}/></button>
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="temporary"
            classes={{
                paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List><MainListItems handleDrawerClose={handleDrawerClose}/></List>
            <Divider />
            {/*<List><SecondaryListItems /></List>*/}
            <List><InfoListItems handleDrawerClose={handleDrawerClose}/></List>
        </Drawer>
    </div>
}

function App() {
    const { t } = useTranslation();

    let [isLoggedIn, setLoggedIn] = useState(false);
    globalData.setLoggedIn = setLoggedIn

    // document.body.style.background = "url('background-white.jpg') repeat center";
    document.body.style.background = "url('background-black.jpg') repeat center";

    if (isLoggedIn) {
        return <div className="App">
            <h1>{t('this_is_an_example')}</h1>
            <Router>
                <div>{isLoggedIn && <ShowAppBar/>}</div>
                <div>
                    <Switch>
                        <Route path="/firstPage">
                            <FirstPage/>
                        </Route>
                        <Route path="/admin">
                            <Admin/>
                        </Route>
                        <Route path="/support">
                            <Support/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard/>
                        </Route>
                        <Route path="/devices">
                            <Devices/>
                        </Route>
                        <Route path="/device">
                            <Device/>
                        </Route>
                        <Route path="/sensors">
                            <Sensors/>
                        </Route>
                        <Route path="/actors">
                            <Actors/>
                        </Route>
                        <Route path="/sensor">
                            <Sensor/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/account">
                            <EditAccount/>
                        </Route>
                        <Route path="/contact">
                            <ContactUs/>
                        </Route>
                        <Route path="/faq">
                            <FAQ/>
                        </Route>
                        <Route path="/forgotPassword">
                            <ForgotPassword/>
                        </Route>
                        <Route path="/resetPassword">
                            <ResetPassword/>
                        </Route>
                        <Route path="/howItStarted">
                            <HowItStarted/>
                        </Route>
                        <Route path="/diy">
                            <DIY/>
                        </Route>
                        <Route path="/myQuestions">
                            <MyQuestions/>
                        </Route>
                        <Route path="/instructions-new-device">
                            <InstructionsDevice/>
                        </Route>
                        <Route path="/instructions-new-sensor">
                            <InstructionsSensor/>
                        </Route>
                        <Route path="/maps">
                            <Maps/>
                        </Route>
                        <Route path="/automation">
                            <Automation/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    }
    else {
        return <div className="App">
            <Router>
            <div>{isLoggedIn && <ShowAppBar/>}</div>
            <div>
                <Switch>
                    <Route path="/admin">
                        <Admin/>
                    </Route>
                    <Route path="/support">
                        <Support/>
                    </Route>
                    <Route path="/faq">
                        <FAQ/>
                    </Route>
                    <Route path="/firstPage">
                        <FirstPage/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/forgotPassword">
                        <ForgotPassword/>
                    </Route>
                    <Route path="/resetPassword">
                        <ResetPassword/>
                    </Route>
                    <Route path="/howItStarted">
                        <HowItStarted/>
                    </Route>
                    <Route path="/diy">
                        <DIY/>
                    </Route>
                    <Route path="/googleAnalytics">
                        <GoogleAnalytics/>
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
    }

}

export default App;
