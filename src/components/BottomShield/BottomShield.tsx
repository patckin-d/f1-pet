import { NavLink, useParams } from "react-router"
import styles from "./BottomShield.module.css"
import type { BottomShieldProps } from "./BottomShield.types"

export function BottomShield ({
    drivers,
    onDelete
}: BottomShieldProps) {
    const params = useParams()

    return (
        <div className={styles.bottomShield}>
            { drivers.map((d, index) => {
                return (
                    <div className={styles.bottomDriver} key={d.id}>
                        {index + 1}
                        <div className={styles.bottomDriverInfo}>
                            <button className={styles.delete} onClick={() => onDelete?.(d.id)}>X</button>
                            <img className={styles.driverImage} src={d.image} />
                        </div>
                    </div>
                )
            })
            }

            { drivers.length === 3 && <NavLink to={`/races/${params.race}/result`}>Play</NavLink>}
        </div>
    )
}