import React, { useEffect } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Reminder from '../../classes/Reminder';
import { DialogActions, Button, DialogContent, TextField } from '@material-ui/core';
import './ReminderABMModal.css'
import {
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Province, City } from '../../apiHelpers/Types';
import { ProvincesState, fetchProvinces } from '../../stores/provincesSlice';
import { connect, useDispatch } from 'react-redux';
import { RootState } from '../../stores';
import { fetchCitiesByProvinceId, CitiesState } from '../../stores/citiesSlice';
import WheaterViewer from '../WheaterViewer/WheaterViewer';
import { addReminder, editReminder, removeReminderByDay, removeReminder } from '../../stores/remindersSlice';
import { changeSelectedReminder } from '../../stores/selectedReminderSlice';
type ContactDetailsProps = {
    changeSelectedReminder: typeof changeSelectedReminder,
    currentCalendarDate: Date,
    selectedReminder: Reminder,
    onClose: Function,
    open: boolean,
    provinces: ProvincesState,
    cities: CitiesState,
    addReminder: typeof addReminder,
    editReminder: typeof editReminder,
    removeReminderByDay: typeof removeReminderByDay,
    removeReminder: typeof removeReminder
}

const ReminderABMModal: React.FC<ContactDetailsProps> = (props) => {
    const maxLengthReminder = 30;
    const dispatch = useDispatch();

    const handleDateChange = (newDate: Date) => {
        const updatedDate = new Date(props.selectedReminder.date);
        updatedDate.setDate(newDate.getDate());
        updatedDate.setMonth(newDate.getMonth());
        updatedDate.setFullYear(newDate.getFullYear())
        props.changeSelectedReminder({ ...props.selectedReminder, date: updatedDate });
    }

    const handleTimeChange = (newTime: Date) => {
        const updatedDate = new Date(props.selectedReminder.date);
        updatedDate.setHours(newTime.getHours());
        updatedDate.setMinutes(newTime.getMinutes());
        props.changeSelectedReminder({ ...props.selectedReminder, date: updatedDate });
    }

    useEffect(() => {
        dispatch(fetchProvinces());
    }, [])

    useEffect(() => {
        if (props.selectedReminder.province) {
            dispatch(fetchCitiesByProvinceId(props.selectedReminder.province.id));
        }
    }, [props.selectedReminder.province])

    function onSaveReminder(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newReminder = props.selectedReminder;

        if (newReminder.id) {
            props.editReminder(newReminder);
        } else {
            props.addReminder(newReminder);
        }
        props.changeSelectedReminder(new Reminder());
        props.onClose();
    }

    function isNewReminder() {
        return props.selectedReminder.id === undefined;
    }

    function getSaveText() {
        return isNewReminder() ? 'Save' : 'Update';
    }

    function getTitleText() {
        return isNewReminder() ? 'New reminder' : 'Edit reminder';
    }

    function onRemoveReminder() {
        if (props.selectedReminder.id) {
            props.removeReminder(props.selectedReminder.id);
        }
        props.onClose();
    }

    function onRemoveAllReminders() {
        props.removeReminderByDay(props.selectedReminder.date);
        props.onClose();
    }

    return (
        <Dialog onClose={() => props.onClose()} maxWidth='sm' fullWidth={true} aria-labelledby="reminder-details" open={props.open}>
            <form onSubmit={onSaveReminder}>
                <DialogTitle id="reminder-details">{getTitleText()}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={props.selectedReminder.title}
                        margin="dense"
                        id="title"
                        placeholder="Add title"
                        type="text"
                        onInput={(event: any) => props.changeSelectedReminder({ ...props.selectedReminder, title: event.target.value })}
                        required
                        fullWidth
                        inputProps={{ maxLength: maxLengthReminder }}
                        helperText={<span className="caracterCounter">{`${props.selectedReminder.title.length} / ${maxLengthReminder}`}</span>}
                    />
                    <div className="rowForm">
                        <KeyboardDatePicker
                            margin="dense"
                            id="reminder-date"
                            label="Reminder date"
                            format="MM/dd/yyyy"
                            value={props.selectedReminder.date}
                            onChange={(newDate: any) => handleDateChange(newDate)}
                            required
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="dense"
                            id="reminder-time"
                            label="Reminder time"
                            value={props.selectedReminder.date}
                            onChange={(newTime: any) =>handleTimeChange(newTime)}
                            required
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </div>
                    <div className="rowForm">
                        <Autocomplete
                            id="province-select"
                            className="select"
                            value={props.selectedReminder.province ? props.selectedReminder.province : null}
                            options={props.provinces.entities}
                            autoHighlight
                            onChange={(_event: any, newValue: Province | null) => props.changeSelectedReminder({ ...props.selectedReminder, province: newValue, city: undefined })}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    id="province-select-input"
                                    className="select"
                                    {...params}
                                    label="Choose a province"
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            id="city-select"
                            className="select"
                            value={props.selectedReminder.city ? props.selectedReminder.city : null}
                            options={props.selectedReminder.province ? props.cities.entities[props.selectedReminder.province.id] : []}
                            autoHighlight
                            onChange={(_event: any, newValue: City | null) => props.changeSelectedReminder({ ...props.selectedReminder, city: newValue })}
                            getOptionLabel={(option) => option.name}
                            renderOption={(option) => option.name}
                            renderInput={(params) => (
                                <TextField
                                    className="select"
                                    id="city-select-input"
                                    {...params}
                                    label="Choose a city"
                                    fullWidth
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="rowForm">
                        <div className="colorContainer">
                            <label htmlFor="color">Color</label>
                            <input type="color" name="color" value={props.selectedReminder.color} onChange={(event) => props.changeSelectedReminder({ ...props.selectedReminder, color: event.target.value })} />
                        </div>
                        <WheaterViewer city={props.selectedReminder.city} date={props.selectedReminder.date} />
                    </div>
                </DialogContent>
                <DialogActions>
                    {!isNewReminder() ? (
                        <React.Fragment>
                            <Button className='error-button' onClick={() => onRemoveReminder()}>Delete</Button>
                            <Button className='error-button' onClick={() => onRemoveAllReminders()}>Delete all in this day</Button>
                        </React.Fragment>
                    ) : undefined
                    }
                    <Button type="submit" variant="contained" color="primary">{getSaveText()}</Button>
                    <Button color="primary" onClick={() => props.onClose()}>Close</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

const mapState = (state: RootState) => state;

const actionCreators = { addReminder, editReminder, removeReminder, removeReminderByDay, changeSelectedReminder };

export default connect(
    mapState,
    actionCreators
)(ReminderABMModal);
