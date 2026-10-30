import type { DriverType } from "../../types/index.types"

export type BottomShieldProps = {
    drivers: DriverType[],
    onDelete?: (driverId: number) => void
} 