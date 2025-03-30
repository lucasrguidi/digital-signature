import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      async profile(profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        })

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              name: profile.name || 'Usuário GitHub',
              email: profile.email!,
              githubId: profile.id.toString(),
            },
          })
          return { id: newUser.id, name: newUser.name, email: newUser.email }
        }

        return { id: existingUser.id, name: existingUser.name, email: existingUser.email }
      },
    }),

    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        })

        if (!user || !user.password) return null

        const isValid = await compare(credentials!.password, user.password)

        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return baseUrl + '/dashboard'
      }
      return url
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
