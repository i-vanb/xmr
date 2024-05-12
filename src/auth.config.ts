import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      authorize: async (credentials) => {
        console.log('authorize CREDENTIALS',credentials)
        // const validatedFields = SignInSchema.safeParse(credentials);
        //
        // if (validatedFields.success) {
        //   const { email, password} = validatedFields.data;
        //   let [user] = await getUserByEmail(email);
        //
        //
        //   if(!user || !user.password) return null;
        //
        //   const match = await bcryptjs.compare(password, user.password);
        //   if(match) return user;
        // }

        return {
          email: 'email@email.com',
          id: 'scsdcerferverfg3rvbgre3dvvdfdvdf',
        };
      },
    })
  ],
  secret: process.env.AUTH_SECRET,
  // pages: {
  //   signIn: '/auth/signin'
  // }
} satisfies NextAuthConfig;