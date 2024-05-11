import {ReactNode} from "react";
import Link from "next/link";
import {Container} from "@/components/layout/Container";
import {Navigation} from "@/components/navigation";
import {Logo} from "@/components/logo";
import {Toaster} from "@/components/ui/sonner";

export default function DashboardLayout({children}: {
  children: ReactNode
}) {
  return (
    <>
      <header className="bg-white shadow sticky top-0 z-20 h-[80px] flex items-center mb-6">
        <Container className="flex-1">
          <div className="header flex items-center justify-between">
            <Logo path={"/dashboard"}/>
            <Navigation/>
            <div>
              <Link href={"/"}>Logout</Link>
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