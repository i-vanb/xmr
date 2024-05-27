'use server'

import getSession from "@/lib/getSession";
import {
  countTestLinksByUserId,
  createLink,
  deleteLink,
  updateLink
} from "@/lib/db/test";
import {revalidatePath} from "next/cache";
import cryptoRandomString from "crypto-random-string";

type LinkType = {
  testId: string
  userId: string
  studentId?: string
  name?: string
  path: string
}

const generateLink = () => {
  return cryptoRandomString({length: 20, type: 'url-safe'})
}


type LinkParams = {
  testId: string
  studentId?: string
  name?: string
}
export const createLinkAction = async ({testId, studentId, name}:LinkParams) => {
  const session = await getSession()
  if (!session?.user?.id) {
    return {success:false, message:'Unauthorized'}
  }
  const countLinks = await countTestLinksByUserId(session.user.id)
  if (countLinks >= 5) {
    return {success:false, message:'You have reached the maximum number of links for free account.'}
  }

  const params:LinkType = {
    testId,
    userId: session.user.id,
    name,
    path: generateLink()
  }
  if(studentId) {
    params['studentId'] = studentId
  }

  const newLinkId = await createLink(params)
  if (!newLinkId) {
    return {success:false, message:'Failed to create link'}
  }
  const url = process.env.APP_URL + '/show/test/' + testId
  revalidatePath(url)
  return {success:true, message: 'Link successfully created'}
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
