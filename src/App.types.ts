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