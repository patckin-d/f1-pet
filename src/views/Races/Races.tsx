import styles from './Races.module.css'
import { RACE_LIST } from './Races.constants'
import { NavLink } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/store.types'
import { useEffect } from 'react'
import { resetDrivers, setRace } from '../../store/main'
import { useScore } from '../../hooks/useScore'

export function Races() {
  const score = useScore()
  const dispatch = useAppDispatch()
  const race = useAppSelector(state => state.main.race)
  const results = useAppSelector(state => state.main.results)

  const completedClass = (raceId: number) => {
    if (results[raceId] !== undefined) return styles.completed
    return ''
  }

  const getScore = (raceId: number) => {
    if (results[raceId] !== undefined) return `${results[raceId].score} / 3`
    return null
  }

  useEffect(() => {
    dispatch(resetDrivers())
  }, [])

  const nextRace = () => {
    if (results[race] === undefined) return
  
    const index = RACE_LIST.findIndex((r) => r.id === race)
    const next = RACE_LIST[index + 1]
    if (next) dispatch(setRace(next.id))
  }

  useEffect(() => {
    nextRace()
  }, [])

  // const load = () => {
  //   fetch("https://v1.formula-1.api-sports.io/races?season=2024&type=race", {
  //     "method": "GET",
  //     "headers": {
  //       "x-apisports-key": "76d8ab3d9c52c898d4f2107e21beaa4b"
  //     }
  //   })
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // }


  return (
    <>

        <h1>Your score: {score}</h1>
        <h1>Pick race:</h1>
        <div className={styles.races}>
            { RACE_LIST.map((r) =>{
            return (
                <NavLink to={`/races/${r.id}/drivers`} className={`${styles.race} ${race !== r.id ? styles.disabled : ''} ${completedClass(r.id)}`} key={r.id}>
                  <img src={r.circuit.image} />
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <h1>{r.competition.name}</h1>
                    <div>{getScore(r.id)}</div>
                  </div>
                </NavLink>
            )
            })
            }
        </div>
    </>
  )
}
