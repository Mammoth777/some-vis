import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='app'>
      <main className='main'>
        <Outlet></Outlet>
      </main>
    </div>
  )
}

export default App
