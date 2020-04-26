import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from './index';
import ProvincesApiHelper from '../apiHelpers/ProvincesApiHelper';
import { Province } from "../apiHelpers/Types";

export const fetchProvinces = createAsyncThunk(
    'provinces',
    async (_prop, state) => {
        const provinces = (state.getState() as RootState).provinces;
        if (provinces.loading !== 'pending') {
            return;
        }
        const apiHelper = new ProvincesApiHelper();
        const response = await apiHelper.getAll();
        return response;
    }
)

export interface ProvincesState {
    entities: Province[],
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: ProvincesState = {
    entities: new Array<Province>(),
    loading: 'idle'
}

const provinceSlice = createSlice({
    name: 'provinces',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProvinces.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        })
        builder.addCase(fetchProvinces.fulfilled, (state, action) => {
            if (state.loading === 'pending') {
                const data = action.payload !== undefined ? action.payload: [];
                state.entities = data;
                state.loading = 'fulfilled';
            }
        })
    }
})

const { reducer } = provinceSlice;

export default reducer;