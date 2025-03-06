import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
    <div className='border rounded-lg p-4 bg-white grid gap-3 justify-items-center'>
      <h3 className='text-2xl font-semibold'>Oop!. Page Not Found</h3>
      <p className='w-5/6 text-center'>We do not have a page what you are looking for...</p>
      <Link href="/home">
      <Button>
        Go To Home Page
      </Button>
      </Link>
    </div>
    </div>
  )
}

export default NotFoundPage
