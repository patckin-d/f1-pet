import styles from './Race.module.css'
import { RACE_LIST } from './Race.constants'
import { NavLink } from 'react-router'

function App() {

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
        <h1>Pick race:</h1>
        <div className={styles.races}>
            { RACE_LIST.map((r) =>{
            return (
                <NavLink to={`/races/${r.id}/drivers`} className={`${styles.race} ${styles.completed}`} key={r.id}>
                  <img src={r.circuit.image} />
                  <h1>{r.competition.name}</h1>
                </NavLink>
            )
            })
            }
        </div>
    </>
  )
}

export default App
