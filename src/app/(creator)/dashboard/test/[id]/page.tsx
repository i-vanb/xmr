import {getTestById} from "@/lib/db/test";
import Link from "next/link";
import {AddQuestion} from "@/app/(creator)/_components/AddQuestion";
import {Button} from "@/components/ui/button";
import {RemoveTest} from "@/app/(creator)/_components/RemoveTest";
import {ReactNode} from "react";

export default async function Page({params: {id}}: { params: { id: string } }) {
  const test = await getTestById(id)

  if(!test) return <div>Test not found</div>

  const SettingBadge = ({isOn, isAvailable = true, children}:{children:ReactNode, isOn:boolean, isAvailable?:boolean}) => {
    let colorClass = isOn && isAvailable ? 'bg-lime-200 text-lime-800' : 'bg-gray-200 text-gray-800'

    return(
      <span className={`inline-block px-2 py-1 rounded-xl text-sm font-bold ml-2 ${colorClass}`}>{children}</span>
    )
  }

  return (
    <main className="space-y-4">
      <section className="flex items-center justify-between gap-6">
        <h1 className="mb-3 font-bold text-xl">{test.title}</h1>
        <div className="flex items-center gap-4">
          <Link href={`/show/test/${id}`} className="hover:underline">View</Link>
          <Link href={`/edit/test/${id}`} className="hover:underline">Edit</Link>
          <RemoveTest id={test.id} title={test.title}/>
        </div>
      </section>
      <section>
        <p><span className="text-sm font-bold">Time limit</span>
          <SettingBadge isOn={test.isTimer}>
            {test.isTimer ? 'yes' : 'no'}
          </SettingBadge>
        </p>
      </section>
      <section>
        <p className={!test.isTimer ? 'text-gray-300' : ''}>
          <span className="text-sm font-bold">Timer by question</span>
          <SettingBadge isOn={test.timerByQuestion} isAvailable={test.isTimer}>{test.timerByQuestion ? 'yes' : 'no'}</SettingBadge>
        </p>
        {!test.isTimer && <span className="text-sm text-gray-300">Option is available if timer is on</span>}
      </section>
      <section>
        <p className={!test.isTimer ? 'text-gray-300' : ''}>
          <span className="text-sm font-bold">Limit for test</span>
          <SettingBadge isOn={!!test.timer} isAvailable={test.isTimer}>{test.timer}</SettingBadge>
        </p>
        {!test.isTimer && <span className="text-sm text-gray-300">Option is available if timer is on</span>}
      </section>
      <section>
        <p>
          <span className="text-sm font-bold">Show right answer after each question?</span>
          <SettingBadge isOn={test.showRightAnswer}>{test.showRightAnswer ? 'yes' : 'no'}</SettingBadge>
        </p>
      </section>
      <section className="pb-4">
        <p>
          <span className="text-sm font-bold">Show results after test finished?</span>
          <SettingBadge isOn={test.showResults}>{test.showResults ? 'yes' : 'no'}</SettingBadge>
        </p>
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