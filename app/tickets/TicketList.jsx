import Link from "next/link"

const getTickets = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // Para especificar cuánto tiempo mantener caching, en este caso 60 segs
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error()
  }
  const tickets = await res.json()

  const ticketsWithPriority = tickets.map((ticket) => {
    const random = Math.random()
    let priority
    if (random <= 0.33) {
      priority = "low"
    }
    if (random > 0.33 && random <= 0.66) {
      priority = "medium"
    }
    if (random > 0.66) {
      priority = "high"
    }
    return { ...ticket, priority }
  })

  return ticketsWithPriority
}

export default async function TicketList() {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body}</p>
            <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && <p className="text-center">There are no open tickets, yay!</p>}
    </>
  )
}
