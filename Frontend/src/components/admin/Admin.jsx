import React from 'react'
import '../../scss/index.scss'
import SideBar from './SideBar'
import Content from './Content'


function Admin() { 
  const [isOpen,setMenu] = React.useState(false)
  return (
    <div className="admin">
      {/* sidebar */}
      <SideBar />
      
      
      {/* main content */}
      <Content />
    </div>
  );
}

export default Admin;
