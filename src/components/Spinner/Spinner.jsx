import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed inset-0 bg-midnight z-[9999] flex items-center justify-center opacity-70'>
      <div
        className='w-10 h-10 border-2 border-solid border-white border--transparent rounded-full animate-spin'
      >

      </div>
    </div>
  )
}

export default Spinner