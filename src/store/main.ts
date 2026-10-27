import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AddDriverPayload, MainState, ResultPayload } from "./store.types";
import { api } from "./api";


const initialState: MainState = {
    selectedDrivers: [],
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
        addDriver: (state, action: PayloadAction<AddDriverPayload>) => {
            const driver = action.payload.drivers.find((d) => d.id == action.payload.driverId )
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
    reducer: {
        main: mainSlice.reducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})

store.subscribe(() => {
    localStorage.setItem('react-pet-project', JSON.stringify(store.getState().main))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store