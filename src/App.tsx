import { useState, useEffect } from 'react'
import './App.css'
function App() {
  const [grid, setGrid] = useState<string[][]>()
  useEffect(() => {
    import('./worker.ts').then((_) => {
      onmessage = (e) => {
        setGrid(e.data)
      }
    })
  }, [])
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="container">
        {grid?.map((row, ridx) =>
          row.map((c, cidx) => (
            <div
              key={`${ridx}-${cidx}`}
              style={{ backgroundColor: c.slice(1) }}
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
