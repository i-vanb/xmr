import {getTestList, getTestListWithCounts} from "@/lib/db/test";
import Link from "next/link";

export default async function Dashboard() {
  const userId = "clw0mlqh10000xkmntihx7qfw"
  const testList = await getTestListWithCounts(userId)
  console.log(testList)

  return (
    <section className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {testList.map(test => {
        return (
          <Link key={test.id} href={`/dashboard/test/${test.id}`}>
            <div className="p-6 border rounded cursor-pointer hover:bg-cyan-50 hover:border-cyan-200 transition">
              <h3 className="mb-2 font-bold">{test.title}</h3>
              <p className="text-sm">{test.description}</p>
              <p className="text-sm">Questions: {test.questions.length}</p>
            </div>
          </Link>
        )
      })}
    </section>
  );
}