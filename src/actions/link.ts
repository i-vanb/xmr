'use server'

import getSession from "@/lib/getSession";
import {createLink, deleteLink, getTestByLInkID, updateLink} from "@/lib/db/test";
import {revalidatePath} from "next/cache";
import cryptoRandomString from "crypto-random-string";

type LinkType = {
  testId: string
  userId: string
  studentId?: string
  path?: string
}

const generateLink = () => {
  return cryptoRandomString({length: 20, type: 'url-safe'})
}

export const createLinkAction = async (testId: string, studentId?:string) => {
  const session = await getSession()
  if (!session?.user?.id) {
    return null
  }
  const params:LinkType = {
    testId,
    userId: session.user.id,
    path: generateLink()
  }
  if(studentId) {
    params['studentId'] = studentId
  }

  const newLinkId = await createLink(params)
  if (!newLinkId) {
    return null
  }
  const url = process.env.APP_URL + '/show/test/' + testId
  revalidatePath(url)
  return newLinkId
}

export const getTestByLink = async (link: string) => {
  return await getTestByLInkID(link)
}

export const removeLinkAction = async (linkId: string, testId:string) => {
  const url = process.env.APP_URL + '/show/test/' + testId
  const removed = await deleteLink(linkId)
  if(!removed) return

  revalidatePath(url)
  return removed
}

export const refreshLinkAction = async (link:{id:string, studentId?:string}, testId:string) => {
  const newLink = await updateLink({
    ...link,
    path: generateLink()
  })

  const url = process.env.APP_URL + '/show/test/' + testId

  revalidatePath(url)
  return newLink
}
