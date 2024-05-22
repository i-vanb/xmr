'use client'
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";

type Props = {
  test?: any
  link?: any
  mode?: 'demo' | 'test'
}

export const TestProcess = ({test, link, mode = 'test'}: Props) => {
  const [state, setState] = useState({
    currentQuestion: 0,
    answers: new Array(test.questions.length),
    currentAnswer: '',
    isStarted: false,
    isFinished: false
  })
  const isAnswerChosen = state.answers[state.currentQuestion]
  const isAnswered = state.answers[state.currentQuestion] && !state.currentAnswer

  console.log(isAnswerChosen)

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
    setState(prevState => ({
      ...prevState,
      currentQuestion: prevState.currentQuestion + 1,
      currentAnswer: ''
    }))
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

  if(!state.isStarted) {
    return(
      <div>
        <Button onClick={startTest}>Start test{mode === 'demo' ? ' (demo)' : ''}</Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="font-bold">Question {state.currentQuestion+1}</h3>
        <p>{test.questions[state.currentQuestion].text}</p>
      </div>
      <RadioGroup onValueChange={chooseAnswer} className="flex flex-col items-center justify-around gap-6 md:flex-row mb-8">
        {test.questions[state.currentQuestion].answers.map((answer: any) => (
          <div key={answer.id} className="cursor-pointer">
            <RadioGroupItem disabled={isAnswered} value={answer.id} id={answer.id} />
            <label className="cursor-pointer ml-2" htmlFor={answer.id}>{answer.text}</label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex flex-col items-center gap-6 md:flex-row">
          <Button disabled={isAnswered} onClick={answerQuestion}>Answer</Button>
          <Button disabled={isAnswered} onClick={skipQuestion}>Skip</Button>
          <Button disabled={!isAnswerChosen} onClick={nextQuestion}>Next</Button>
      </div>
    </div>
  )
}