import React from 'react'
import Home_hero_section from './Home_hero_section'
import Home_search_category from './Home_search_category'
import Home_features_aritical from './Home_features_aritical'
import Home_Journal_merits from './Home_Journal_merits'
import Home_Contribute from './Home_Contribute'

export default function HomePage() {
  return (
    <div className='mt-16 md:mt-18'>
      <Home_hero_section/>
      <Home_search_category/>
      <Home_features_aritical/>
      <Home_Journal_merits/>
      <Home_Contribute/>
    </div>
  )
}
