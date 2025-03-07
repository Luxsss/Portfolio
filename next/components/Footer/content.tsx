import React from 'react'

export default function Content() {
  return (
    <div className='bg-[#4E4E5A] py-8 px-12 h-full w-full flex flex-col justify-between'>
        <Section1 />
    </div>
  )
}

const Section1 = () => {
    return (
        <div className='flex justify-between items-end'>
            
            <h1 className='text-[5vw] leading-[0.8] mt-10'>Sticky Footer</h1>
            <p>©copyright</p>
        </div>
    )
}
