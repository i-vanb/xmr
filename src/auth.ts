import NextAuth from "next-auth"
import db from "@/lib/db";
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import {getUserById} from "@/lib/db/user";



export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({token}) {
      if(!token.sub) return token;
      const user = await getUserById(token.sub);
      if(!user) return token;
      token.role = user.role;
      return token
    },
    async session({token, session}) {

      if(token.sub && session.user) {
        session.user.id = token.sub
      }
      if(token.role && session.user) {
        session.user.role = token.role as string
      }
      return session
    }
  },
  session: {
    strategy: 'jwt',
  },
  ...authConfig
})