'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

import LoadingSpinner from '@/components/custom/loading-spinner'
import useDocuments from '@/hooks/useDocuments'
import Link from 'next/link'
import { DocumentCard } from './_components/document-card'

export default function DashboardPage() {
  const { documents, isLoadingDocuments, isErrorDocuments, deleteDocument, isDeletingDocument } =
    useDocuments()

  if (isLoadingDocuments) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    )
  }

  if (isErrorDocuments) {
    toast.error('Erro ao buscar documentos.')
    return <p className="p-4 text-red-500">Erro ao buscar documentos.</p>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Seus Documentos</h2>
        <Button asChild>
          <Link href="/dashboard/upload">Novo Documento</Link>
        </Button>
      </div>

      {!documents?.length ? (
        <p className="text-gray-600">Você ainda não tem documentos.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map(document => (
            <DocumentCard
              key={document.id}
              document={document}
              deleteDocument={deleteDocument}
              isDeletingDocument={isDeletingDocument}
            />
          ))}
        </div>
      )}
    </div>
  )
}
