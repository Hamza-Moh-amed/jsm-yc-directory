
import Image from "next/image"
import Link from "next/link"
import AuthButtons from "./AuthButtons"

const Navbar = () => {
  return (
    <header className="bg-white px-5 py-3 shadow-sm font-work-sans">
        <nav className="flex items-center justify-between">
          <Link href="/"
          >
          <Image
          src="/logo.png"
          alt="Logo"
          width={144}
          height={30}
          loading="eager"
          className="w-36 h-7.5"
          />
          </Link>
           <AuthButtons />
        </nav>
    </header>
  )
}

export default Navbar