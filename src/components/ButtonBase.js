import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import {Redirect} from "react-router";
import FullScreenDialog from "./FullScreenDialog";

const images = [
    {
        url: 'devices.jpg',
        title: 'Devices',
        width: '34%',
    },
    {
        url: 'sensors.jpg',
        title: 'Sensors',
        width: '33%',
    },
    {
        url: 'data.jpg',
        title: 'Data',
        width: '33%',
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

export default function ButtonBases() {
    const classes = useStyles();
    let [devices, setDevices] = useState(false)
    let [sensors, setSensors] = useState(false)

    async function onDevicesClick() {
        setDevices(true)
    }

    async function onSensorsClick() {
        setSensors(true)
    }

    function onButtonClick(idx){
        if(idx === 0){
            setDevices(true)
        }
        else if (idx === 1){
            setSensors(true)
        }
    }

    if (devices) {
        return <Redirect to={"/devices"}/>
    }

    if (sensors) {
        return <Redirect to={"/sensors"}/>
    }

    return (
        <div className={classes.root}>
            {images.map((image, index) => (
                <ButtonBase focusRipplekey={images[0].title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    onClick={() => onButtonClick(index)}>
                      <span
                          className={classes.imageSrc}
                          style={{
                              backgroundImage: `url(${image.url})`,
                          }}/>
                    <span className={classes.imageBackdrop}/>
                    <span className={classes.imageButton}>
                <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}>
                  {image.title}
                    <span className={classes.imageMarked}/>
                </Typography>
          </span>
                </ButtonBase>
            ))}
        </div>
    );
}