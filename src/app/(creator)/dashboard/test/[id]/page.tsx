import {getTestById} from "@/lib/db/test";
import Link from "next/link";
import {RemoveTest} from "@/app/(creator)/_components/RemoveTest";
import {ReactNode} from "react";
import {QuestionList} from "@/app/(creator)/_components/QuestionList";
import {LinkSheet} from "@/app/_components/links.sheet";
import {getStudents} from "@/actions/students";

export default async function Page({params: {id}}: { params: { id: string } }) {
  const test = await getTestById(id)
  const students = await getStudents()

  if (!test) return <div>Test not found</div>

  const SettingBadge = ({isOn, isAvailable = true, children}: {
    children: ReactNode,
    isOn: boolean,
    isAvailable?: boolean
  }) => {
    let colorClass = isOn && isAvailable ? 'bg-blue-500 text-white' : 'bg-gray-200 text-white'

    return (
      <span className={`inline-block px-2 py-1 rounded-xl text-sm font-bold ml-2 ${colorClass}`}>{children}</span>
    )
  }

  return (
    <main className="space-y-4">
      <section className="items-center justify-between gap-6 md:flex">
        <h1 className="mb-3 font-bold text-xl">{test.title}</h1>
        <div className="flex items-center gap-4 text-sm font-bold">
          <LinkSheet links={test.links} students={students} testId={id}/>
          <Link href={`/show/test/${id}`} className="hover:text-blue-400">View</Link>
          <Link href={`/edit/test/${id}`} className="hover:text-blue-400">Edit</Link>
          <RemoveTest id={test.id} title={test.title}/>
        </div>
      </section>
      <section>
        <h2>Description</h2>
        <p>{test.description}</p>
      </section>
      <section className="p-4 border rounded">
        <h1 className="text-lg font-bold">Settings</h1>
        <div>
          <p>
            <span className="text-sm font-bold">Time limit</span>
            <SettingBadge isOn={test.isTimer}>
              {test.isTimer ? 'yes' : 'no'}
            </SettingBadge>
          </p>
        </div>
        <div>
          <p className={!test.isTimer ? 'text-gray-300' : ''}>
            <span className="text-sm font-bold">Timer by question</span>
            <SettingBadge isOn={test.timerByQuestion}
                          isAvailable={test.isTimer}>{test.timerByQuestion ? 'yes' : 'no'}</SettingBadge>
          </p>
          {!test.isTimer && <span className="text-sm text-gray-300">Option is available if timer is on</span>}
        </div>
        <div>
          <p className={!test.isTimer ? 'text-gray-300' : ''}>
            <span className="text-sm font-bold">Limit for test</span>
            <SettingBadge isOn={!!test.timer} isAvailable={test.isTimer}>{test.timer}</SettingBadge>
          </p>
          {!test.isTimer && <span className="text-sm text-gray-300">Option is available if timer is on</span>}
        </div>
        <div>
          <p>
            <span className="text-sm font-bold">Show right answer after each question?</span>
            <SettingBadge isOn={test.showRightAnswer}>{test.showRightAnswer ? 'yes' : 'no'}</SettingBadge>
          </p>
        </div>
        <div>
          <p>
            <span className="text-sm font-bold">Show results after test finished?</span>
            <SettingBadge isOn={test.showResults}>{test.showResults ? 'yes' : 'no'}</SettingBadge>
          </p>
        </div>
      </section>
      <section className="space-y-4">
        <h2>Questions</h2>
        <QuestionList list={test.questions} id={id}/>
      </section>
    </main>
  );
}