import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from 'react-redux'

import { Drivers } from './views/Drivers/Drivers.tsx'
import { Races } from './views/Races/Races.tsx'
import { Start } from './views/Start/Start.tsx'
import { Race } from './views/Race/Race.tsx'

import { store } from './store/main.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/races" element={<Races />} />
          <Route path="/races/:race/drivers" element={<Drivers />} />
          <Route path="/races/:race/result" element={<Race />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
