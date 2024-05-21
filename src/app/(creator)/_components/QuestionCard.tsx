'use client'
import {Button} from "@/components/ui/button";
import {Cog, Trash2} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {deleteQuestion} from "@/actions/test";
import {toast} from "sonner";
import {useState} from "react";

type Props = {
  question: Question
  order: number
  setCurrent: (question:Question) => void
}

type Question = {
  id: string
  text: string
  answers: {
    id: string
    text: string
    isCorrect: boolean
  }[]
}

export const QuestionCard = ({question, order, setCurrent}:Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const onDelete = async () => {
    const res = await deleteQuestion(question.id)
    if (res) {
      toast.success("Question removed successfully")
    } else {
      toast.error("Failed to remove question")
    }
  }

  const onEdit = () => setCurrent(question)

  return (
    <li key={question.id} className="p-6 border rounded my-2 relative">
      <div className="absolute top-1 right-2 flex gap-2">
        <Button onClick={onEdit} variant="link" className="p-0 h-auto opacity-30 transition-opacity hover:opacity-100">
          <Cog size={18}/>
        </Button>
        <RemoveQuestionBtn onDelete={onDelete} />
      </div>
      <h3 className="mb-2">{order}. {question.text}</h3>
      <ul className="">
        {question.answers.map(option => (
          <li key={option.id}
              className={`mb-2 rounded px-6 py-2 ${option.isCorrect ? "bg-blue-200" : "bg-gray-100"}`}>
            {option.text}
          </li>
        ))}
      </ul>
    </li>
  )
}


const RemoveQuestionBtn = ({onDelete}: {onDelete: () => void}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-0 h-auto opacity-30 transition-opacity hover:opacity-100">
        <Trash2 size={18}/>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to remove question?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this question.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Remove</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}