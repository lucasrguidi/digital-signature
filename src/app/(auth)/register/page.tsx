import Link from 'next/link'
import RegisterForm from './_components/register-form'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold mb-4">Criar Conta</h1>
      <RegisterForm />
      <p className="mt-4 text-sm">
        Já tem conta?{' '}
        <Link href="/login" className="text-blue-500 underline">
          Faça login
        </Link>
      </p>
    </div>
  )
}
