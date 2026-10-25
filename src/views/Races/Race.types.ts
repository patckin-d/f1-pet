
export interface RaceType {
    id: number,
    competition: {
        id: number,
        name: string,
        location: {
            country: string,
            city: string
        }
    },
    circuit: {
        id: number,
        name: string,
        image: string
    },
    season: number,
    type: string,
    laps: {
        current: number | null,
        total: number
    },
    fastest_lap: {
        driver: {
            id: number
        },
        time: string
    },
    distance: string,
    timezone: string,
    date: string,
    weather: string | null,
    status: string
}