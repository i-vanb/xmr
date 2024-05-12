import {ReactNode} from "react";
import {Container} from "@/components/layout/Container";
import {Navigation} from "@/components/navigation";
import {Logo} from "@/components/logo";
import {Toaster} from "@/components/ui/sonner";
import {SignButton} from "@/app/_components/sign,button";
import {auth} from "@/auth";

export default async function DashboardLayout({children}: {
  children: ReactNode
}) {
  const session = await auth()
  if (!session) return <div>Not authenticated</div>

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-20 h-[80px] flex items-center mb-6">
        <Container className="flex-1">
          <div className="header flex items-center justify-between">
            <Logo path={"/dashboard"}/>
            <Navigation/>
            <div>
              <SignButton />
            </div>
          </div>
        </Container>
      </header>
      <section>
        <Container>{children}</Container>
      </section>
      <Toaster richColors={true}/>
    </>
  )
}