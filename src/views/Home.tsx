import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';
import Copyright from '../elements/Copyright/Copyright';
import Calendar from '../components/Calendar/Calendar';
import ReminderABMModal from '../components/ReminderABMModal/ReminderABMModal';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import './Home.css';
import { connect } from 'react-redux';
import { incrementMonth, decrementMonth } from '../stores/currentCalendarDateSlice';
import { RootState } from '../stores';
import Reminder from '../classes/Reminder';
import ReminderViewerModal from '../components/ReminderViewerModal/ReminderViewerModal';
import { changeSelectedReminder } from '../stores/selectedReminderSlice';

type HomeProps = {
  currentCalendarDate: Date,
  incrementMonth: typeof incrementMonth,
  decrementMonth: typeof decrementMonth,
  reminders: Array<Reminder>,
  changeSelectedReminder: typeof changeSelectedReminder
}

const Home: React.FC<HomeProps> = (props) => {

  const [reminderModalABMIsOpen, setReminderModalABMIsOpen] = React.useState(false);
  const [reminderListModalIsOpen, setReminderListModalIsOpen] = React.useState(false);

  function getAppBarTitle() {
    return `${props.currentCalendarDate.toLocaleString('en', { month: 'long' })} - ${props.currentCalendarDate.getFullYear()}`
  }

  function handleSelectReminder(reminder: Reminder) {
    setReminderListModalIsOpen(false);
    props.changeSelectedReminder(reminder);
    setReminderModalABMIsOpen(true);
  }

  return (
    <div className="root">
      <AppBar elevation={0} position="static">
        <Toolbar>
          <IconButton onClick={() => props.decrementMonth()} edge="start" color="inherit" aria-label="menu">
            <KeyboardArrowLeftIcon />
          </IconButton>
          <IconButton onClick={() => props.incrementMonth()} edge="start" color="inherit" aria-label="menu">
            <KeyboardArrowRightIcon />
          </IconButton>
          <Typography variant="h6" className='title'>
            {getAppBarTitle()}
          </Typography>
          <img id="jobsity_logo" alt="Jobsity logo" src='favicon.png' />
        </Toolbar>
      </AppBar>
      <main>
        <div className="container">
          <Calendar onClickReminder={(reminder: Reminder) => handleSelectReminder(reminder)} onClickShowMoreReminders={() => setReminderListModalIsOpen(true)} onClickCell={() => setReminderModalABMIsOpen(true)} />
        </div>
        <Copyright />
      </main>
      <ReminderABMModal open={reminderModalABMIsOpen} onClose={() => setReminderModalABMIsOpen(false)} />
      <ReminderViewerModal open={reminderListModalIsOpen} onRemindersAreOver={() => setReminderListModalIsOpen(false)} onSelectReminder={(reminder: Reminder) => handleSelectReminder(reminder)} onClose={() => setReminderListModalIsOpen(false)} />
    </div>
  );
}

const mapState = (state: RootState) => state;

const actionCreators = {
  incrementMonth, decrementMonth, changeSelectedReminder
};

export default connect(
  mapState,
  actionCreators
)(Home);
