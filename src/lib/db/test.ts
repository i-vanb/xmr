import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type CreateTestProps = {
  title: string;
  description: string;
  userId: string;
}
export const createTest = async ({title, description, userId}:CreateTestProps) => {
  const test = await prisma.test.create({
    data: {
      title,
      description,
      userId
    },
  })
  console.log('Create test', test)
  return test.id
}

type EditTestProps = {
  id: string;
  title: string;
  description: string;
}
export const editTest = async ({id, title, description}:EditTestProps) => {
  const test = await prisma.test.update({
    where: {
      id
    },
    data: {
      title,
      description
    }
  })
  return test.id
}

export const getTestById = async (id:string) => {
  const test = await prisma.test.findUnique({
    where: {
      id
    },
    include: {
      questions: {
        include: {
          answers: true
        }
      }
    }
  })
  return test

}

export const createQuestion = async (testId:string, text:string) => {
  const question = await prisma.question.create({
    data: {
      text,
      testId
    }
  })
  return question.id
}

export const createAnswers = async (questionId:string, answers:Array<{text:string, isCorrect:boolean}>) => {
  const answerRecords = answers.map(answer => {
    return {
      text: answer.text,
      isCorrect: answer.isCorrect,
      questionId
    }
  })
  const newAnswers = await prisma.answer.createMany({
    data: answerRecords
  })
  return newAnswers
}

export const getTestList = async (userId:string) => {
  const tests = await prisma.test.findMany({
    where: {
      userId
    }
  })
  return tests
}

// get Test list for user with questions and answers counts
export const getTestListWithCounts = async (userId:string) => {
  const tests = await prisma.test.findMany({
    where: {
      userId
    },
    select: {
      id: true,
      title: true,
      description: true,
      questions: {
        select: {
          id: true,
          answers: {
            select: {
              id: true
            }
          }
        }
      }
    }
  })
  return tests
}

export const removeTest = async ({id, userId}:{id:string, userId:string}) => {
  try {
    const test = await prisma.test.delete({
      where: {
        id, userId
      }
    })
    console.log('Remove test', test)
    return test.id
  } catch (error) {
    return null
  }
}

// export const getExercisesByTestId = async (testId:string) => {
//   const exercises = await prisma.exercise.findMany({
//     where: {
//       testId
//     }
//   })
//   return exercises
// }