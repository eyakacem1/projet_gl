import { useState } from 'react'

import './App.css'
import ClientForm from './components/ClientForm'
import SideBar from './components/SideBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SideBar/>
      <ClientForm/>
    </>
  )
}

export default App
