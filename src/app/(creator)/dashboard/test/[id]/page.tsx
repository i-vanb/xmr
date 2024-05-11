import {getTestById} from "@/lib/db/test";
import Link from "next/link";
import {AddQuestion} from "@/app/(creator)/_components/AddQuestion";
import {Button} from "@/components/ui/button";
import {RemoveTest} from "@/app/(creator)/_components/RemoveTest";

export default async function Page({params: {id}}: { params: { id: string } }) {
  const test = await getTestById(id)

  if(!test) return <div>Test not found</div>

  return (
    <main className="space-y-4">
      <section className="flex items-center justify-between gap-6">
        <h1 className="mb-3 font-bold text-xl">{test.title}</h1>
        <div className="flex items-center gap-4">
          <Link href={`/edit/test/${id}`} className="hover:underline">Edit</Link>
          <RemoveTest id={test.id} title={test.title}/>
        </div>
      </section>
      <section>
        <p>{test.description}</p>
      </section>
      <section className="space-y-4">
        <h2>Questions</h2>
        <AddQuestion test_id={id} />
        <ul>
          {test.questions.map((question, index) => (
            <li key={question.id} className="p-6 border rounded my-2">
              <h3 className="mb-2">{index + 1}. {question.text}</h3>
              <ul className="">
                {question.answers.map(option => (
                  <li key={option.id} className={`mb-2 rounded px-6 py-2 ${option.isCorrect ? "bg-green-200" : "bg-gray-100"}`}>
                    {option.text}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}