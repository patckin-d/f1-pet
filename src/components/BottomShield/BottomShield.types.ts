import type { DriverType } from "../../views/Drivers/Drivers.types"

export type BottomShieldProps = {
    drivers: DriverType[],
    onDelete?: (driverId: number) => void
} 