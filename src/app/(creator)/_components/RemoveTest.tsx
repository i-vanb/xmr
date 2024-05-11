'use client'
import {Button} from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {removeTest} from "@/lib/db/test";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {revalidatePath} from "next/cache";

type Props = {
  id: string
  title: string
}

export const RemoveTest = ({id, title}:Props) => {
  const router = useRouter()

  const removeTestHandler = async () => {
    const res = await fetch(`/api/test/${id}`, {method: 'DELETE'})
    const data = await res.json()
    if(!res.ok) {
      return toast.error('Error while removing test')
    }
    if(data) {
      toast.success('Test removed')
      router.replace("/dashboard")
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>Remove</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to remove test {title}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this test.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={removeTestHandler}>Remove</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}