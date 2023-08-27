"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function LocalStorageTickets() {
  const [ticketsLocal, setTicketsLocal] = useState([])

  useEffect(() => {
    const actualLocal = localStorage.getItem("localTickets")
    if (!actualLocal) {
      return
    } else {
      setTicketsLocal(JSON.parse(actualLocal))
    }
  }, [])

  return ticketsLocal?.map((ticket) => (
    <div key={ticket.id} className="card my-5 transform transition duration-300 hover:scale-105">
      <h3>{ticket.title}</h3>
      <p>{ticket.body.length > 100 ? ticket.body.slice(0, 100) + "..." : ticket.body}</p>
      <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
    </div>
  ))
}
