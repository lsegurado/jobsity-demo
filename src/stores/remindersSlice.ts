import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import Reminder from '../classes/Reminder';
import { areDifferentDays } from '../utilities/dateUitilities';

const localStorageKey = 'reminders';

export const saveReminders = (reminders: Array<Reminder>) => {
    try {
        const serializedReminders = JSON.stringify(reminders);
        localStorage.setItem(localStorageKey, serializedReminders);
    } catch {
        console.error('Error while saving reminders.');
    }
};

function loadReminders(): Array<Reminder> {
    const serializedReminders = localStorage.getItem(localStorageKey);
    if (serializedReminders === null) {
        return [];
    } else {
        const reminders: Array<Reminder> = JSON.parse(serializedReminders, function (key, value) {
            if (key === 'date') {
                return new Date(value);
            }
            return value;
        });
        return reminders;
    }
}

const addReminderAction: CaseReducer<Array<Reminder>, PayloadAction<Reminder>> = (state, action) => {
    if (action.payload.title.length <= 30) {
        const newReminder = { ...action.payload, id: Date.now() };

        const newRemindersList = [...state, newReminder];
        return newRemindersList;
    } else {
        return state;
    }
}

const editReminderAction: CaseReducer<Array<Reminder>, PayloadAction<Reminder>> = (state, action) => {
    const newRemindersList = state.filter(x => x.id !== action.payload.id);
    newRemindersList.push(action.payload);
    return newRemindersList;
}

const removeReminderAction: CaseReducer<Array<Reminder>, PayloadAction<number>> = (state, action) => {
    const newRemindersList = state.filter(x => x.id !== action.payload);
    return newRemindersList;
}

const removeReminderByDayAction: CaseReducer<Array<Reminder>, PayloadAction<Date>> = (state, action) => {
    const newRemindersList = state.filter(x => areDifferentDays(x.date, action.payload));
    return newRemindersList;
}

const remindersSlice = createSlice({
    name: "reminders",
    initialState: loadReminders(),
    reducers: {
        addReminder: addReminderAction,
        editReminder: editReminderAction,
        removeReminder: removeReminderAction,
        removeReminderByDay: removeReminderByDayAction,
    },
});

const { actions, reducer } = remindersSlice;

export const { addReminder, editReminder, removeReminder, removeReminderByDay } = actions;

export default reducer;
