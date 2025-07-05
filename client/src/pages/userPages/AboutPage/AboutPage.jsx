import React from 'react'
import About_hero_section from './About_hero_section'
import About_overview from './About_overview'
import About_Editor_team from './About_Editor_team'
import About_submition_guidline from './About_submition_guidline'
import Aboiut_Publication from './Aboiut_Publication'

export default function AboutPage() {
  return (
    <div className='mt-16 md:mt-18'>
      <About_hero_section />
      <About_overview/>
      <About_Editor_team/>
      <About_submition_guidline/>
      <Aboiut_Publication/>
    </div>
  )
}
