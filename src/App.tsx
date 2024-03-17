import { useState, useEffect } from 'react'
import worker from './worker?worker'
const w = new worker()
import './App.css'
function App() {
  const [grid, setGrid] = useState<string[][]>()
  useEffect(() => {
    w.onmessage = (e) => {
      setGrid(e.data)
    }
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
        {grid &&
          grid.map((row, ridx) =>
            row.map((c, cidx) => (
              <div
                key={`${ridx}-${cidx}`}
                style={{
                  backgroundColor: c[0] === 'c' ? c.slice(3) : c.slice(1),
                }}
              >
                {c[0] === 'c' ? (
                  <div
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateRows: 'repeat(2, 1fr)',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                      }}
                    >
                      <div
                        style={{
                          margin: '5px',
                          width: '10px',
                          height: '10px',
                          backgroundColor: 'white',
                          borderRadius: '100%',
                        }}
                      ></div>
                      <div
                        style={{
                          margin: '5px',
                          width: '10px',
                          height: '10px',
                          backgroundColor: 'white',
                          borderRadius: '100%',
                        }}
                      ></div>
                      <div
                        style={{
                          margin: '5px',
                          width: '10px',
                          height: '10px',
                          backgroundColor: 'white',
                          borderRadius: '100%',
                        }}
                      ></div>
                      <div
                        style={{
                          margin: '5px',
                          width: '10px',
                          height: '10px',
                          backgroundColor: 'white',
                          borderRadius: '100%',
                        }}
                      ></div>
                    </div>
                  </div>
                ) : null}
              </div>
            ))
          )}
      </div>
    </div>
  )
}

export default App
