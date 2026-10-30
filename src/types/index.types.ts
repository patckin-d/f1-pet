export interface DriverType {
    id: number
    name: string
    abbr: string | null
    image: string
    nationality: string
    country: {
        name: string
        code: string
    }
    birthdate: string
    birthplace: string
    number: number
    grands_prix_entered: number
    world_championships: number
    podiums: number
    highest_race_finish: {
        position: number
        number: number
    }
    highest_grid_position: number
    career_points: string
    teams: {
            season: number
            team: {
                id: number | null
                name: string | null
                logo: string | null
            }
        }[]
}

export interface RaceResult {
    race: {
        id: number
    },
    driver: {
        id: number,
        name: string,
        abbr: string | null,
        number: number,
        image: string
    },
    team: {
        id: number,
        name: string,
        logo: string
    },
    position: number | null,
    time: string | null,
    laps: number,
    grid: string,
    pits: number,
    gap: string | null
}

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