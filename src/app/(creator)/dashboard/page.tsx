import {getTestListWithCounts} from "@/lib/db/test";
import getSession from "@/lib/getSession";
import {AddCourseCard, TestCard} from "@/app/(creator)/_components/TestCard";

export default async function Dashboard() {
  const session = await getSession()
  if (!session?.user?.id) return null

  const {id} = session.user
  const testList = await getTestListWithCounts(id)

  return (
    <>
      <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <AddCourseCard />
        {testList.map(test => {
          return (
            <TestCard key={test.id} test={test} />
          )
        })}
        {!testList.length && <p>No tests found</p>}
      </section>
    </>
  );
}