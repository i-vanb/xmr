import Link from "next/link";

export const Logo = ({path}:Props) => {
  return (
    <div>
      <Link href={path} className="font-bold">XMRoomer</Link>
    </div>
  )
}


type Props = {
  path: string
}