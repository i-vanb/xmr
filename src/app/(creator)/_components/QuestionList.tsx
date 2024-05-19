'use client'
import {QuestionCard} from "@/app/(creator)/_components/QuestionCard";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {QuestionForm} from "@/app/(creator)/_components/QuestionForm";

type Props = {
  list: Question[]
  id: string
}

type Question = {
  id: string
  text: string
  answers: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}
type NewQuestion = {
  isNew?: boolean
}
export const QuestionList = ({id, list}:Props) => {
  const [current, setCurrent] =
    useState<Partial<Question> & NewQuestion | null>(null)
  const setHandler = (question:Question) => setCurrent(question)

  return(
    <>
      <div>
        {!current && <Button onClick={()=>setCurrent({isNew: true})}>Add Question</Button>}
        {current?.isNew && <QuestionForm close={()=>setCurrent(null)} test_id={id}/>}
      </div>
      <ul>
        {list.map((question, index) => {
          if(question.id === current?.id) {
            return <QuestionForm key={question.id} close={()=>setCurrent(null)} test_id={id} question={question}/>
          }
          
          return(
           <QuestionCard key={question.id} question={question} order={index + 1} setCurrent={setHandler} />
          )
        })}
      </ul>
    </>
  )
}