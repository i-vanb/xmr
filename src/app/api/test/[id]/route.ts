import { NextApiRequest } from 'next';

import {removeTest} from "@/lib/db/test";
import {revalidatePath} from "next/cache";
import {auth} from "@/auth";
import {NextResponse} from "next/server";

type Params = {
  params: {
    id: string;
  }
}

export const DELETE = auth(function DELETE(request  ) {
  // const {id} = params
  // const userId = getUserIdFromAuth()
  console.log('DELETE', request)


  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})
// export async function DELETE(request: NextApiRequest,  { params }:Params  ) {
//   const {id} = params
//   const userId = getUserIdFromAuth()
//   const res = await removeTest({id, userId})
//   if(res) {
//     revalidatePath("/dashboard")
//   }
//   return Response.json(res)
// }




const getUserIdFromAuth = () => {
  return 'clw0mlqh10000xkmntihx7qfw'
}


export const GET = auth(function GET(req) {
  if (req.auth) return NextResponse.json(req.auth)
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
})