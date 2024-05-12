import {Container} from "@/components/layout/Container";
import {Logo} from "@/components/logo";
import {Navigation} from "@/components/navigation";
import {SignButton} from "@/app/_components/sign,button";
import {auth} from "@/auth";


export default function Home() {
  const session = auth()

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-20 h-[80px] flex items-center mb-6">
        <Container className="flex-1">
          <div className="header flex items-center justify-between">
            <Logo path={"/"}/>
            <div>
              <SignButton/>
            </div>
          </div>
        </Container>
      </header>
      <main>
        <h1>Home</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </main>
    </>
  )
    ;
}
