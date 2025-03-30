import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LoadingSpinner from '@/components/custom/loading-spinner'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  redirect('/dashboard')

  return <LoadingSpinner />
}
