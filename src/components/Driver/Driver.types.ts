export type DriverProps = {
    id: number;
    name: string;
    team: {
        id: number;
        name: string,
        logo: string
    };
    image: string,
    disable?: boolean,
    checked: boolean
    onChange?: (driverId: number, checked: boolean) => void
}