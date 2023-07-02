
import '../App.css'
import Trend from '../components/Trend/Trend.jsx'
import { useParams } from "react-router-dom"


export function PlayerProfile() {
	const { id } = useParams() 
	return (
			<div>
				<h1 className="my-8 text-3xl font-bold underline">Player Profile</h1>
				<Trend />
			</div>
		)


}