import Link from "next/link"
import Image from "next/image"
import Logo from "./okFace.avif"

export default function Navbar() {
  return (
    <nav>
      <div>
        <Image src={Logo} alt="Helpdesk logo" width={100} placeholder="blur" quality={100} />
        <h1>Helpdesk</h1>
      </div>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  )
}
