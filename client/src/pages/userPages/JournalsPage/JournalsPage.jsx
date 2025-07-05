import React from 'react'
import Journal_sidebar from './Journal_sidebar'
import { Outlet } from 'react-router-dom'

export default function JournalsPage() {
  return (
    <div className='mt-16 md:mt-18 flex flex-col md:flex-row gap-4'>
      <div className=' basis-1/4 '>
        <Journal_sidebar/>
      </div>
      <div className=' basis-3/4 '>
        <Outlet/>
      </div>
    </div>
  )
}
