import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { documentId: string } }) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const document = await prisma.document.findUnique({
    where: { id: params.documentId },
  })

  if (!document) {
    return NextResponse.json({ error: 'Documento não encontrado' }, { status: 404 })
  }

  if (document.userId !== session.user.id) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 403 })
  }

  const signatures = await prisma.signature.findMany({
    where: { documentId: params.documentId },
  })

  return NextResponse.json(signatures)
}
