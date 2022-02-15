import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppBar,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import './Main.css';
import * as API from "../api";
import WinnersList from '../layouts/WinnersList'
import Winner from '../layouts/Winner'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

/*------------------ */

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
  menuItem: {
    textTransform: 'capitalize'
  }
});

/*---------------------*/

function Main() {

  const classes = useStyles();

  // const conf = 

  /**------------- */

  useEffect(() => {

    loadChallenges()

  }, [])


  /**------------- */

  // Challenges menu
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [selectedChallenge, setSelectedChallenge] = useState(null as unknown as string);
  const handleMenuItem = (item: string) => {
    if (item == "all") item = ""
    setSelectedChallenge(item)
    handleCloseMenu()
  };

  const [challengesList, setChallengesList] = useState(null as unknown as string[]);
  const loadChallenges = () => {
    API.getAllChallenges().then(
      res => {
        res.unshift("all")
        setChallengesList(res)
      },
      err => { console.error(err); }
    )
  }

  /**------------- */
  const [winnerDetailsDlgOpen, setWinnerDetailsDlg] = useState(false)
  const handleWinnerDetailsOpen = () => { setWinnerDetailsDlg(true) }
  const handleWinnerDetailsClose = () => { setWinnerDetailsDlg(false) }
  const [winnerDetailsAddress, setWinnerDetailsAddress] = useState(null as unknown as string)
  const handleWinnerListClick = (dataRow: any) => {
    setWinnerDetailsDlg(true)
    setWinnerDetailsAddress(dataRow.id)
  }

  /**------------- */


  return (
    <div className="Main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className={classes.title}>
            Valuter - Testnet Evaluator
          </Typography>
          <Button
            // color="inherit"
            id="challenges-button"
            aria-controls={menuOpen ? 'challenges-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={menuOpen ? 'true' : undefined}
            onClick={handleClickMenu}
            variant="contained"
            disableElevation
            endIcon={<KeyboardArrowDownIcon />}
          >Challenges</Button>
          <Menu
            id="challenges-menu"
            aria-labelledby="challenges-button"
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
          >
            {challengesList && challengesList.map((row, index) =>
              <MenuItem key={index} className={classes.menuItem} onClick={() => handleMenuItem(row)}>{row}</MenuItem>
            )}
          </Menu>

        </Toolbar>
      </AppBar>

      {/* ------------------------- */}

      <WinnersList
        filterByChallenge={selectedChallenge}
        key={selectedChallenge}
        onListItemClick={handleWinnerListClick} />

      {/* ------------------------- */}

      <Dialog
        open={winnerDetailsDlgOpen}
        onClose={handleWinnerDetailsClose}
        aria-labelledby="winner-details-title"
        aria-describedby="winner-details-description"
        fullScreen={false}
        maxWidth='lg'
        fullWidth={true}
      >
        <DialogTitle id="winner-details-title">Winner Details</DialogTitle>
        <DialogContent>
          {winnerDetailsAddress && <Winner address={winnerDetailsAddress} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWinnerDetailsClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>


      {/* ------------------------- */}
    </div >
  );
}

export default Main;
