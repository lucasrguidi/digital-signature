import { loginSchema, LoginSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function useLogin() {
  const router = useRouter()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (data: LoginSchema) => {
      const res = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (res?.error) {
        throw new Error('E-mail ou senha inválidos')
      }

      return res
    },
    onSuccess: () => {
      toast.success('Login realizado com sucesso')
      router.push('/dashboard')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao fazer login')
    },
  })

  return {
    form,
    login,
    isLoggingIn,
  }
}
