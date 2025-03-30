import { ReactNode } from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect('/dashboard')
  }

  return children
}
