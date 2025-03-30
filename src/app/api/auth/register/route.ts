import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Nome, e-mail e senha são obrigatórios' },
      { status: 400 }
    )
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return NextResponse.json(
      { error: 'Já existe um usuário com este e-mail' },
      { status: 400 }
    )
  }

  const hashedPassword = await hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  return NextResponse.json({
    message: 'Usuário registrado com sucesso',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  }, { status: 201 })
}
