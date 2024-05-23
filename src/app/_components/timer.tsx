'use client'
import {useEffect, useState} from "react";
import {ShowTimeInMin} from "@/lib/utils";

type Props = {
  time: number
  onEnd: () => void
}

export const Timer = ({time, onEnd}: Props) => {
  const [count, setCount] = useState(time)

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(count - 1)
    }, 1000)
    if (count === 0) {
      clearInterval(timer)
      onEnd()
    }
    return () => {
      clearInterval(timer)
    }
  }, [count])

  return(
    <div>
      <h1>Timer {ShowTimeInMin(count)}</h1>
    </div>
  )
}