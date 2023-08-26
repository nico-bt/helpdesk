import Link from "next/link"
import { notFound } from "next/navigation"

const getTickets = async () => {
  const res = await fetch("https://helpdesk-nico-bt.vercel.app/api/tickets", {
    // Para especificar cuánto tiempo mantener caching
    next: { revalidate: 0 },
  })
  if (!res.ok) {
    notFound()
  }
  return res.json()
}

export default async function TicketList() {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket) => (
        <Link href={`/tickets/${ticket.id}`}>
          <div
            key={ticket.id}
            className="card my-5 transform transition duration-300 hover:scale-105"
          >
            <h3>{ticket.title}</h3>
            <p>{ticket.body.length > 100 ? ticket.body.slice(0, 100) + "..." : ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
          </div>
        </Link>
      ))}
      {tickets.length === 0 && <p className="text-center">There are no open tickets, yay!</p>}
    </>
  )
}
