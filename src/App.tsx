import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/query-client"
import { RouterProvider } from "./providers/router-provider"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider />
    </QueryClientProvider>
  )
}

export default App
