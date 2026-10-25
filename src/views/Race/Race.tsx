import { NavLink, useParams } from "react-router";
import { RACE_RESULTS } from "./Race.constants";
import { useAppSelector } from "../../store/store.types";

export function Race () {
    let params = useParams();
    const race = RACE_RESULTS[params.race as string]
    const selectedDrivers = useAppSelector(state => state.main.selectedDrivers)

    //   const load = () => {
    // fetch(`https://v1.formula-1.api-sports.io/rankings/races?race=${params.race}`, {
    //   "method": "GET",
    //   "headers": {
    //     "x-apisports-key": "76d8ab3d9c52c898d4f2107e21beaa4b"
    //   }
    // })
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(err => {
    //   console.log(err);
    // });
//   }
    return (
        <div style={{display: 'flex'}}>
        <div>
            <h1>Results:</h1>
            <div>
                {
                    race.map((r) => {
                        return <div style={{display: 'flex', marginBottom: 10}}>
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
            <h1>0/3</h1>
        </div>
        <NavLink to="/races">Next</NavLink>
        </div>
    )
}