import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

const page = () => {
  return (
    <div className='text-center'>
      <span className='text-3xl font-bold'>This is the main page</span>

      <div>
      <Input/>
      </div>

      <div className=''>
        <Button
        >
          Primary
        </Button>

        <Button
          variant={'destructive'}
        >
          Destructive
        </Button>

        <Button
          variant={'ghost'}
        >
          Ghost
        </Button>

        <Button
          variant={'link'}
        >
          Link
        </Button>

        <Button
          variant={'outline'}
        >
          Outline
        </Button>

        <Button
          variant={'secondary'}
          size={'lg'}
        >
          Secondary
        </Button>

        <Button
          variant={'muted'}
        >
          Muted
        </Button>

        <Button
          variant={'teritary'}
        >
          Teritary
        </Button>


      </div>
      
    </div>
  )
}

export default page