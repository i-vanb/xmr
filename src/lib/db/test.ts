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

export type EditTestProps = {
  id: string;
  title: string;
  description: string;
  isTimer: boolean;
  timerByQuestion: boolean;
  timer: number;
  showRightAnswer: boolean;
  showResults: boolean;
  userId: string;
  isActive?: boolean;
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

export const countTestsByUserId = async (userId:string) => {
  const count = await db.test.count({
    where: {
      userId
    }
  })
  return count
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
        },
        orderBy: {
          createdAt: 'asc'
        }
      },
      links: {
        include: {
          student: true
        },
        orderBy: {
          createdAt: 'asc'
        }
      },
    }
  })
  return test
}

export const createQuestion = async (testId:string, text:string) => {
  const countQuestions = await db.question.count({
    where: {
      testId
    }
  })
  if(countQuestions >= 20) return null
  const question = await db.question.create({
    data: {
      text,
      testId
    }
  })
  return question.id
}

export const patchQuestion = async ({id, text}:{id:string, text:string}) => {
  const question = await db.question.update({
    where: {
      id
    },
    data: {
      text
    }
  })
  return question.id
}

export const removeQuestion = async (id:string) => {
  const question = await db.question.delete({
    where: {
      id
    }
  })
  return question.id
}

type Answer = {
  id?: string;
  text: string;
  isCorrect: boolean;
}
type AnswerRecord = Answer & {questionId:string}
export const createAnswers = async (questionId:string, answers:Array<Answer>) => {
  const editingAnswers:AnswerRecord[] = []
  const newAnswerRecords:AnswerRecord[] = []

  answers.forEach(answer => {
    const answerRecord:AnswerRecord = {
      text: answer.text,
      isCorrect: answer.isCorrect,
      questionId
    }
    if(answer.id) answerRecord['id'] = answer.id

    if(answer.id) {
      editingAnswers.push(answerRecord)
    } else {
      newAnswerRecords.push(answerRecord)
    }
  })

  const editResults = await Promise.all(editingAnswers.map(async answer => {
    return db.answer.update({
      where: {
        id: answer.id
      },
      data: {
        text: answer.text,
        isCorrect: answer.isCorrect,
      }
    })
  }))

  const newResults = newAnswerRecords.length>0
    ? await db.answer.createMany({ data: newAnswerRecords})
    : []

  return {newResults, editResults}
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
      isTimer: true,
      timerByQuestion: true,
      timer: true,
      showRightAnswer: true,
      showResults: true,
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

type TestLink = {
  id?: string;
  testId: string;
  userId: string;
  studentId?: string;
  name?: string;
}
export const createLink = async ({testId, userId, studentId, path, name}:TestLink & {path: string}) => {
  const link = await db.link.create({
    data: {
      testId,
      userId,
      studentId,
      name,
      path
    }
  })
  return link.id
}

export const deleteLink = async (id:string) => {
  const link = await db.link.delete({
    where: {
      id
    }
  })
  return link.id
}

export const updateLink = async (data:{id:string, studentId?:string, path:string}) => {
  const link = await db.link.update({
    where: {
      id: data.id
    },
    data: {...data, active: true}
  })
  if(!link) return null

  return link
}

export const getTestByLInkID = async (id:string) => {
  const link = await db.link.findUnique({
    where: {
      id
    },
    include: {
      test: {
        include: {
          questions: {
            include: {
              answers: true
            }
          }
        }
      }
    }
  })
  return link
}

export const countTestLinksByTestId = async (testId:string) => {
  const count = await db.link.count({
    where: {
      testId
    }
  })
  return count
}

export const countTestLinksByUserId = async (userId:string) => {
  const count = await db.link.count({
    where: {
      userId
    }
  })
  return count
}

type Result = {
  testId: string
  linkId: string
  answers: string
  studentId?: string
  studentName?: string
  rightCount?: number
}
export const createResult = async (data:Result) => {
  const result = await db.result.create({
    data: {...data, valid: true}
  })
  return result.id
}

export const inactiveLink = async (id:string) => {
  const link = await db.link.update({
    where: {
      id
    },
    data: {
      active: false
    }
  })
  return link.id
}

export const getLinkByPath = async (path:string) => {
  const link = await db.link.findFirst({
    where: {
      path,
      active: true
    }
  })
  return link
}

export const getTestByLInkPath = async (path:string) => {
  const link = await db.link.findFirst({
    where: {
      path,
    },
    include: {
      test: {
        include: {
          questions: {
            include: {
              answers: true
            }
          }
        }
      }
    }
  })
  return link
}


export const getTestListWithResults = async (userId: string) => {
  const tests = await db.test.findMany({
    where: {
      userId
    },
    include: {
      links: {
        include: {
          results: true
        }
      }
    }
  })


  return tests
}

export const getTestListWithResultsByTestId = async (userId: string, testId:string) => {
  const tests = await db.test.findMany({
    where: {
      userId,
      id: testId
    },
    include: {
      links: {
        include: {
          results: true
        }
      }
    }
  })

  return tests
}

export const getQuestions = async (testId:string) => {
  const questions = await db.question.findMany({
    where: {
      testId
    },
    include: {
      answers: {
        select: {
          id: true
        },
        where: {
          isCorrect: true
        }
      }
    }
  })
  return questions
}