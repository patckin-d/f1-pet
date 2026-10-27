import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DRIVERS_LIST } from "../views/Drivers/Drivers.constants";
import type { MainState, ResultPayload } from "./store.types";


const initialState: MainState = {
    selectedDrivers: [],
    drivers: DRIVERS_LIST,
    race: 1857,
    results: {}
}

function loadState(): MainState {
    try {
        const raw = localStorage.getItem('react-pet-project')
        if (!raw) return initialState

        const saved = JSON.parse(raw) as Partial<MainState>
        return { ...initialState, ...saved }
    } catch {
        return initialState
    }
}

const mainSlice = createSlice({
    name: 'main',
    initialState: loadState,
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
        },
        resetDrivers: (state) => {
            state.selectedDrivers = []
        },
        setResult: (state, action: PayloadAction<ResultPayload>) => {
            state.results[action.payload.raceId] = action.payload.result
        },
        setRace: (state, action: PayloadAction<number>) => {
            state.race = action.payload
        },
        resetResults: (state) => {
            state.results = {}
            state.race = 1857
        }
    }
})

export const { addDriver, removeDriver, resetDrivers, setResult, setRace, resetResults } = mainSlice.actions

export const store = configureStore({
    reducer: { main: mainSlice.reducer }
})

store.subscribe(() => {
    localStorage.setItem('react-pet-project', JSON.stringify(store.getState().main))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store