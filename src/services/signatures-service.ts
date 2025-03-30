export async function getSignatures(id: string) {
  const res = await fetch(`/api/signatures/${id}`)
  if (!res.ok) return []
  return res.json()
}

export async function signDocument(documentId: string, signatureImg: string) {
  const res = await fetch('/api/signatures', {
    method: 'POST',
    body: JSON.stringify({ documentId, signatureImg }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Erro ao assinar.')
  }
}
