import { useState } from 'react'
import { Link, Outlet, useSearchParams } from "react-router-dom"


export function AnalyticsLayout() {
	const [searchParams, setSearchParams] = useSearchParams({ p: 'Nick Chubb' })
	const player = searchParams.get("p")
	return (
		<>
			<Link to="/analytics/playerprofile">Player Profile</Link>
			<br />
			<Link to="/analytics/rookiewatch">Rookie Watch</Link>
			<br />
			<Link to="/analytics/risersfallers">Risers & Fallers</Link>
			<br />
			<Link to={'/analytics/${player}'}>{player}</Link>
			<br />
			<input 
				type="text" 
				value={player} 
				onChange={ e => setSearchParams({ p: e.target.value })}/>
			<Outlet />
		</>
		)

}