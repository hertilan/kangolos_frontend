import React from 'react'
import Header from '../StudentSmall/Header'
import BrowseProjects from '../StudentPages/ViewProjects'

const NormalUser :React.FC= () => {
  return (
    <div className='h-screen'>
      <BrowseProjects onClose={true}/>
    </div>
  )
}

export default NormalUser
