'use client'

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    signOut({
      callbackUrl: '/login',
    })
  }

  return (
    <div className="bg-background border-b-2 p-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Digital Signature
        </Link>

        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        <div className="hidden md:flex gap-6">
          <Button variant="link" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="/dashboard/upload">Novo Documento</Link>
          </Button>
          <Button onClick={handleLogout} variant="link">
            Sair
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">
          <Button variant="link" className="w-full justify-start" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="link" className="w-full justify-start" asChild>
            <Link href="/dashboard/upload">Novo Documento</Link>
          </Button>
          <Button onClick={handleLogout} variant="link" className="w-full justify-start">
            Sair
          </Button>
        </div>
      )}
    </div>
  )
}
