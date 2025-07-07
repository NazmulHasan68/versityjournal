import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ReseacherLayout() {
  return (
    <div className='mt-16 md:mt-18'>
      <Outlet/>
    </div>
  )
}
