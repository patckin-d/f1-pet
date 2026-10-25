import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.module.css'
import App from './views/Drivers/App.tsx'
import Races from './views/Races/Races.tsx'
import { Start } from './views/Start/Start.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Race } from './views/Race/Race.tsx'
import { Provider } from 'react-redux'
import { store } from './store/main.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/races" element={<Races />} />
          <Route path="/races/:race/drivers" element={<App />} />
          <Route path="/races/:race/result" element={<Race />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
