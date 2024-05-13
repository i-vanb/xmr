import {Button} from "@/components/ui/button";
import {auth, signIn, signOut} from "@/auth";

export const SignButton = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <Button>Log in</Button>
    </form>
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