"use client"

import { QueryClientProvider as QCProvider, QueryClient } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

export default function QueryClientProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
  	  defaultOptions: {
  	    queries: {
  	      refetchOnWindowFocus: false
  	    }
  	  }
  	})
  )

  return (
  	<QCProvider client={client}>
  	  {children}
  	</QCProvider>
  )
}
