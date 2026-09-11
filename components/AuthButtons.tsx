"use client"

import { BadgePlus, Loader, LogOut } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"


const AuthButtons = () => {

    const {data: session, status} = useSession()
    const isAuthinticated = status === "authenticated"

  return (
    <div className="flex items-center gap-5 text-black min-h-10">
        {isAuthinticated && session?.user ? (
          <>
            <Link href="/startup/create" >
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
            </Link>
            <button
            type="button"
            onClick={() => signOut({callbackUrl: "/"})}
            >
               <span className="max-sm:hidden">Logout</span>
               <LogOut className="size-6 text-red-500 sm:hidden" />
            </button>

            <Link href={`/user/${session.user.id}`}>
              <Avatar className="size-10">
                <AvatarImage
                src={session.user.image ?? ""}
                alt={session.user.name ?? "User"}
                />
                 <AvatarFallback>
                    {session.user.name?.charAt(0).toUpperCase() ?? "U"}
                  </AvatarFallback>
              </Avatar>
            </Link>
          </>
            )
            : 
            status !== "loading" ? (
              
              <button 
              type="button"
              onClick={() => signIn("github")}
              >
                Login
              </button>
            
          ): 
              null
        }
    </div>
  )
}

export default AuthButtons