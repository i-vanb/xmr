import {TestEditor} from "@/app/(creator)/_components/TestCreator";
import {getTestById} from "@/lib/db/test";

export default async function Page({params: {id}}: {params: {id: string}}) {
  const test = await getTestById(id)
  if(!test) return <div>Test not found</div>

  return (
    <TestEditor id={id} name={test.title} description={test.description} />
  );
}