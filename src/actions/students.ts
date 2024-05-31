'use server'

import getSession from "@/lib/getSession";
import {getListByUser} from "@/lib/db/students";

export const getStudents = async () => {
  const session = await getSession()

  if(!session?.user?.id) {
    return []
  }

  const res = await getListByUser(session.user.id)
  return res
}