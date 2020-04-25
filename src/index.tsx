import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import theme from './plugins/styles';
import 'typeface-roboto';
import './cssVariables.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { Provider, useDispatch } from 'react-redux';

import currentCalendarDateReducer from './stores/currentCalendarDateSlice';
import provincesReducer from './stores/provincesSlice';
import citiesReducer from './stores/citiesSlice';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
const store = configureStore({
  reducer: {
    currentCalendarDate: currentCalendarDateReducer,
    provinces: provincesReducer,
    cities: citiesReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

ReactDOM.render(
    <Provider store={store}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <Router />
                </BrowserRouter>
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
