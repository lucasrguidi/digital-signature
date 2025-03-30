import { UploadDocumentSchema } from '@/schemas/document-schema'

export async function getDocuments() {
  const res = await fetch('/api/documents')
  if (!res.ok) throw new Error('Erro ao carregar documentos')
  return res.json()
}

export async function getDocument(id: string) {
  const res = await fetch(`/api/documents/${id}`)
  if (!res.ok) throw new Error('Erro ao carregar documento')
  return res.json()
}

export async function deleteDocument(id: string) {
  const res = await fetch(`/api/documents/${id}`, {
    method: 'DELETE',
  })
  if (!res.ok) throw new Error('Erro ao excluir documento')
}

export async function uploadDocument(data: UploadDocumentSchema) {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('file', data.file)

  const res = await fetch('/api/documents', {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Erro ao enviar o documento')
  }

  return res.json()
}
