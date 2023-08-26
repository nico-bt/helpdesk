"use client"
import Link from "next/link"
import Image from "next/image"
import Logo from "./okFace.avif"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const path = usePathname()

  return (
    <nav>
      <div>
        <Image src={Logo} alt="Helpdesk logo" width={100} placeholder="blur" quality={100} />
        <h1>Helpdesk</h1>
      </div>

      <Link
        href="/"
        className={path == "/" ? "text-black font-bold underline underline-offset-2" : ""}
      >
        Dashboard
      </Link>

      <Link
        href="/tickets"
        className={path == "/tickets" ? "text-black font-bold underline underline-offset-2" : ""}
      >
        Tickets
      </Link>

      <Link
        href="/tickets/create"
        className={
          path == "/tickets/create" ? "text-black font-bold underline underline-offset-2" : ""
        }
      >
        New Ticket
      </Link>
    </nav>
  )
}
