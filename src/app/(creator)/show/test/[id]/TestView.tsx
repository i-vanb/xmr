'use client'
import {useState} from 'react';
import {EditTestProps} from "@/lib/db/test";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {createLinkAction, refreshLinkAction, removeLinkAction} from "@/actions/link";
import {Clipboard, RefreshCcw, Trash2} from "lucide-react"
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {toast} from "sonner";



type Props = {
  test: {
    questions: Array<Question>
    links: Array<LinkTest>
  } & EditTestProps
  students: {
    id: string
    name: string
  }[]
}

type Question = {
  id: string
  text: string
  answers: {
    id: string
    text: string
  }[]
}

type LinkTest = {
  id: string
  testId: string
  studentId: string
  path: string
  student: {
    id: string
    name: string
    email?: string
  }
}

export const TestView = ({test, students}: Props) => {
  const {
    id,
    title,
    description,
    timer,
    isTimer,
    timerByQuestion,
    showRightAnswer,
    showResults,
    questions,
    isActive,
    links
  } = test

  return (
    <div>
      <section className="flex justify-end">
        <LinkSheet links={links} students={students} testId={id}/>
      </section>
      <section>
        <h1 className="font-bold text-center">{title}</h1>
        <p className="my-4">{description}</p>
      </section>
      {questions.map((q, ind) => {
        return (
          <section key={q.id} className="border rounded-xl my-6 p-4">
            <h1 className="font-bold">Question {ind + 1}</h1>
            <h2 className="border-b pb-2 mb-4">{q.text}</h2>
            <RadioGroup className="md:flex justify-between py-2 px-6" defaultValue="option-one">
              {q.answers.map(j => {
                return (
                  <div key={j.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={j.id} id={j.id}/>
                    <Label htmlFor="option-four">{j.text}</Label>
                  </div>
                )
              })}
            </RadioGroup>
          </section>
        )
      })}
    </div>
  )
}

type LinkSheetProps = {
  links: LinkTest[]
  students: {
    id: string
    name: string
  }[]
  testId: string
}

const LinkSheet = ({links, students, testId}:LinkSheetProps) => {
  const [student, setStudent] = useState('')

  const createLink = async () => {
    const newLink = await createLinkAction(testId, student)
    if (newLink) {
      toast.success("Link created successfully")
    } else {
      toast.error("Failed to create link")
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="text-blue-500 hover:text-blue-400">
        Links
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>Test links</SheetTitle>
          {links.length > 0
            ?
            <>
              <SheetDescription>
                You have already created links for this test.
                You can share them with your students.
                You also can replace link with new one.
              </SheetDescription>
              <ul className="space-y-4">
                {links.map((link, ind) => {
                  const copyLink = () => {
                    navigator.clipboard.writeText(`http://localhost:3000/test/${link.id}`)
                      .then(() => {toast.success("Link copied to clipboard")})
                      .catch(() => {toast.error("Failed to copy link")})
                  }

                  const replaceLink = async () => {
                    const params:{id:string, studentId?:string} = {
                      id: link.id
                    }
                    if(student) {
                      params['studentId'] = student
                    }
                    const newLink = await refreshLinkAction(params, link.testId)
                    if (newLink) {
                      toast.success("Link refreshed successfully")
                    } else {
                      toast.error("Failed to refresh link")
                    }
                  }

                  const removeLink = async () => {
                    const res = await removeLinkAction(link.id, link.testId)
                    if (res) {
                      toast.success("Link removed successfully")
                    } else {
                      toast.error("Failed to remove link")
                    }
                  }

                  return (
                    <li key={link.id}>
                      <div className="relative">
                        <Textarea className="text-sm overflow-ellipsis pb-12" value={`http://localhost:3000/test/${link.path}`} onChange={()=>{}}/>
                        <div className="absolute bottom-2 left-2 flex items-center gap-2">
                          <Button variant="link"
                                  className="opacity-30 transition-opacity hover:opacity-100 p-0"
                                  onClick={copyLink}>
                            <Clipboard size={18} />
                          </Button>
                          <Button variant="link"
                                  className="opacity-30 transition-opacity hover:opacity-100 p-0"
                                  onClick={replaceLink}>
                            <RefreshCcw size={18} />
                          </Button>
                          <Button variant="link"
                                  className="opacity-30 transition-opacity hover:opacity-100 p-0"
                                  onClick={removeLink}>
                            <Trash2 size={18}/>
                          </Button>
                          {link.studentId
                            ? <span className="text-xs text-gray-400">Student: {link.student.name}</span>
                            : <span className="text-xs text-gray-400">Student not specified</span>
                          }
                        </div>
                      </div>
                    </li>
                  )
                }
                )}
              </ul>
            </>
            :
            <>
              <SheetDescription>
                You have not created any links for this test yet.
                Click the button below to create one.
              </SheetDescription>
            </>
          }
          {students.length > 0 ?
            <Select onValueChange={setStudent} value={student}>
            <SelectTrigger className="w-[180px]">
              <SelectValue/>
            </SelectTrigger>
            <SelectContent>
              {students.map(i => <SelectItem value={i.id} key={i.id}>{i.name}</SelectItem>)}
            </SelectContent>
            </Select>
            :
            <SheetDescription>
              You have not added any students yet.
              You can create a link for a specific student when you add them.
            </SheetDescription>
          }
          <Button className="bg-blue-500 hover:bg-blue-400 transition" onClick={createLink}>
            Create Link {student ? `for ${student}` : ''}
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}