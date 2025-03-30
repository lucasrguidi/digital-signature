'use client'

import LoadingSpinner from '@/components/custom/loading-spinner'
import useSignatures from '@/hooks/useSignatures'
import { getDocument } from '@/services/documents-service'
import { Document } from '@/types/document'
import { useQuery } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { SignaturePad } from './_components/signature-pad'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function DocumentViewPage() {
  const { id } = useParams()
  const router = useRouter()

  if (!id || typeof id !== 'string') {
    return router.push('/dashboard/documents')
  }

  const { data: document, isLoading: isLoadingDocument } = useQuery<Document>({
    queryKey: ['document', id],
    queryFn: () => getDocument(id),
  })

  const { signatures, isLoadingSignatures, signDocument, isSigningDocument } = useSignatures({
    id,
    documentStatus: document?.status,
  })

  if (isLoadingDocument || !document)
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner />
      </div>
    )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">{document.name}</h1>
        <Badge variant={document.status === 'SIGNED' ? 'signed' : 'pending'}>
          {document.status === 'SIGNED' ? 'Assinado' : 'Pendente'}
        </Badge>
      </div>

      <div className="border shadow rounded">
        <embed
          src={document.fileKey}
          type="application/pdf"
          width="100%"
          height="600px"
          onError={() => toast.error('Erro ao carregar o PDF')}
        />
      </div>

      {document.status === 'SIGNED' && Array.isArray(signatures) && signatures.length > 0 && (
        <div className="my-4">
          <h2 className="text-lg font-medium">Assinaturas do Documento</h2>
          <div className="border p-4">
            {signatures.map(signature => (
              <div className="mb-4 border rounded p-2" key={signature.id}>
                <p className="text-sm text-muted-foreground mb-1">
                  Assinado em{' '}
                  {format(new Date(signature.signedAt), "dd 'de' MMMM 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </p>
                <img
                  src={signature.signatureImg}
                  alt={`Assinatura ${signature.id}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {document.status === 'PENDING' && (
        <div className="flex flex-col gap-4 my-4">
          <h2 className="text-lg font-medium">Assinar Documento</h2>
          <SignaturePad
            onSubmit={img => signDocument({ id: document.id, signatureImg: img })}
            disabled={isSigningDocument}
          />
        </div>
      )}
    </div>
  )
}
