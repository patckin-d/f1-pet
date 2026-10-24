import styles from "./BottomShield.module.css"
import type { BottomShieldProps } from "./BottomShield.types"

export function BottomShield ({
    drivers,
    onDelete
}: BottomShieldProps) {
    return (
        <div className={styles.bottomShield}>
            { drivers.map((d, index) => {
                return (
                    <div className={styles.bottomDriver}>
                        {index + 1}
                        <div className={styles.bottomDriverInfo}>
                            <button className={styles.delete} onClick={() => onDelete?.(d.id)}>X</button>
                            <img className={styles.driverImage} src={d.image} />
                        </div>
                    </div>
                )
            })
            }

            { drivers.length === 3 && <button>Play</button>}
        </div>
    )
}