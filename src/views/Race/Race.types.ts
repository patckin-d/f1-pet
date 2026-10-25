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