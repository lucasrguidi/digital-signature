import { registerSchema, RegisterSchema } from '@/schemas/auth-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function useRegister() {
  const router = useRouter()

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: async (data: RegisterSchema) => {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error || 'Erro ao registrar')
      return result
    },
    onSuccess: () => {
      toast.success('Usuário registrado com sucesso')
      router.push('/login')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erro ao registrar')
    },
  })

  return {
    form,
    register,
    isRegistering,
  }
}
