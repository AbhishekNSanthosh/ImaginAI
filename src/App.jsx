import { useState } from 'react'
import './App.css'
import Home from './Modules/Home/Home'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Home />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
