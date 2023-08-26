import { NextResponse } from "next/server"
import { mockDatabase } from "../route"

// Simulando que el sample data viene de una api
//--------------------------------------------------
export async function GET(req, { params }) {
  //   const url = new URL(req.url)
  const id = params.id

  const ticket = mockDatabase.find((item) => item.id == id)

  if (!ticket) {
    return NextResponse.json({ errorMessage: "Not found any ticket with that id" }, { status: 400 })
  }

  return NextResponse.json(ticket)
}
