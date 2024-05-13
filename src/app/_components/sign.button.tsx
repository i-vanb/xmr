import {Button} from "@/components/ui/button";
import {auth, signIn, signOut} from "@/auth";
import Link from "next/link";

export const SignButton = () => {
  return (
    <Link href={'/login'}>
      <Button>Log In</Button>
    </Link>
  )
}


export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  )
}