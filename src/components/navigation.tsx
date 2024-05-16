'use client'
import Link from "next/link";
import {useLangContext} from "@/lib/lang";


export const Navigation = () => {
  const {dictionary} = useLangContext();

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/create/test"}>{dictionary.main.create_test}</Link>
        </li>
      </ul>
    </nav>
  );
}