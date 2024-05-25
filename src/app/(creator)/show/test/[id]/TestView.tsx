'use client'
import {EditTestProps} from "@/lib/db/test";
import {LinkSheet} from "@/app/_components/links.sheet";
import {TestProcess} from "@/app/_components/test.process";


export type Props = {
  test: {
    questions: Array<Question>
    links: Array<LinkTest>
  } & EditTestProps
  students: {
    id: string
    name: string
  }[]
}

export type Question = {
  id: string
  text: string
  answers: {
    id: string
    text: string
  }[]
}

export type LinkTest = {
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
      <h3 className="text-sm">This is how students will see you test</h3>
      <p></p>
      <section className="flex justify-end">
        <LinkSheet links={links} students={students} testId={id}/>
      </section>
      <section>
        <h1 className="font-bold text-center">{title}</h1>
      </section>
      <TestProcess test={test} mode="demo" />
    </div>
  )
}
