import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ShowTimeInMin = (timeInSecond:number):string => {
  const minutes = Math.floor(timeInSecond / 60)
  const seconds = timeInSecond - minutes * 60
  const strMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const strSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`

  return strMinutes + ':' + strSeconds
}