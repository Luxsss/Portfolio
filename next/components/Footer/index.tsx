"use client"
import React, {useRef, useLayoutEffect, useState} from 'react'
import Content from '@/components/Footer/content'

export default function Navbar() {
  return (
    <div className='relative h-[250px]' style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}} >
      <div className='relative h-[calc(100vh+250px)] -top-[100vh]'>
        <div className='h-[250px] sticky top-[calc(100vh-250px)]'>
          <Content />
        </div>
      </div>
    </div>
  )
}
