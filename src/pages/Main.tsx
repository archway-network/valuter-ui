import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
  Theme
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import './Main.css';
import * as API from "../api";
import WinnersList from '../layouts/WinnersList'


const theme = createTheme();
const useStyles = makeStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '90%',
      display: 'flex'
    },
  },
  button: {
    width: '6rem',
    margin: theme.spacing(1),
  },
  box: {
    border: 'solid 1px #CCC',
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    textAlign: "left",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  fieldset: {
    justifyContent: "center",
    padding: "1rem"
  },
  numInput: {
    width: '5rem',
    marginLeft: '.5rem'
  },
});

/*---------------------*/

function Main() {

  const classes = useStyles();

  /**------------- */

  useEffect(() => {

    // return () => {}
  }, [])

  /**------------- */


  return (
    <div className="Main">
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Valuter - Testnet Evaluator
          </Typography>

          {/* <IconButton
            edge="end"
            aria-label="Statistics"
            aria-haspopup="true"
            onClick={handleStatisticsOpen}
            color="inherit"
            title="Data collection statistics"
          >
            <EqualizerIcon />
          </IconButton> */}

        </Toolbar>
      </AppBar>

      {/* ------------------------- */}

      {/* <SensorSearch onSearchResultClick={handleSearchResultClick} /> */}
      <WinnersList />

      {/* ------------------------- */}

      {/* <Dialog
        open={dlgMyPushSensors}
        onClose={handleMyPushSensorsClose}
        aria-labelledby="my-push-sensor-dialog-title"
        aria-describedby="my-push-sensor-dialog-description"
        fullScreen={true}
      >
        <DialogTitle id="my-push-sensor-dialog-title">{"My Push Sensors"}</DialogTitle>
        <DialogContent>
          {dlgMyPushSensors && <MyPushSensors onSearchResultClick={handleSearchResultClick} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMyPushSensorsClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* ------------------------- */}
    </div >
  );
}

export default Main;
