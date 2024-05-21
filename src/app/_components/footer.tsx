import {Container} from "@/components/layout/Container";
import {Logo} from "@/components/logo";
import Link from "next/link";

export const Footer = ({mainPath = ""}:{mainPath:string}) => {
  return (
    <div className="py-4">
      <Container>
        <div className="flex justify-between">
          <Logo path={mainPath} />
          <div className="flex flex-col items-center gap-4 text-sm md:flex-row">
            <a href="mailto:xmroomer@gmail.com" className="hover:text-blue-400 transition">Support</a>
          </div>
        </div>
      </Container>
    </div>
  )
}