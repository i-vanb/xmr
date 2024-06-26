'use client'
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {MouseEvent, useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import {useFormState} from "react-dom";
import {editQuestion, createTestAction} from "@/actions/test";
import {toast} from "sonner";

const typesQuestion = [
  {id: "1", name: "One from many"},
  // {id: "2", name: "Several from many"},
  // {id: "3", name: "Enter the answer"},
]

type QuestionCardProps = {
  close: () => void
  test_id: string
  question?: {
    id: string
    text: string
    answers: Answer[]
  }
}

type Answer = {
  id?: string
  text: string
  isCorrect: boolean
}


export const QuestionForm = ({close, test_id, question}: QuestionCardProps) => {
  // @ts-ignore
  const [state, formAction] = useFormState(editQuestion, {
    message: "",
  })
  const [qType, setQType] = useState("1")

  useEffect(()=> {
    if(state.success == true) {
      toast.success(state.message)
      close()
    } else if(state.success == false) {
      toast.error(state.message)
    }
  }, [state])

  const setQuestionType = (t: string) => setQType(t)

  return (
    <form action={formAction}>
      <input type="hidden" name="testId" value={test_id}/>
      <div className="bg-white p-4 rounded-lg border space-y-4">
        <Label>Question</Label>
        <Input name="id" type="hidden" defaultValue={question?.id || ""}/>
        <Textarea name="text" defaultValue={question?.text || ""}/>
        <Select defaultValue="1" onValueChange={setQuestionType} name="question_type">
          <SelectTrigger className="w-[180px]">
            <SelectValue/>
          </SelectTrigger>
          <SelectContent>
            {typesQuestion.map(type => <SelectItem value={type.id} key={type.id}>{type.name}</SelectItem>)}
          </SelectContent>
        </Select>
        {qType === "1" && <OneFromMany answers={question?.answers} />}
        {qType === "2" && <SeveralFromMany />}
        {qType === "3" && <EnterTheAnswer />}
        <div className="max-w-[600px] flex items-center gap-4">
          <Button type="submit" className="flex-1">Save</Button>
          <Button onClick={close} className="flex-1">Cancel</Button>
        </div>
      </div>
    </form>
  )
}

type OneFromManyProps = {
  answers?: Answer[]
}

const OneFromMany = ({answers}:OneFromManyProps) => {
  const [options, setOptions] = useState<
    Array<{ id?:string, text: string, isCorrect: boolean }>
  >(answers || [])

  const addOption = () => {
    if(options.length >= 8) return toast.error("Max options count is 8")
    setOptions(prevState => [...prevState, {text: "", isCorrect: false}])
  }

  return (
    <div className="space-y-5">
      {options.map((option, index) => {
        return (
          <div key={index} className="space-y-2 max-w-[250px]">
            <Input name={`answers.${index}.text`} defaultValue={option?.text || ''} />
            <Input type="hidden" name={`answers.${index}.id`} defaultValue={option?.id} />
            <div className="flex items-center gap-4">
              <Label className="flex items-center gap-2 cursor-pointer">
                <Checkbox name={`answers.${index}.isCorrect`} defaultChecked={option?.isCorrect} />
                <span>Correct answer</span>
              </Label>
            </div>
          </div>
        )
      })}
      <div className="flex items-center gap-4">
        <Button type="button" onClick={addOption}>Add option</Button>
        <Button disabled={!options.length} type="button" onClick={() => setOptions(prevState => prevState.slice(0, -1))}>Remove option</Button>
      </div>
    </div>
  )
}

const SeveralFromMany = () => {
  return (
    <div>
      Several from many
    </div>
  )
}

const EnterTheAnswer = () => {
  return (
    <div>
      Enter the answer
    </div>
  )
}