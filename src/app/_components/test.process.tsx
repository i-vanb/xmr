'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {LinkTest, Question} from "@/app/(creator)/show/test/[id]/TestView";
import {EditTestProps} from "@/lib/db/test";
import {Timer} from "@/app/_components/timer";
import {ShowTimeInMin} from "@/lib/utils";
import {setResultsAction} from "@/actions/test";
import {toast} from "sonner";

type Props = {
  test: {
    questions: Array<Question>
  } & EditTestProps
  link?: LinkTest
  mode?: 'demo' | 'test'
}

export const TestProcess = ({test, link, mode = 'test'}: Props) => {
  console.log('TEST PROCESS',mode, test, link)
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: new Array(test.questions.length).fill(null),
    currentAnswer: '',
    isStarted: false,
    isFinished: mode === 'demo' ? false : (link?.active ? false : true),
    isTimeLeft: false
  })

  const isAnswerChosen = state.answers[state.currentQuestion]
  const isAnswered = state.answers[state.currentQuestion] && !state.currentAnswer

  const chooseAnswer = (answerId: string) => {
    setState(prevState => ({
      ...prevState,
      currentAnswer: answerId
    }))
  }

  const startTest = () => {
    setState(prevState => ({
      ...prevState,
      isStarted: true
    }))
  }

  const nextQuestion = () => {
    setState(prevState => {
      const nextQuestion = getNextQuestion(prevState.answers, prevState.currentQuestion)
      if(nextQuestion === -1) {
        return ({
          ...prevState,
          isFinished: true
        })
      }

      return ({
        ...prevState,
        currentQuestion: nextQuestion,
        currentAnswer: ''
      })
    }
  )}

  const getNextQuestion = (answered:Array<string|null>, current:number) => {
    let nextIndex = current+1
    let nextEl = answered[nextIndex]
    if(nextEl === null) return nextIndex
    if(nextEl === undefined) return answered.indexOf(null)

    for(let i = nextIndex; i<answered.length; i++) {
      if(answered[i] === null) return i
    }
    return answered.indexOf(null)
  }

  const answerQuestion = () => {
    setState(prevState => {
      const answers = prevState.answers
      answers[prevState.currentQuestion] = prevState.currentAnswer
      const newState = {
        ...prevState,
        answers,
        currentAnswer: ''
      }

      return newState
    })}

  const skipQuestion = () => {
    setState(prevState => ({
      ...prevState,
      currentQuestion: prevState.currentQuestion + 1,
      currentAnswer: ''
    }))
  }

  const timeLeft = () => {
    setState(prevState => ({
      ...prevState,
      isTimeLeft: true,
      isFinished: true
    }))
  }

  const endTest = async () => {
    if(mode === 'demo') {
      toast.success('Demo test is finished')
      return
    }

    const res = await setResultsAction({
      testId: test.id,
      linkId: link?.id || '',
      answers: state.answers.map((answer, index)=>{
        return({
          questionId: test.questions[index].id,
          answerId: answer
        })
      }),
      studentId: link?.student.id || '',
      studentName: link?.student.name || ''
    })

    if(!res.success) {
      return toast.error(res.message)
    }

    toast.success(res.message)
  }

  if(!state.isStarted && state.isFinished) {
    return(
      <div>
        <h1 className="text-center font-bold">{test.title}</h1>
        <p className="my-4">{test.description}</p>
        <p>
          You already passed this test
        </p>
      </div>
    )
  }


  if(!state.isStarted) {
    return(
      <div>
        <h1 className="text-center font-bold">{test.title}</h1>
        <p className="my-4">{test.description}</p>
        <div className="mb-8">
          {test.isTimer &&
              <h3>This test has time limit {ShowTimeInMin(test.timer)}{test.timerByQuestion ? ' for a question' : ''}</h3>}
        </div>
        <Button onClick={startTest}>Start test{mode === 'demo' ? ' (demo)' : ''}</Button>
      </div>
    )
  }

  return (
    <div>
    <div className="mb-8">
      {test.isTimer &&
        <div className="font-bold">
          {!state.isFinished && <Timer time={test.timer} onEnd={timeLeft} />}
        </div>
      }
      </div>
      {state.isFinished ? <h1 className="mb-8">Test is finished</h1> :
        <>
          <div className="mb-8">
            <h3 className="font-bold">Question {state.currentQuestion + 1}</h3>
            <p>{test.questions[state.currentQuestion].text}</p>
          </div>
          <RadioGroup disabled={state.isFinished} onValueChange={chooseAnswer}
                      className="flex flex-col items-center justify-around gap-6 md:flex-row mb-8">
            {test.questions[state.currentQuestion].answers.map((answer: any) => (
              <div key={answer.id} className="cursor-pointer">
                <RadioGroupItem disabled={isAnswered} value={answer.id} id={answer.id}/>
                <label className="cursor-pointer ml-2" htmlFor={answer.id}>{answer.text}</label>
              </div>
            ))}
          </RadioGroup>
        </>
      }
      <div className="flex flex-col items-center gap-6 md:flex-row">
          <Button disabled={isAnswered || state.isFinished} onClick={answerQuestion}>Answer</Button>
          <Button disabled={isAnswered || state.isFinished} onClick={nextQuestion}>Skip</Button>
          {state.isFinished
            ? <Button onClick={endTest}>Finish</Button>
            : <Button disabled={!isAnswerChosen} onClick={nextQuestion}>Next</Button>
          }
      </div>
    </div>
  )
}