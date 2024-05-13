import {Container} from "@/components/layout/Container";
import {Logo} from "@/components/logo";
import {SignButton} from "@/app/_components/sign.button";
import {auth} from "@/auth";
import {ProfileImage} from "@/app/_components/profile.image";
import getSelection from "@/lib/getSession"


export default async function Home() {
  const session = await getSelection()
  const homePath = session?.user ? "/dashboard" : "/"

  return (
    <>
      <header className="bg-white shadow sticky top-0 z-20 h-[80px] flex items-center mb-6">
        <Container className="flex-1">
          <div className="header flex items-center justify-between">
            <Logo path={homePath}/>
            <div>
              {session?.user
                ? <ProfileImage
                    image={session?.user?.image || null}
                    name={session?.user?.name || undefined}
                />
                : <SignButton/>
              }
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
