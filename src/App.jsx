import { useState } from 'react'
import './App.css'
import Table from './components/Table/Table.jsx'
import Trend from './components/Trend/Trend.jsx'
import { NavLink, Link, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { ReportList } from "./pages/ReportList"
import { PlayerProfile } from "./pages/PlayerProfile"
import { RookieWatch } from "./pages/RookieWatch"
import { RisersFallers } from "./pages/RisersFallers"
import { NotFound } from "./pages/NotFound"
import { AnalyticsLayout } from './AnalyticsLayout'



function App() {
  return (
      <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/analytics">Analytics</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<AnalyticsLayout />}>
            <Route index element={<ReportList />} />
            <Route path=":id" element={<PlayerProfile />} />
            <Route path="rookiewatch" element={<RookieWatch />} />
            <Route path="risersfallers" element={<RisersFallers />} />
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Routes>
      </>
  )
}

export default App






