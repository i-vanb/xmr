import getSession from "@/lib/getSession";
import {getTestListWithCounts} from "@/lib/db/test";
import {getResultList} from "@/actions/test";
import {ResultTable} from "@/app/(creator)/_components/ResultTable";
import {ColumnDef} from "@tanstack/react-table";

type ResultT = {
  id: string
  testName: string
  studentName: string
  date: string
  active: boolean
  timer: number
}

export default async function Page() {
  const session = await getSession()
  if (!session?.user?.id) return null

  const {id} = session.user
  const list = await getResultList(id)

  const processedList = getProcessedResults(list)

  const columns:ColumnDef<ResultT>[] = [
    {
      accessorKey: 'testName',
      header: 'Test Name',
    },
    {
      accessorKey: 'studentName',
      header: 'Student Name',
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'correct',
      header: 'Correct',
    },
    {
      accessorKey: 'timer',
      header: 'Timer',
    },
  ]

  return (
    <div>
      <ResultTable data={processedList} columns={columns} />
    </div>
  )
}


const getProcessedResults = (list) => {
  let processedList = []
  list.forEach((item) => {
    const testName = item.title
    const timer = item.timer
    item.results.forEach((result) => {
      try {
        const answers = JSON.parse(result.answers)
        const studentName = result.studentName
        const correct = result.rightCount + '/' + answers.length
        const date = new Date(result.createdAt).toLocaleDateString()
        processedList.push({id: result.id, testName, studentName, date, timer, correct})
      } catch(e) {

      }
    })
  })
  return processedList
}