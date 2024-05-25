import {getTestByLinkAction} from "@/actions/test";
import {TestView} from "@/app/(creator)/show/test/[id]/TestView";
import {TestProcess} from "@/app/_components/test.process";

export default async function page({params: params}: { params: { link: string } }) {
  // let test;
  // const link = await getLinkByPathAction(params.link)
  //
  // if(link) {
  //   test = await getTestByLink(link.id)
  // }

  const res = await getTestByLinkAction(params.link)

  console.log('\n\n', '!!!test', res, '\n\n','\n\n')

  if(!res) return <div>Test not found</div>

  return(
    <div>
      <TestProcess test={res.test} mode="test" link={res} />
    </div>
  )
}