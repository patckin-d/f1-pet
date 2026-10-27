import { NavLink, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/store.types";
import { useEffect, useState } from "react";
import { setResult } from "../../store/main";
import { useGetRacesQuery } from "../../store/api";

export function Race () {
    let params = useParams();
    const dispatch = useAppDispatch()
    const { data = [] } = useGetRacesQuery() 
    const race = data[0]?.[params.race as string]
    const selectedDrivers = useAppSelector(state => state.main.selectedDrivers)
    const [score, setScore] = useState<number>(0)

    const calculateResult = () => {
        let res = 0;

        for (let i = 0; i < 3; i++) {
            if (race?.[i].driver.id == selectedDrivers[i].id) res += 1
        }

        setScore(res)
    }

    useEffect(() => {
        calculateResult()
    }, [data])

    const saveResult = () => {
        dispatch(setResult({
            raceId: Number(params.race),
            result: {
                drivers: selectedDrivers,
                score: score
            }
        }))
    }

    return (
        <div style={{display: 'flex'}}>
        <div>
            <h1>Results:</h1>
            <div>
                {
                    race?.map((r) => {
                        return <div style={{display: 'flex', marginBottom: 10}} key={r.position}>
                            <h1>{r.position}.</h1>
                            <img src={r.driver.image} />
                        </div>
                    })
                }
            </div>
        </div>
        <div>
            <h1>Your pick:</h1>
            <div>
                {
                    selectedDrivers.map((d, index) => {
                        return <div style={{display: 'flex', marginBottom: 10}} key={d.id}>
                            <h1>{index + 1}.</h1>
                            <img src={d.image} />
                        </div>
                    })
                }
            </div>
            <h1>{score}/3</h1>
        </div>
        <NavLink onClick={saveResult} to="/races">Next</NavLink>
        </div>
    )
}