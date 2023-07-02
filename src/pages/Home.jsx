import { useState } from 'react'
import '../App.css'
import Table from '../components/Table/Table.jsx'
import { Link } from "react-router-dom"



export function Home() {

  return (
        <div>
          <h1 className="my-8 text-3xl font-bold underline">Relative Floor Rank</h1>
          <Table />
        </div>
  )
}
