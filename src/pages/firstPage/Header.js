import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Redirect} from "react-router";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
    fontSize: 50,
    paddingTop: 20,
    paddingBottom: 20,
    color: '#ff5050',
    fontWeight: 'bold',
    fontFamily: 'serif'

  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
    backgroundColor: '#597a59',
    color: 'white'
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    fontSize: 16
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  let [register, setRegister] = useState(false)

  async function onRegisterClick(){
    setRegister(true)
  }

  if(register){
    return <Redirect to={"/login"}/>
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Button variant="outlined" type="button" style={{color: "red"}} size="medium" onClick={onRegisterClick}>
          <b>Sign up</b>
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
