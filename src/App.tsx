import { useEffect, useState } from 'react'
import styles from './drivers.module.css'
import { Driver } from './components/Driver/Driver'
import type { DriverType } from './App.types'
import { DRIVERS_LIST } from './App.constants'
import { BottomShield } from './components/BottomShield/BottomShield'

function App() {

  const [selectedDrivers, setSelecctedDrivers] = useState<DriverType[]>([])

  const deleteDriver = (driverId: number) => {
    

    setSelecctedDrivers((old) => {
        return old.filter(d => d.id !== driverId)
    })
  }

  const handleChange = (driverId: number, checked: boolean) => {
      if (checked) {
        if (selectedDrivers.length === 3 ) return
        const driver = DRIVERS_LIST.find((d) => d.id === driverId )
        driver && setSelecctedDrivers((old) => [
            ...old,
            driver
        ])
    } else {
        deleteDriver(driverId)
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

export default App
