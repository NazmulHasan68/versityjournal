import React from 'react'
import { Outlet } from 'react-router-dom'
import Revieser_sidebar from './Revieser_sidebar'

export default function ReviewerLayout() {
  return (
    <div className='mt-16 md:mt-18 flex flex-col md:flex-row gap-4'>
      <div className=' basis-1/4 '>
        <Revieser_sidebar/>
      </div>
      <div className=' basis-3/4 '>
        <Outlet/>
      </div>
    </div>
  )
}
