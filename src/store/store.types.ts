import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./main";
import type { DriverType } from "../types/index.types";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export interface CompetitionResult {
    drivers: DriverType[],
    score: number
}

export interface ResultPayload {
    raceId: number,
    result: CompetitionResult
}

export interface MainState {
    selectedDrivers: DriverType[],
    race: number,
    results: Record<number, CompetitionResult>
}

export interface AddDriverPayload {
    driverId: number,
    drivers: DriverType[]
}