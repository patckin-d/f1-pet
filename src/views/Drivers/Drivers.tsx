import styles from './drivers.module.css'
import { Driver } from '../../components/Driver/Driver'
import { DRIVERS_LIST } from './Drivers.constants'
import { BottomShield } from '../../components/BottomShield/BottomShield'
import { addDriver, removeDriver } from '../../store/main'
import { useAppDispatch, useAppSelector } from '../../store/store.types'

export function Drivers() {

  const selectedDrivers = useAppSelector(state => state.main.selectedDrivers)
  const dispatch = useAppDispatch()

  const deleteDriver = (driverId: number) => {
    dispatch(removeDriver(driverId))
  }

  const handleChange = (driverId: number, checked: boolean) => {
      if (checked) {
        if (selectedDrivers.length === 3 ) return
        dispatch(addDriver(driverId))
    } else {
        dispatch(removeDriver(driverId))
    }
  }

  const handleDelete = (driverId: number) => {
    deleteDriver(driverId)
  }

  return (
    <>
        <h1>Pick your drivers:</h1>
        <div className={styles.drivers}>
            { DRIVERS_LIST.map((d) =>{
            return (
                <Driver
                    key={d.id}
                    id={d.id}
                    name={d.name}
                    team={d.teams[0].team}
                    image={d.image}
                    disable={selectedDrivers.length === 3}
                    checked={selectedDrivers.some(s => s.id === d.id)}
                    onChange={handleChange}
                />
            )
            })
            }
        </div>

        <BottomShield drivers={selectedDrivers} onDelete={handleDelete} />
    </>
  )
}