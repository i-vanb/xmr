import {getTestByLink} from "@/actions/link";

export default async function page({params: {id}}: { params: { id: string } }) {
  const test = await getTestByLink(id)

  if(!test) return <div>Test not found</div>

  return(
    <div>
      <pre>
        {JSON.stringify(test, null, 2)}
      </pre>
    </div>
  )
}