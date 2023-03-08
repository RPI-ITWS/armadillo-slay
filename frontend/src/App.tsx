import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import Data from "../pages/Data"
import Visualizations from "../pages/Visualizations"
import APIDocs from "../pages/APIDocs"

if (location.pathname != "/") {
  Promise.all([
    import('./styles.css'),
  ])
} else {
  Promise.all([
    import('./App.css')
  ])
}

function App() {
  const [count, setCount] = useState(0)
  const [online, isOnline] = useState(false)

  if (location.pathname === "/") {
    isOnline(true);
    useEffect(() => {

      const healthCheck = async () => {

        try {
          const res = await fetch('/api/v1/health')
          const data = await res.json()
          console.log(data)
          if (data["status"] === "ok") {
            isOnline(true)
          }
        } catch (e) {
          console.error(e)
          isOnline(false)
        }
      }

      const interval = setInterval(() => {
        healthCheck()
      }
        , 1000)
      return () => clearInterval(interval)
    }, [])

  }

  function Index() {
    return (
      <div className="App">
        {online ? <div className="online status_indicator" /> : <div className="offline status_indicator" />}

        <div className="card">
          <h2>Getting Started</h2>
          <p>
            Observe the status indicator above. It should be green if the server is running.
          </p>
        </div>
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    )
  }
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/data" element={<Data />} />
      <Route path="/visualizations" element={<Visualizations />} />
      <Route path="/documents" element={<APIDocs />} />
    </Routes>
  )
}

export default App
