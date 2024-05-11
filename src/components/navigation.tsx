import Link from "next/link";

export const Navigation = () => {

  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li>
          <Link href={"/create/test"} className="hover:underline">Create Test</Link>
        </li>
        <li>
          <Link href={"/create/test"} className="hover:underline">One</Link>
        </li>
        <li>
          <Link href={"/create/test"} className="hover:underline">Two</Link>
        </li>
      </ul>
    </nav>
  );
}