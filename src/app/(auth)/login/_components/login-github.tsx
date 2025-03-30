'use client'

import { Button } from '@/components/ui/button'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { signIn } from 'next-auth/react'

export default function LoginGitHub() {
  return (
    <Button
      onClick={() => signIn('github')}
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
    >
      <SiGithub className="text-xl" />
      Entrar com GitHub
    </Button>
  )
}
