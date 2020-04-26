import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

const incrementMonthAction: CaseReducer<Date, PayloadAction<undefined>> = (state) => {
    const newDate = new Date(state);
    newDate.setMonth(state.getMonth() + 1);
    return newDate;
}

const decrementMonthAction: CaseReducer<Date, PayloadAction<undefined>> = (state) => {
    const newDate = new Date(state);
    newDate.setMonth(state.getMonth() - 1);
    return newDate;
}

const changeCurrentCalendarDateAction: CaseReducer<Date, PayloadAction<number>> = (state, action) => {
    const newDate = new Date(state);
    newDate.setDate(action.payload);
    return newDate;
}

const currentCalendarDateSlice = createSlice({
    name: "currentCalendarDate",
    initialState: new Date(),
    reducers: {
        incrementMonth: incrementMonthAction,
        decrementMonth: decrementMonthAction,
        changeCurrentCalendarDate: changeCurrentCalendarDateAction
    },
});

const { actions, reducer } = currentCalendarDateSlice;

export const { incrementMonth, decrementMonth, changeCurrentCalendarDate } = actions;

export default reducer;
