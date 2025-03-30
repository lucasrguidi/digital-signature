'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { uploadDocumentSchema, UploadDocumentSchema } from '@/schemas/document-schema'
import { Form, FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useDocuments from '@/hooks/useDocuments'

export default function UploadPage() {
  const { uploadDocument, isUploadingDocument } = useDocuments()

  const form = useForm<UploadDocumentSchema>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      name: '',
      file: undefined,
    },
  })

  const onSubmit = (data: UploadDocumentSchema) => {
    uploadDocument(data)
  }

  return (
    <div className="max-w-md mx-auto h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Enviar novo documento</CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nome do documento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={e => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isUploadingDocument}>
                {isUploadingDocument ? 'Enviando...' : 'Enviar'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
