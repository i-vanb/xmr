'use client'
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import { Switch } from "@/components/ui/switch"

import {useRouter} from "next/navigation";
import {useFormState} from "react-dom";
import {createTestAction} from "@/actions/test";
import {useEffect} from "react";
import {toast} from "sonner";
import Link from "next/link";

type Props = {
  name?: string
  description?: string
  id?: string
  isTimer?: boolean
  timerByQuestion?: boolean
  timer?: number
  showRightAnswer?: boolean
  showResults?: boolean
}

export const TestEditor = ({name, description, id, isTimer, timerByQuestion, timer, showRightAnswer, showResults}:Props) => {
  const [state, formAction] = useFormState(createTestAction, {
    message: ""
  })
  const router = useRouter()
  const pageTitle = id ? "EDIT TEST" : "CREATE TEST"
  const linkBack = id ? `/dashboard/test/${id}` : "/dashboard"
  console.log('isTimer',isTimer)
  useEffect(()=> {
    if(state.success == true) {
      toast.success(state.message)
      router.replace(state.id ? `/dashboard/test/${state.id}` : "/dashboard")
    } else if(state.success == false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form className="max-w-[600px]" action={formAction}>
      {id && <input type="hidden" name="id" value={id}/> }
      <h1 className="mb-3 font-bold text-xl">{pageTitle}</h1>
      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="md:flex-1">
          <div className="space-y-5">
            <div>
              <label className="mb-3 block" htmlFor="title">Name</label>
              <Input type="text" id="title" name="title" defaultValue={name}/>
            </div>
            <div>
              <label className="mb-3 block"
                     htmlFor="description">Description</label>
              <Textarea id="description" name="description" defaultValue={description}/>
            </div>
            <div>
              <label className="mb-3 block" htmlFor="is timer on">Timer On</label>
              <Switch id="isTimer" name="isTimer" defaultChecked={isTimer}/>
            </div>
            <div>
              <label className="mb-3 block" htmlFor="is timer by question">Timer by question</label>
              <Switch id="timerByQuestion" name="timerByQuestion" defaultChecked={timerByQuestion}/>
            </div>
            <div>
              <label className="mb-3 block" htmlFor="Timer (sec)">Timer (sec)</label>
              <Input type="text" id="timer" name="timer" defaultValue={timer}/>
            </div>
            <div>
              <label className="mb-3 block" htmlFor="is timer by question">Show right answer</label>
              <Switch id="showRightAnswer" name="showRightAnswer" defaultChecked={showRightAnswer}/>
            </div>
            <div>
              <label className="mb-3 block" htmlFor="show results">Show results</label>
              <Switch id="showResults" name="showResults" defaultChecked={showResults}/>
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" className="flex-1">Save</Button>
              <Link className="flex-1" href={linkBack}>
                <Button className="w-full">Cancel</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}