import db from "@/lib/db";


type CreateTestProps = {
  title: string;
  description: string;
  userId: string;
  isTimer: boolean;
  timerByQuestion: boolean;
  timer: number;
  showRightAnswer: boolean;
  showResults: boolean;
}
export const createTest = async ({title, description, userId, timer, isTimer, timerByQuestion, showRightAnswer, showResults}:CreateTestProps) => {
  const test = await db.test.create({
    data: {
      title,
      description,
      userId,
      isTimer,
      timerByQuestion,
      timer,
      showRightAnswer,
      showResults
    },
  })
  return test.id
}

type EditTestProps = {
  id: string;
  title: string;
  description: string;
  isTimer: boolean;
  timerByQuestion: boolean;
  timer: number;
  showRightAnswer: boolean;
  showResults: boolean;
  userId: string;
}
export const editTest = async ({id, title, description, userId, isTimer, timerByQuestion, timer, showRightAnswer,
                                 showResults}:EditTestProps) => {

  const test = await db.test.update({
    where: {
      id,
      userId
    },
    data: {
      title,
      description,
      isTimer,
      timerByQuestion,
      timer,
      showRightAnswer,
      showResults
    }
  })
  return test.id
}

export const getTestById = async (id:string) => {
  const test = await db.test.findUnique({
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
  const question = await db.question.create({
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
  const newAnswers = await db.answer.createMany({
    data: answerRecords
  })
  return newAnswers
}

export const getTestList = async (userId:string) => {
  const tests = await db.test.findMany({
    where: {
      userId
    }
  })
  return tests
}

// get Test list for user with questions and answers counts
export const getTestListWithCounts = async (userId:string) => {
  const tests = await db.test.findMany({
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
    const test = await db.test.delete({
      where: {
        id, userId
      }
    })
    return test.id
  } catch (error) {
    return null
  }
}