import { getDocuments } from '@/services/documents-service'
import { Document } from '@/types/document'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  deleteDocument as deleteDocumentFn,
  uploadDocument as uploadDocumentFn,
} from '@/services/documents-service'
import { toast } from 'sonner'
import { UploadDocumentSchema } from '@/schemas/document-schema'
import { useRouter } from 'next/navigation'

export default function useDocuments() {
  const queryClient = useQueryClient()
  const router = useRouter()

  const {
    data: documents,
    isLoading: isLoadingDocuments,
    isError: isErrorDocuments,
  } = useQuery<Document[]>({
    queryKey: ['documents'],
    queryFn: getDocuments,
  })

  const { mutate: deleteDocument, isPending: isDeletingDocument } = useMutation({
    mutationFn: (id: string) => deleteDocumentFn(id),
    onSuccess: () => {
      toast.success('Documento excluído com sucesso')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
    onError: () => {
      toast.error('Erro ao excluir documento')
    },
  })

  const { mutate: uploadDocument, isPending: isUploadingDocument } = useMutation({
    mutationFn: (data: UploadDocumentSchema) => uploadDocumentFn(data),
    onSuccess: () => {
      toast.success('Documento enviado com sucesso!')
      router.push('/dashboard')
    },
    onError: (err: any) => {
      toast.error(err.message)
    },
  })

  return {
    documents,
    isLoadingDocuments,
    isErrorDocuments,
    deleteDocument,
    isDeletingDocument,
    uploadDocument,
    isUploadingDocument,
  }
}
