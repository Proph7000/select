import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { RouterProvider } from './router'

const queryClient = new QueryClient()

export function ComposeProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
    </QueryClientProvider>
  )
}
