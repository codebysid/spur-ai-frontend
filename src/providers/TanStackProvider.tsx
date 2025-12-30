import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"

const client = new QueryClient()

interface ITanStackProvider {
    children: ReactNode
}

const TanStackProvider = ({ children }: ITanStackProvider) => {
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>

    )
}

export default TanStackProvider