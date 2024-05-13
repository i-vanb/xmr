import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import type { NextAuthConfig } from "next-auth";
import bcryptjs from "bcryptjs";
import {SignInSchema} from "@/lib/db/sign";
import {getUserByEmail} from "@/lib/db/user";

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
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password} = validatedFields.data;
          let user = await getUserByEmail(email);


          if(!user || !user.password) return null;

          const match = await bcryptjs.compare(password, user.password);
          if(match) return user;
        }

        return null;
      },
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login'
  }
} satisfies NextAuthConfig;