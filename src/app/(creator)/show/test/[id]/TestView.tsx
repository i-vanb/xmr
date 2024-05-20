'use client'
import {EditTestProps} from "@/lib/db/test";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {LinkSheet} from "@/app/_components/links.sheet";


type Props = {
  test: {
    questions: Array<Question>
    links: Array<LinkTest>
  } & EditTestProps
  students: {
    id: string
    name: string
  }[]
}

type Question = {
  id: string
  text: string
  answers: {
    id: string
    text: string
  }[]
}

type LinkTest = {
  id: string
  testId: string
  studentId: string
  path: string
  student: {
    id: string
    name: string
    email?: string
  }
}

export const TestView = ({test, students}: Props) => {
  const {
    id,
    title,
    description,
    timer,
    isTimer,
    timerByQuestion,
    showRightAnswer,
    showResults,
    questions,
    isActive,
    links
  } = test

  return (
    <div>
      <section className="flex justify-end">
        <LinkSheet links={links} students={students} testId={id}/>
      </section>
      <section>
        <h1 className="font-bold text-center">{title}</h1>
        <p className="my-4">{description}</p>
      </section>
      {questions.map((q, ind) => {
        return (
          <section key={q.id} className="border rounded-xl my-6 p-4">
            <h1 className="font-bold">Question {ind + 1}</h1>
            <h2 className="border-b pb-2 mb-4">{q.text}</h2>
            <RadioGroup className="md:flex justify-between py-2 px-6" defaultValue="option-one">
              {q.answers.map(j => {
                return (
                  <div key={j.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={j.id} id={j.id}/>
                    <Label htmlFor="option-four">{j.text}</Label>
                  </div>
                )
              })}
            </RadioGroup>
          </section>
        )
      })}
    </div>
  )
}
