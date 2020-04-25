import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography, makeStyles } from '@material-ui/core';
import Copyright from '../elements/Copyright/Copyright';
import Calendar from '../components/Calendar/Calendar';
import ReminderABMModal from '../components/ReminderABMModal/ReminderABMModal';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import './Home.css';
import { connect } from 'react-redux';
import { incrementMonth, decrementMonth } from '../stores/currentCalendarDateSlice';
import { RootState } from '../index';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

type HomeProps = {
  currentCalendarDate: Date,
  incrementMonth: Function,
  decrementMonth: Function
}

const Home: React.FC<HomeProps> = (props) => {

  const classes = useStyles();
  const [reminderModalIsOpen, setReminderModalIsOpen] = React.useState(true);

  function getAppBarTitle() {
    return `Jobsity Calendar - ${props.currentCalendarDate.toLocaleString('en', { month: 'long' })} - ${props.currentCalendarDate.getFullYear()}`
  }

  return (
    <div className="root">
      <AppBar elevation={0} position="static">
        <Toolbar>
          <IconButton onClick={() => props.decrementMonth()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton onClick={() => props.incrementMonth()} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <KeyboardArrowRightIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {getAppBarTitle()}
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className="container">
          <Calendar onClickCell={() => setReminderModalIsOpen(true)} dateToShow={props.currentCalendarDate} />
        </div>
        <Copyright />
      </main>
      <ReminderABMModal open={reminderModalIsOpen} onClose={() => setReminderModalIsOpen(false)} />
    </div>
  );
}

const mapState = (state: RootState) => state;

const actionCreators = {
  incrementMonth, decrementMonth
};

export default connect(
  mapState,
  actionCreators
)(Home);
