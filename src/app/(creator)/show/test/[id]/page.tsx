import {getTestById} from "@/lib/db/test";
import {TestView} from "@/app/(creator)/show/test/[id]/TestView";
import {getStudents} from "@/actions/students";



export default async function PDFPage({params: {id}}: { params: { id: string } }) {
  const test = await getTestById(id)
  const students = await getStudents()

  if(!test) return <div>Test not found</div>

  return <TestView test={test} students={students}/>
}
