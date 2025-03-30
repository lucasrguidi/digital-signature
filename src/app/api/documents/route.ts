import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { v4 as uuidv4 } from 'uuid'
import { writeFile } from 'fs/promises'
import path from 'path'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const docs = await prisma.document.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(docs)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const formData = await req.formData()
  const file = formData.get('file') as File
  const name = formData.get('name') as string

  if (!file || !name) {
    return NextResponse.json({ error: 'Nome e arquivo são obrigatórios' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const fileName = `${uuidv4()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public', 'uploads', fileName)

  await writeFile(filePath, buffer)

  const doc = await prisma.document.create({
    data: {
      name,
      fileKey: `/uploads/${fileName}`,
      userId: session.user.id,
    },
  })

  return NextResponse.json(doc, { status: 201 })
}
