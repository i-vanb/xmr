'use client'
import {useEffect, useState} from "react";
import {ShowTimeInMin} from "@/lib/utils";

type Props = {
  time: number
  onEnd: () => void
  stop: boolean
}

export const Timer = ({time, onEnd, stop}: Props) => {
  const [count, setCount] = useState(time)

  useEffect(() => {
    let timer: any
    if(stop) {
      clearInterval(timer)
      console.log('stop', count)
    }

    timer = setInterval(() => {
      setCount(count - 1)
    }, 1000)
    if (count === 0) {
      clearInterval(timer)
      onEnd()
    }
    return () => clearInterval(timer)
  }, [count, stop])

  return(
    <div>
      <h1>Timer {ShowTimeInMin(count)}</h1>
    </div>
  )
}