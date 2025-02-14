import React from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap' 
import Navbar from './components/Navbar'
const App = () => {
  return (
    <>    
    <Navbar/>
    <main className='py-3'>
    <Container>
      <Outlet/>
    </Container>
  </main>
  </>
  )
}

export default App