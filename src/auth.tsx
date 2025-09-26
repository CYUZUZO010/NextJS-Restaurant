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
      // This is the minimum required structure
      async authorize(credentials) {
        // Your logic here
        return null;
      },
    }),
  ],
});
