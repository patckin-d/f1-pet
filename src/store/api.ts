import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DriverType, RaceType, RaceResult } from "../types/index.types";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (build) => ({
        getDrivers: build.query<DriverType[], void>({
            query: () => 'drivers'
        }),

        getTracks: build.query<RaceType[], void>({
            query: () => 'tracks'
        }),

        getRaces: build.query<Record<string, RaceResult[]>[], void>({
            query: () => 'races'
        }),
    })
})

export const { useGetDriversQuery, useGetTracksQuery, useGetRacesQuery } = api