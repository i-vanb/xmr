'use server'

import db from "@/lib/db/index";

export const getListByUser = async (userId:string) => {
  const students = await db.student.findMany({
    where: {
      teacherId: userId
    }
  })
  return students
}