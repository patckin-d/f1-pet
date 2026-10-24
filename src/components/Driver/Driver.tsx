import type { DriverProps } from "./Driver.types";
import styles from "./Driver.module.css"
import { useState, type ChangeEvent } from "react";

export function Driver({
    id,
    name,
    team,
    image,
    checked,
    disable = false,
    onChange
}: DriverProps) {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked
        if (checked && disable) return
        onChange?.(id, checked)
    }

    return (
        <label className={`${styles.driver} ${disable && !checked ? styles.disable : ''}`}>
            <div>
                <div className={styles.driverInfo}>
                    <img src={image} />
                    <div className={styles.name}>
                    <span>{name.split(' ')[0]}</span>
                    <span>{name.split(' ')[1]}</span>
                    </div>
                </div>

                <div className={styles.team}>
                    <img src={team.logo} />
                    {team.name}
                </div>
            </div>
            <input type="checkbox" onChange={handleChange} checked={checked} />
        </label>
    )
}