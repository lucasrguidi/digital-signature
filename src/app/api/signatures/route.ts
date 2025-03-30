import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { documentId, signatureImg } = await req.json()

  if (!documentId || !signatureImg) {
    return NextResponse.json({ error: 'Documento e assinatura são obrigatórios' }, { status: 400 })
  }

  const signature = await prisma.signature.create({
    data: {
      documentId,
      userId: session.user.id,
      signatureImg,
      signedAt: new Date(),
    },
  })

  await prisma.document.update({
    where: { id: documentId },
    data: { status: 'SIGNED' },
  })

  return NextResponse.json(signature, { status: 201 })
}
