import {Button} from "@/components/ui/button";
import {auth, signIn} from "@/auth";

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