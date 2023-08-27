"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import crypto from "crypto"

export default function CreateForm() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [priority, setPriority] = useState("low")
  const [isLoading, setIsLoading] = useState(false)
  const [emptyInputs, setEmptyInputs] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !body) {
      return setEmptyInputs(true)
    } else {
      setEmptyInputs(false)
    }

    setIsLoading(true)

    const newTicket = {
      id: window.crypto.randomUUID(),
      title,
      body,
      priority,
      user_email: "yo@mail.com",
    }

    const actualLocal = localStorage.getItem("localTickets")
    if (!actualLocal) {
      localStorage.setItem("localTickets", JSON.stringify([newTicket]))
    } else {
      const newLocal = [newTicket, ...JSON.parse(actualLocal)]
      localStorage.setItem("localTickets", JSON.stringify(newLocal))
    }
    router.push("/tickets")

    // No quiero armar db y no se puede mantener array en memoria en vercel con mockdb.push(),
    // Los nuevos items van a localStorage (lo de arriba) y desactivo el Link a individual items --> tickets/[id]
    //---------------------------------------------------------------------------------------------------------------------------
    // const res = await fetch("https://helpdesk-nico-bt.vercel.app/api/tickets", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(newTicket),
    // })

    // if (res.status === 201) {
    //   router.refresh()
    //   router.push("/tickets")
    // }
  }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      {emptyInputs && <div className="error">All fields are required</div>}

      <label>
        <span>Title:</span>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      </label>
      <label>
        <span>Body:</span>
        <textarea onChange={(e) => setBody(e.target.value)} value={body} />
      </label>
      <label>
        <span>Priority:</span>
        <select onChange={(e) => setPriority(e.target.value)} value={priority}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
    </form>
  )
}
