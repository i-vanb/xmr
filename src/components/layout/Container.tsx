import {ReactNode} from "react";

export const Container = ({children, className}:Props) => {
  let cn = 'max-w-[1200px] m-auto px-6 ';
  if(className) cn += className;

  return(
    <div className={cn}>
      {children}
    </div>
  )
}

type Props = {
  children: ReactNode,
  className?: string,
  small?: boolean,
}