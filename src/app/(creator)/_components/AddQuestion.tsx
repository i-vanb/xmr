'use client'

import { Button } from "@/components/ui/button";
import {useState} from "react";
import {QuestionCard} from "@/app/(creator)/_components/QuestionCard";

type AddQuestionProps = {
  test_id: string
}
export const AddQuestion = ({test_id}:AddQuestionProps) => {
  const [show, setShow] = useState(false)

  const close = () => setShow(false)
  const open = () => setShow(true)

  return (
    <div>
      {!show && <Button onClick={open}>Add Question</Button>}
      {show && <QuestionCard close={close} test_id={test_id} />}
    </div>
  )
}