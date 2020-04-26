import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Reminder from '../../classes/Reminder';
import { DialogActions, Button, DialogContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import './ReminderViewerModal.css'
import { connect } from 'react-redux';
import { RootState } from '../../stores';
import { removeReminder, removeReminderByDay } from '../../stores/remindersSlice';
import { getReminderString, getReminderStyle, getRemindersOfDateOrdered } from '../../utilities/calendarUtilities';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiDialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

type ContactDetailsProps = {
    onClose: Function,
    onSelectReminder: Function,
    onRemindersAreOver: Function,
    open: boolean,
    selectedReminder: Reminder,
    reminders: Array<Reminder>,
    removeReminder: typeof removeReminder,
    removeReminderByDay: typeof removeReminderByDay
}

const ReminderViewerModal: React.FC<ContactDetailsProps> = (props) => {
    function onRemoveReminder(reminder: Reminder) {
        if (reminder.id) {
            props.removeReminder(reminder.id);
        }
    }

    function onRemoveAllReminders() {
        props.removeReminderByDay(props.selectedReminder.date);
    }

    useEffect(() => {
        if (getRemindersByDay().length === 0) {
            props.onRemindersAreOver();
        }
    }, [getRemindersByDay()])

    function getRemindersByDay(){
        return getRemindersOfDateOrdered(props.selectedReminder.date, props.reminders);
    }

    const DialogTitle = (dialogProps: DialogTitleProps) => {
        return (
            <MuiDialogTitle disableTypography className="title">
                <Typography variant="h6">{dialogProps.children}</Typography>
                <div className="icons-buttons">
                    <IconButton aria-label="close" onClick={() => props.onClose()}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </MuiDialogTitle>
        );
    };

    return (
        <Dialog onClose={() => props.onClose()} maxWidth='sm' fullWidth={true} aria-labelledby="reminder-viewer-details" open={props.open}>
            <DialogTitle id="reminder-viewer-details">{`Reminders on ${props.selectedReminder.date.toLocaleString('en', { month: 'long' })}, ${props.selectedReminder.date.getDate()}`}</DialogTitle>
            <DialogContent>
                {getRemindersByDay().map(x =>
                    <List key={x.id} component="nav" aria-label={getReminderString(x)}>
                        <ListItem onClick={() => props.onSelectReminder(x)} style={getReminderStyle(x)} button>
                            <ListItemText primary={getReminderString(x)} />
                            <ListItemSecondaryAction onClick={() => onRemoveReminder(x)}>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon style={{ color: getReminderStyle(x).color }} />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                )}
            </DialogContent>
            <DialogActions>
                <Button className="error-button" onClick={() => onRemoveAllReminders()}>Delete all</Button>
                <Button color="primary" onClick={() => props.onClose()}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

const mapState = (state: RootState) => state;

const actionCreators = { removeReminder, removeReminderByDay };

export default connect(
    mapState,
    actionCreators
)(ReminderViewerModal);
