import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from '../stores';
import CitiesApiHelper from '../apiHelpers/CitiesApiHelper';
import { City } from "../apiHelpers/Types";

export const fetchCitiesByProvinceId = createAsyncThunk(
    'cities/provinceId',
    async (provinceId: number, state) => {
        const cities = (state.getState() as RootState).cities;

        if (cities.loading !== 'pending' || (cities.entities[provinceId] !== undefined)) {
            return;
        }
        const apiHelper = new CitiesApiHelper();
        const response = await apiHelper.getByProvince(provinceId);
        return response;
    }
)

export interface CitiesState {
    entities: Array<City[]>,
    loading: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: CitiesState = {
    entities: new Array<City[]>(),
    loading: 'idle'
}

const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchCitiesByProvinceId.pending, (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending';
            }
        })
        builder.addCase(fetchCitiesByProvinceId.fulfilled, (state, action) => {
            const provinceId = action.meta.arg;
            if (state.loading === 'pending' && state.entities[provinceId] === undefined) {
                state.loading = 'idle';
                if (action.payload !== undefined) {
                    state.entities[provinceId] = action.payload;
                }
            }
        })
    }
})

const { reducer } = citySlice;

export default reducer;