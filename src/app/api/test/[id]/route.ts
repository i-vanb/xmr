import { NextApiRequest } from 'next';

import {removeTest} from "@/lib/db/test";
import {revalidatePath} from "next/cache";

type Params = {
  params: {
    id: string;
  }
}

export async function DELETE(request: NextApiRequest,  { params }:Params  ) {
  const {id} = params
  const userId = getUserIdFromAuth()
  const res = await removeTest({id, userId})
  if(res) {
    revalidatePath("/dashboard")
  }
  return Response.json(res)
}

const getUserIdFromAuth = () => {
  return 'clw0mlqh10000xkmntihx7qfw'
}