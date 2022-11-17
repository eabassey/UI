import { useState } from 'react'
import './App.css'
import { Logout } from './components/Logout/Logout'
import { TodosContainer } from './components/Todos/TodosContainer/TodosContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="Todos---Web">
      <Logout/>
      <TodosContainer />
    </div>
  )
}

export default App
