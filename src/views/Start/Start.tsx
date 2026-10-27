import { NavLink } from "react-router";
import { useAppDispatch } from "../../store/store.types";
import { resetResults } from "../../store/main";

export function Start() {
    const dispatch = useAppDispatch()

    const reset = () => {
        dispatch(resetResults())
    }

    return (
        <div>
            <NavLink to="/races">Start</NavLink>
            <br />
            <button onClick={reset}>Reset</button>
        </div>
    )
}