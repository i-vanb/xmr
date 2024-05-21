'use client'
import Link from "next/link";
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";

type TestCardProps = {
  test: {
    id: string
    title: string
    description: string
    isTimer: boolean,
    timerByQuestion: boolean,
    timer: number,
    showRightAnswer: boolean,
    showResults: boolean,
    questions: Question[]
  }
}

type Question = {
  id: string,
  answers: Array<{ id: string}>
}

export const TestCard = ({test}:TestCardProps) => {
  const {id, title, description, questions, isTimer, timer,
    timerByQuestion, showResults, showRightAnswer } = test

  return (
    <Link href={`/dashboard/test/${id}`}>
      <Card title="" className="cursor-pointer hover:shadow">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm line-clamp-3">{description}</p>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs">Questions</div>
            <p className="text-xs">{questions.length}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs">Timer</div>
            <p className="text-xs">{isTimer ? 'Yes' : 'No'}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs">Duration</div>
            <p className="text-xs">{timer}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs">Timer by question</div>
            <p className="text-xs">{timerByQuestion ? 'Yes' : 'No'}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs">Show right answer</div>
            <p className="text-xs">{showRightAnswer ? 'Yes' : 'No'}</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs">Timer by question</div>
            <p className="text-xs">{showResults ? 'Yes' : 'No'}</p>
          </div>
        </CardContent>
        <CardFooter>
          {/*<div className="flex-1 text-xs font-bold">*/}
          {/*  <h4>Normal</h4>*/}
          {/*  <p>{"price"} {"currency"}</p>*/}
          {/*</div>*/}
          {/*<div className="flex-1 text-xs font-bold text-violet-600">*/}
          {/*  <h4>Premium</h4>*/}
          {/*  <p>{"premiumPrice"} {"currency"}</p>*/}
          {/*</div>*/}
        </CardFooter>
      </Card>
    </Link>
  )
}

export const AddCourseCard = () => {
  return (
    <Link href={"/create/test"} className="w-full">
      <Card title="" className="cursor-pointer hover:shadow h-[100%]">
        <CardContent className="p-6 flex flex-col h-[100%] justify-center items-center gap-4 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" fill="currentColor"
                  d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"/>
          </svg>
          <p className="text-sm">
            Create new Test
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
