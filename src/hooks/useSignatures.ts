import { getSignatures, signDocument as signDocumentFn } from '@/services/signatures-service'
import { Signature } from '@/types/signature'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface UseSignaturesProps {
  id: string
  documentStatus: 'PENDING' | 'SIGNED'
}

export default function useSignatures({ id, documentStatus }: UseSignaturesProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: signatures, isLoading: isLoadingSignatures } = useQuery<Signature[]>({
    queryKey: ['signatures', id],
    queryFn: () => getSignatures(id),
    enabled: documentStatus === 'SIGNED',
  })

  const { mutate: signDocument, isPending: isSigningDocument } = useMutation({
    mutationFn: ({ id, signatureImg }: { id: string; signatureImg: string }) =>
      signDocumentFn(id, signatureImg),
    onSuccess: () => {
      toast.success('Documento assinado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['document', id] })
    },
    onError: (err: any) => {
      toast.error(err.message)
    },
  })

  return {
    signatures,
    isLoadingSignatures,
    signDocument,
    isSigningDocument,
  }
}
