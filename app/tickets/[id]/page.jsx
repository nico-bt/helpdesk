import { notFound } from "next/navigation"

const getTicketById = async (id) => {
  const res = await fetch("https://helpdesk-nico-bt.vercel.app/api/tickets/" + id, {
    // Para especificar cuánto tiempo mantener caching, en este caso 60 segs
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    notFound()
  }
  return res.json()
}

export default async function TicketPage({ params }) {
  const ticket = await getTicketById(params.id)

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
      </div>
    </main>
  )
}
