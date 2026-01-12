//making the authentication
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
     
      async authorize(credentials) {
        // Your logic here
        return null;
      },
    }),
  ],
});
