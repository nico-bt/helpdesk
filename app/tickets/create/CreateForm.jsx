"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

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

    const newTicket = { title, body, priority, user_email: "yo@mail.com" }

    const res = await fetch("https://helpdesk-nico-bt.vercel.app/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    })

    if (res.status === 201) {
      router.refresh()
      router.push("/tickets")
    }
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
