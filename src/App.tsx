import { useState, useEffect } from 'react'
import './App.css'
function partition(grid: string[][]): string[][] {
  for (let r = 0; r < 8; ++r) {
    for (let c = 0; c < 8; ++c) {}
  }
}
function App() {
  const [grid, setGrid] = useState<string[][]>(
    new Array(8).fill(new Array(8).fill(' '))
  )
  useEffect(() => {
    setGrid(partition(grid))
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
      <div className="container"></div>
    </div>
  )
}

export default App
