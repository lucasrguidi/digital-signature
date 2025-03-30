'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/schemas/auth-schema'
import useLogin from '../hooks/useLogin'

export default function LoginForm() {
  const { form, isLoggingIn, login } = useLogin()

  const onSubmit = (data: LoginSchema) => {
    login(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoggingIn}>
          {isLoggingIn ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </Form>
  )
}
