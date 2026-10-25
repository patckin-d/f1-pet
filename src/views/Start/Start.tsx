import { NavLink } from "react-router";

export function Start() {
    return (
        <div>
            <NavLink to="/races">Start</NavLink>
            <button>Reset</button>
        </div>
    )
}