const getTicketById = async (id) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
    // Para especificar cuánto tiempo mantener caching, en este caso 60 segs
    next: { revalidate: 60 },
  })
  if (!res.ok) {
    throw new Error()
  }
  return res.json()
}

const getUserById = async (id) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id)
  if (!res.ok) {
    throw new Error()
  }
  return res.json()
}

export default async function TicketPage({ params }) {
  const ticket = await getTicketById(params.id)
  const user = await getUserById(ticket.userId)
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <div className="flex flex-col px-3 gap-1">
          <small>Created by {user.name}</small>
          <small>Email: {user.email}</small>
          <small>Company: {user.website}</small>
        </div>
        <p>{ticket.body}</p>
        {/* <div className={`pill ${ticket.priority}`}>{ticket.priority} priority</div> */}
      </div>
    </main>
  )
}
