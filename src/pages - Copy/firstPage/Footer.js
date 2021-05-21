import React from 'react';
import PropTypes from 'prop-types';
import "./FirstPage.css"
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://iotic.com/">
              iotic
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

export default function Footer(props) {
  const { description } = props;

  return (
    <footer className="footer">
      <Container maxWidth="lg">
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          {description}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};
