import Link from "next/link";

export const Logo = ({path}:Props) => {
  return (
    <div>
      <Link href={path} className="font-bold">XMROOMER</Link>
    </div>
  )
}


type Props = {
  path: string
}