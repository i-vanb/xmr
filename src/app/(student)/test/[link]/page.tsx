import {getTestByLinkAction} from "@/actions/test";
import {TestProcess} from "@/app/_components/test.process";
import {Container} from "@/components/layout/Container";
import {Logo} from "@/components/logo";
import {LangSwitcher} from "@/app/_components/lang.button";
import {Footer} from "@/app/_components/footer";
import {Toaster} from "@/components/ui/sonner";

export default async function page({params: params}: { params: { link: string } }) {
  const res = await getTestByLinkAction(params.link)

  if(!res) return <div>Test not found</div>

  const link = {
    id: res.id,
    testId: res.testId,
    studentId: res.studentId,
    path: res.path,
    name: res.name,
    active: res.active,
    student: {
      id:'',
      name: res.name,
      email: ''
    }
  }

  return(
    <>
      <header className="bg-white shadow sticky top-0 z-20 min-h-[80px] h-[80px] flex items-center mb-6">
        <Container className="flex-1">
          <div className="header flex items-center justify-between">
            <Logo path={"/"}/>
            <div className="flex items-center gap-4">
              <LangSwitcher />
              <div>{res.name}</div>
            </div>
          </div>
        </Container>
      </header>
      <section className="mb-16 flex-1">
        <Container>
          <TestProcess test={res.test} mode="test" link={link} />
        </Container>
      </section>
      <Footer mainPath={"/"} />
      <Toaster richColors={true}/>
    </>
  )
}