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
import { RootState } from '../..';
import { fetchCitiesByProvinceId, CitiesState } from '../../stores/citiesSlice';
import WheaterViewer from '../WheaterViewer/WheaterViewer';

type ContactDetailsProps = {
    selectedReminder?: Reminder,
    onClose: Function,
    open: boolean,
    provinces: ProvincesState,
    cities: CitiesState
}

const ReminderABMModal: React.FC<ContactDetailsProps> = (props) => {
    const defaultReminderState = new Reminder('', new Date(), '#FF0000', undefined, undefined);
    const [reminder, setReminder] = React.useState(defaultReminderState);
    const maxLengthReminder = 30;
    const dispatch = useDispatch();

    const handleDateChange = (newDate: Date) => {
        setReminder({ ...reminder, date: newDate });
    }

    useEffect(() => {
        dispatch(fetchProvinces());
    }, [])

    useEffect(() => {
        if (reminder.province) {
            dispatch(fetchCitiesByProvinceId(reminder.province.id));
        }
    }, [reminder.province])

    function onSaveReminder(event: any) {
        event.preventDefault();

        setReminder(defaultReminderState);
        props.onClose();
    }

    return (
        <Dialog onClose={() => props.onClose()} maxWidth='sm' fullWidth={true} aria-labelledby="reminder-details" open={props.open}>
            <form onSubmit={onSaveReminder}>
                <DialogTitle id="reminder-details">Reminder details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        value={reminder.title}
                        margin="dense"
                        id="title"
                        placeholder="Add title"
                        type="text"
                        onInput={(event: any) => setReminder({ ...reminder, title: event.target.value })}
                        required
                        fullWidth
                        inputProps={{ maxLength: maxLengthReminder }}
                        helperText={<span className="caracterCounter">{`${reminder.title.length} / ${maxLengthReminder}`}</span>}
                    />
                    <div className="rowForm">
                        <KeyboardDatePicker
                            margin="dense"
                            id="reminder-date"
                            label="Reminder date"
                            format="MM/dd/yyyy"
                            value={reminder.date}
                            onChange={handleDateChange}
                            required
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="dense"
                            id="reminder-time"
                            label="Reminder time"
                            value={reminder.date}
                            onChange={handleDateChange}
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
                            value={reminder.province ? reminder.province : { name: '' }}
                            options={props.provinces.entities}
                            autoHighlight
                            onChange={(_event: any, newValue: Province) => setReminder({ ...reminder, province: newValue, city: undefined })}
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
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            id="city-select"
                            className="select"
                            value={reminder.city ? reminder.city : { name: '' }}
                            options={reminder.province ? props.cities.entities[reminder.province.id] : []}
                            autoHighlight
                            onChange={(_event: any, newValue: City) => setReminder({ ...reminder, city: newValue !== null ? newValue : undefined })}
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
                                        autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />
                            )}
                        />
                    </div>
                    <div className="rowForm">
                        <div className="colorContainer">
                            <label htmlFor="color">Color</label>
                            <input type="color" name="color" value={reminder.color} onChange={(event) => setReminder({ ...reminder, color: event.target.value })} />
                        </div>
                        <WheaterViewer city={reminder.city} date={reminder.date} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary">Save Reminder</Button>
                    <Button color="primary" onClick={() => props.onClose()}>Close</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

const mapState = (currentCalendarDate: RootState) => currentCalendarDate;

export default connect(
    mapState
)(ReminderABMModal);
