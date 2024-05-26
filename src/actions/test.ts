'use server'
import { z } from "zod";
import {
  countTestsByUserId,
  createAnswers,
  createQuestion, createResult,
  createTest,
  editTest, getQuestions, getTestByLInkPath, getTestListWithResults, inactiveLink,
  patchQuestion,
  removeQuestion
} from "@/lib/db/test";
import {revalidatePath} from "next/cache";
import getSession from "@/lib/getSession";

const TestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  id: z.string().optional(),
  isTimer: z.boolean().optional().default(false),
  timerByQuestion: z.boolean().optional().default(false),
  timer: z.number().optional().optional().default(0),
  showRightAnswer: z.boolean().optional().default(false),
  showResults: z.boolean().optional().default(false)
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
    id: formData.get('id') || undefined,
    isTimer: formData.get('isTimer') === 'on',
    timerByQuestion: formData.get('timerByQuestion') === 'on',
    timer: Number(formData.get('timer')),
    showRightAnswer: formData.get('showRightAnswer') === 'on',
    showResults: formData.get('showResults') === 'on',
  }

  const validatedFields = TestSchema.safeParse(fields)

  if (!validatedFields.success) {
    return {
      message: 'Invalid input',
      success: false
    }
  }

  const {id, title, description, isTimer, timerByQuestion,
    timer, showRightAnswer, showResults} = validatedFields.data

  const auth = await getSession()
  if(!auth?.user?.id) {
    return {
      message: 'Unauthorized',
      success: false
    }
  }

  const countTests = await countTestsByUserId(auth.user.id)
  if (countTests >= 2) {
    return {
      message: 'You have reached the maximum number of tests for free account.',
      success: false
    }
  }

  const newTest = id
    ? await editTest({id, title, description, isTimer, timerByQuestion, timer, showRightAnswer, showResults, userId: auth.user.id})
    : await createTest({title, description, isTimer, timerByQuestion, timer, showRightAnswer, showResults, userId: auth.user.id, })

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
export const editQuestion = async (state: QuestionFormState, formData: FormData) => {
  const id = formData.get('id') as string
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

  const newQuestion = id
    ? await patchQuestion({id, text})
    : await createQuestion(testId, text)

  if(!newQuestion && !id) {
    return {
      message: 'Error creating question, maybe you get to the maximum number of questions for free account.',
      success: false
    }
  }

  await createAnswers(newQuestion, answers)
  revalidatePath('/dashboard/test/[link]')

  return {
    message: id ? 'Question edited successfully' : 'Question created successfully',
    success: true,
    id: newQuestion
  }
}

const getAnswers = (formData: FormData) => {
  const answers = []
  const question_type = formData.get('question_type')
  let correctDefined = false

  for (let i = 0; i < 8; i++) {
    const id = formData.get(`answers.${i}.id`) as string
    const text = formData.get(`answers.${i}.text`) as string
    const isCorrect = !correctDefined ? formData.get(`answers.${i}.isCorrect`) : false
    if(isCorrect && question_type === "1") {
      correctDefined = true
    }
    if (text) {
      answers.push({
        id: id,
        text: text,
        isCorrect: !!isCorrect
      })
    }
  }
  return answers
}

export const deleteQuestion = async (questionId: string) => {
  const res = await removeQuestion(questionId)
  return res
}


export type Result = {
  testId: string
  linkId: string
  answers: {answerId:string, questionId:string}[]
  studentId?: string
  studentName?: string
  rightCount?: number
}

export const setResultsAction = async (data:Result) => {
  const questions = await getQuestions(data.testId)
  let rightCount = 0

  const rightAnswers = {} as {[key:string]:string}
  questions.forEach((question, index) => {
    rightAnswers[question.id] = question.answers[0]
  })

  const resultAnswers = data.answers.map(answer => {
    const isCorrect = rightAnswers[answer.questionId] === answer.answerId
    if(isCorrect) rightCount++
    return {
      ...answer,
      isCorrect
    }
  })

  const res = await createResult({
    testId: data.testId,
    linkId: data.linkId,
    studentId: data.studentId || undefined,
    studentName: data.studentName,
    answers: JSON.stringify(resultAnswers),
    rightCount
  })
  if(!res) {
    return {success:false, message:'Failed to save results'}
  }
  await inactiveLink(data.linkId)
  return {
    success:true,
    message:'Results saved'
  }
}


export const getTestByLinkAction = async (link: string) => {
  return await getTestByLInkPath(link)
}


export const getResultList = async (userId: string) => {
  const res = await getTestListWithResults(userId)
  return res
}