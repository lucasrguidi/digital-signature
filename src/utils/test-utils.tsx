import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function withQueryClient(ui: ReactNode) {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
}
