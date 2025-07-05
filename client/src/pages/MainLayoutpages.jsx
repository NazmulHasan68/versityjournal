
import Footer from '@/components/Common/Footer';
import NavigationBar from '@/components/Common/NavigationBar';
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "sonner";

export default function MainLayoutpage() {
  return (
    <div className='bg-slate-100'>
      <NavigationBar/>
        <div className=''>
          <Outlet/>
        </div>
      <Footer/>
        <Toaster richColors position="bottom-right" />
    </div>
  )
}
