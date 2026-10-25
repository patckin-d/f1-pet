import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DriverType } from "../views/Drivers/Drivers.types";
import { DRIVERS_LIST } from "../views/Drivers/App.constants";

interface MainState {
    selectedDrivers: DriverType[],
    drivers: DriverType[]
}

const initialState: MainState = {
    selectedDrivers: [],
    drivers: DRIVERS_LIST
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        addDriver: (state, action: PayloadAction<number>) => {
            const driver = state.drivers.find((d) => d.id === action.payload )
            if (!driver) return

            state.selectedDrivers = [
                ...state.selectedDrivers,
                driver
            ]
        },
        removeDriver: (state, action: PayloadAction<number>) => {
            state.selectedDrivers = state.selectedDrivers.filter(d => d.id !== action.payload)
        }
    }
})

export const { addDriver, removeDriver } = mainSlice.actions

export const store = configureStore({
    reducer: {main: mainSlice.reducer}
})

store.subscribe(() => console.log(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store