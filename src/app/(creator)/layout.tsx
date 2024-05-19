import {ReactNode} from "react";
import {Container} from "@/components/layout/Container";
import {Navigation} from "@/components/navigation";
import {Logo} from "@/components/logo";
import {Toaster} from "@/components/ui/sonner";
import {ProfileImage} from "@/app/_components/profile.image";
import {redirect} from "next/navigation";
import getSelection from "@/lib/getSession";
import {LangSwitcher} from "@/app/_components/lang.button";

export default async function DashboardLayout({children}: {
  children: ReactNode
}) {
  const session = await getSelection()
  const user = session?.user
  if(!user) redirect("/api/auth/signin?callbackUrl=/dashboard")

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-20 h-[80px] flex items-center mb-6">
        <Container className="flex-1">
          <div className="header flex items-center justify-between">
            <Logo path={"/dashboard"}/>
            <Navigation />
            <div className="flex items-center gap-4">
              <LangSwitcher />
              <ProfileImage
                image={session?.user?.image || null}
                name={session?.user?.name || undefined}
              />
            </div>
          </div>
        </Container>
      </header>
      <section className="mb-16">
        <Container>{children}</Container>
      </section>
      <Toaster richColors={true}/>
    </>
  )
}