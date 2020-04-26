import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import Reminder from '../classes/Reminder';

const changeSelectedReminderAction: CaseReducer<Reminder, PayloadAction<Reminder>> = (_state, action) => {
    return action.payload;
}

const selectedReminderSlice = createSlice({
    name: "selectedReminder",
    initialState: new Reminder(),
    reducers: {
        changeSelectedReminder: changeSelectedReminderAction
    },
});

const { actions, reducer } = selectedReminderSlice;

export const { changeSelectedReminder } = actions;

export default reducer;
