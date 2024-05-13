import db from "@/lib/db/index";

export const getUserById = async (id: string) => {
  const result = await db.user.findUnique({
    where: {
      id
    }
  })

  return result;
}

export const getUserByEmail = async (email: string) => {
  const result = await db.user.findUnique({
    where: {
      email
    }
  })

  return result;
}