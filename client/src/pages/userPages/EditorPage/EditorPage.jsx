import React from 'react'
import Editor_hero_section from './Editor_hero_section'
import Editor_panel from './Editor_panel'
import Editorlist from './Editorlist'
import Sub_editor from './Sub_editor'
import Reviewer from './Reviewer'

export default function EditorPage() {
  return (
    <div className='mt-16 md:mt-18'>
      <Editor_hero_section/>
      <Editorlist/>
      <Sub_editor/>
      <Reviewer/>
      <Editor_panel/>
    </div>
  )
}
