'use client'

import { Button } from "@/components/ui/button";
import {useState} from "react";
import {QuestionForm} from "@/app/(creator)/_components/QuestionForm";

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
      {show && <QuestionForm close={close} test_id={test_id} />}
    </div>
  )
}