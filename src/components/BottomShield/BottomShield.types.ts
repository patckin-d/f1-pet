import type { DriverType } from "../../App.types"

export type BottomShieldProps = {
    drivers: DriverType[],
    onDelete?: (driverId: number) => void
} 