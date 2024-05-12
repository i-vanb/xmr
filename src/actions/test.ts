'use server'
import { z } from "zod";
import {createAnswers, createQuestion, createTest, editTest} from "@/lib/db/test";
import {revalidatePath} from "next/cache";

const TestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  userId: z.string().min(4),
  id: z.string().optional()
});

export type TestFormState = {
  message: string
  success?: boolean
  id?: string
}

export const createTestAction = async (state: TestFormState, formData: FormData):Promise<TestFormState> => {
  const testId = formData.get('id')
  let fields = {
    title: formData.get('title'),
    description: formData.get('description'),
    userId: formData.get('userId'),
    id: formData.get('id') || undefined
  }

  const validatedFields = TestSchema.safeParse(fields)

  if (!validatedFields.success) {
    return {
      message: 'Invalid input',
      success: false
    }
  }

  const {id, title, description, userId} = validatedFields.data

  const newTest = id
    ? await editTest({id, title, description})
    : await createTest({title, description, userId})

  if(!newTest) {
    return {
      message: 'Error creating/editing test',
      success: false
    }
  }

  revalidatePath(id ? `/edit/test/${id}` : `/create/test/${newTest}`)

  const newState = {
    message: 'Test successfully created/edited' as string,
    success: true,
    id: newTest
  }

  return newState
}


const questionSchema = z.object({
  text: z.string().min(1),
  testId: z.string().min(4)
})

type QuestionFormState = {
  message: string
  success?: boolean
  id?: string
}
export const addQuestion = async (state: QuestionFormState, formData: FormData) => {

  const validatedFields = questionSchema.safeParse({
    text: formData.get('text'),
    testId: formData.get('testId')
  })

  if (!validatedFields.success) {
    return {
      message: 'Invalid input',
      success: false
    }
  }

  const {text, testId} = validatedFields.data
  const answers = getAnswers(formData)

  if(!answers.length) {
    return {
      message: 'At least one answer is required',
      success: false
    }
  }

  const newQuestion = await createQuestion(testId, text)
  await createAnswers(newQuestion, answers)


  revalidatePath('/dashboard/test/[id]')
  return {
    message: 'Question created',
    success: true,
    id: newQuestion
  }
}

const getAnswers = (formData: FormData) => {
  const answers = []
  const question_type = formData.get('question_type')
  let correctDefined = false

  for (let i = 0; i < 8; i++) {
    const text = formData.get(`answers.${i}.text`) as string
    const isCorrect = !correctDefined ? formData.get(`answers.${i}.isCorrect`) : false
    if(isCorrect && question_type === "1") {
      correctDefined = true
    }
    if (text) {
      answers.push({
        text: text,
        isCorrect: !!isCorrect
      })
    }
  }
  return answers
}