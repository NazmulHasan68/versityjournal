import React from 'react'
import Archives_header from './Archives_header'
import Archives_Statistics from './Archives_Statistics'
import Archives_slider from './Archives_slider'

export default function ArchivesPage() {
  return (
    <div className='mt-16 md:mt-18'>
      <Archives_header/>
      <Archives_Statistics/>
      <Archives_slider/>
    </div>
  )
}
