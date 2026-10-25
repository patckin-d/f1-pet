export type DriverProps = {
    id: number;
    name: string;
    team: {
        id: number | null;
        name: string | null,
        logo: string | null
    };
    image: string,
    disable?: boolean,
    checked: boolean
    onChange?: (driverId: number, checked: boolean) => void
}