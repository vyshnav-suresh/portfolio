import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Hardcoded admin credentials for security (since it's a single-user portfolio)
        // In a real app, these should be in .env (e.g. process.env.ADMIN_USER, process.env.ADMIN_PASS)
        const validUser = process.env.ADMIN_USER || "admin";
        const validPass = process.env.ADMIN_PASS || "admin123";

        if (credentials?.username === validUser && credentials?.password === validPass) {
          return { id: "1", name: "Admin", email: "admin@vyshnav.dev" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: "jwt",
  },
})

export { handler as GET, handler as POST }
