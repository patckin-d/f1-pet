import { useAppSelector } from "../store/store.types"

export const useScore = () => {
    const results = useAppSelector(state => state.main.results)
    
    let score = 0;
    Object.entries(results).forEach(r => {
        score += r[1].score
    })

    return score
}