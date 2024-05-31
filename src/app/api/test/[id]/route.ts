import { NextApiRequest } from 'next';

import {removeTest} from "@/lib/db/test";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";
import {NextResponse} from "next/server";
import getSession from '@/lib/getSession';

type Params = {
  params: {
    id: string;
  }
}

// @ts-ignore
export const DELETE = auth(async function DELETE(request, {params}:Params ) {
  const {id} = params

  const session = await getSession()
  if(!session?.user?.id) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }
  const userId = session.user.id
  const res = await removeTest({id, userId})
  if(res) {
    revalidatePath("/dashboard")
    return NextResponse.json(res)
  }

  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})


export const GET = auth(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth)
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})