'use client'
import {useState} from "react";
import {createLinkAction, refreshLinkAction, removeLinkAction} from "@/actions/link";
import {toast} from "sonner";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Clipboard, RefreshCcw, Trash2} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";

type LinkTest = {
  id: string
  testId: string
  studentId: string
  path: string
  active: boolean
  student: {
    id: string
    name: string
    email?: string
  }
}

type LinkSheetProps = {
  links: LinkTest[]
  students: {
    id: string
    name: string
  }[]
  testId: string
}

export const LinkSheet = ({links, students, testId}:LinkSheetProps) => {
  const [student, setStudent] = useState('')
  const [name, setName] = useState('')

  const createLink = async () => {
    const {success, message} = await createLinkAction({testId, studentId:student, name})
    if (success) {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="hover:text-blue-400">
        Links
      </SheetTrigger>
      <SheetContent className="overflow-auto">
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
                          <Textarea disabled={!link.active} className="text-sm overflow-ellipsis pb-12" value={`http://localhost:3000/test/${link.path}`} onChange={()=>{}}/>
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
                              : <span className="text-xs text-gray-400">Student: {link.name}</span>
                            }
                            {!link.active && <span title="Link has been already used, refresh link to use again" className="text-xs text-red-500">inactive</span>}
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
            <>
            <SheetDescription>
              Enter student name to create link for him.
              It will help you to identify student who passed the test and see the results.
            </SheetDescription>
              <Input value={name} onChange={e=>setName(e.target.value)} />
            </>
          }
          <Button disabled={!student && !name} className="bg-blue-500 hover:bg-blue-400 transition" onClick={createLink}>
            Create Link {student ? `for ${student}` : ''}
          </Button>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}