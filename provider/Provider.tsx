import React, { ReactNode } from 'react'
import { Toaster } from 'sonner'
import QueryProvider from './QueryProvider'

const Provider = ({ children}:{ children: ReactNode}) => {
  return (
    <QueryProvider>
        <Toaster/>
      {children}
    </QueryProvider>
  )
}

export default Provider
