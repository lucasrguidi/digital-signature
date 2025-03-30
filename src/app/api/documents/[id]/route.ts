import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const doc = await prisma.document.findUnique({
    where: { id: params.id },
  })

  if (!doc) {
    return NextResponse.json({ error: 'Documento não encontrado' }, { status: 404 })
  }

  if (doc.userId !== session.user.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  return NextResponse.json(doc)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const doc = await prisma.document.findUnique({
    where: { id: params.id },
  })

  if (!doc) {
    return NextResponse.json({ error: 'Documento não encontrado' }, { status: 404 })
  }

  if (doc.userId !== session.user.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 404 })
  }

  await prisma.document.delete({
    where: { id: params.id },
  })

  return NextResponse.json({ sucesso: true })
}
