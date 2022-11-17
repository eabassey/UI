import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Logout } from './components/Logout/Logout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="Todos---Web">
      <Logout/>
    </div>
  )
}

export default App
