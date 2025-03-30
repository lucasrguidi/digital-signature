export interface Document {
  id: string
  name: string
  fileKey: string
  status: PENDING | SIGNED
}
