
import currentCalendarDateReducer from './currentCalendarDateSlice';
import provincesReducer from './provincesSlice';
import citiesReducer from './citiesSlice';
import selectedReminderReducer from './selectedReminderSlice';
import remindersReducer, { saveReminders } from './remindersSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
const store = configureStore({
    reducer: {
        currentCalendarDate: currentCalendarDateReducer,
        provinces: provincesReducer,
        cities: citiesReducer,
        reminders: remindersReducer,
        selectedReminder: selectedReminderReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

store.subscribe(() => {
    saveReminders(store.getState().reminders);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export default store;