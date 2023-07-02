import '../App.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export function NotFound() {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate('/')
		}, 2000)
	}, [])

	return (
				<h1 className="my-8 text-3xl font-bold underline">Page Not Found</h1>
		)
}