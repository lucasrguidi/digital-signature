'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useDocuments from '@/hooks/useDocuments'
import { Document } from '@/types/document'
import Link from 'next/link'

interface DocumentCardProps {
  document: Document
  deleteDocument: (id: string) => void
  isDeletingDocument: boolean
}

export function DocumentCard({ document, deleteDocument, isDeletingDocument }: DocumentCardProps) {
  function handleDelete() {
    deleteDocument(document.id)
  }

  return (
    <div className="border rounded p-4 flex flex-col gap-2 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{document.name}</h3>
        <Badge variant={document.status === 'SIGNED' ? 'signed' : 'pending'}>
          {document.status === 'SIGNED' ? 'Assinado' : 'Pendente'}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/document/${document.id}`}>Visualizar</Link>
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={isDeletingDocument}>
          {isDeletingDocument ? 'Excluindo...' : 'Excluir'}
        </Button>
      </div>
    </div>
  )
}
