'use client'
import Link from "next/link";
import {useLangContext} from "@/lib/lang";


export const Navigation = () => {
  // const {dictionary} = useLangContext();

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li className="font-medium text-sm">
          <Link className="hover:text-blue-400 transition-colors" href={"/dashboard/results"}>Results</Link>
        </li>
        {/*<li className="font-medium text-sm">*/}
        {/*  <Link className="hover:text-blue-400 transition-colors" href={"/create/student"}>{dictionary.main.create_student}</Link>*/}
        {/*</li>*/}
      </ul>
    </nav>
  );
}