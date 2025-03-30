import { Button } from '@/components/ui/button'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { SiGithub } from '@icons-pack/react-simple-icons'
import LoginForm from './_components/login-form'
import LoginGitHub from './_components/login-github'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold mb-4">Entrar</h1>
      <LoginForm />

      <div className="mt-6 w-full max-w-sm">
        <LoginGitHub />
      </div>

      <p className="mt-4 text-sm">
        Não tem conta?{' '}
        <Link href="/register" className="text-blue-500 underline">
          Registre-se
        </Link>
      </p>
    </div>
  )
}
