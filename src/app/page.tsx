import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className=' '>
      <span className='text-3xl font-bold'>This is the main page</span>
      
      <Button
        variant={'ghost'}
        size={'lg'}
      >
        Click me
      </Button>
    </div>
  )
}

export default page