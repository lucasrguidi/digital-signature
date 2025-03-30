import { z } from 'zod'

export const uploadDocumentSchema = z.object({
  name: z.string().min(2, { message: 'O nome é obrigatório' }),
  file: z
    .any()
    .refine(file => file?.size > 0, 'Arquivo é obrigatório')
    .refine(file => file?.type === 'application/pdf', 'O arquivo deve ser um PDF'),
})

export type UploadDocumentSchema = z.infer<typeof uploadDocumentSchema>
