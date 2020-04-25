import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

const incrementMonthAction: CaseReducer<Date, PayloadAction<number>> = (state) => {
    const newDate = new Date(state);
    newDate.setMonth(state.getMonth() + 1);
    return newDate;
}

const decrementMonthAction: CaseReducer<Date, PayloadAction<number>> = (state) => {
    const newDate = new Date(state);
    newDate.setMonth(state.getMonth() - 1);
    return newDate;
}

const currentCalendarDateSlice = createSlice({
    name: "currentCalendarSlice",
    initialState: new Date(),
    reducers: {
        incrementMonth: incrementMonthAction,
        decrementMonth: decrementMonthAction
    },
});

const { actions, reducer } = currentCalendarDateSlice;

export const { incrementMonth, decrementMonth } = actions;

export default reducer;
