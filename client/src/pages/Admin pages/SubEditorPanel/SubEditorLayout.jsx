import React from 'react'
import { Outlet } from 'react-router-dom'
import SubEditor_sidebar from './SubEditor_sidebar'

export default function SubEditorLayout() {
  return (
    <div className='mt-16 md:mt-18 flex flex-col md:flex-row gap-4'>
      <div className=' basis-1/4 '>
        <SubEditor_sidebar/>
      </div>
      <div className=' basis-3/4 '>
        <Outlet/>
      </div>
    </div>
  )
}
