import { NextResponse } from "next/server"
import { randomUUID } from "crypto"
import data from "./data.json"

// Simulando que el sample data viene de una api
//--------------------------------------------------
export const mockDatabase = data.tickets

export async function GET() {
  return NextResponse.json(mockDatabase)
}

export async function POST(req, res) {
  const { title, body, priority, user_email } = await req.json()

  if (!title || !body || !priority || !user_email) {
    return NextResponse.json({ errorMessage: "All inputs are required" }, { status: 400 })
  }

  const newTicket = { id: randomUUID(), title, body, priority, user_email }
  mockDatabase.unshift(newTicket)
  return NextResponse.json({ newTicket }, { status: 201 })
}
