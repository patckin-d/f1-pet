import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
    endpoints: (build) => ({
        getDrivers: build.query({
            query: () => 'drivers'
        }),

        getTracks: build.query({
            query: () => 'tracks'
        }),

        getRaces: build.query({
            query: () => 'races'
        }),
    })
})

export const { useGetDriversQuery, useGetTracksQuery, useGetRacesQuery } = api