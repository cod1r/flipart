import { useState, useEffect } from 'react'
import worker from './worker?worker'
const w = new worker()
import './App.css'
function App() {
  const [grid, setGrid] = useState<string[][]>()
  const [placements, setPlacements] =
    useState<Array<[string, Array<[number, number]>]>>()
  const [rotations, setRotations] = useState<Array<string>>()
  const [showAns, setShowAns] = useState<boolean>(false)
  const [focus, setFocus] = useState<number>()
  useEffect(() => {
    w.onmessage = (e) => {
      setGrid(e.data[0])
      let r = []
      for (let i = 0; i < e.data[1].length; ++i) {
        let deg = ['90', '180', '270'][Math.floor(Math.random() * 3)]
        r.push(deg)
      }
      setRotations(r)
      setPlacements(e.data[1])
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
      <button
        style={{
          position: 'absolute',
          top: '80%',
          bottom: '0',
          left: '50px',
          height: '100px',
        }}
        onClick={() => setShowAns((prev) => !prev)}
      >
        {!showAns ? 'show answer' : 'hide answer'}
      </button>
      <div className="container">
        {!showAns
          ? grid &&
            rotations &&
            placements &&
            placements.map((place, ridx) =>
              place[1].map((c, cidx) => (
                <div
                  key={`${ridx}-${cidx}`}
                  style={{
                    position: 'relative',
                    zIndex: cidx === 0 ? '1000' : focus === ridx ? '500' : '0',
                    border: focus === ridx ? 'solid white' : 'none',
                    backgroundColor:
                      cidx === 0
                        ? grid[c[0]][c[1]].slice(3)
                        : grid[c[0]][c[1]].slice(1),
                    gridRow: `${c[0] + 1} / ${c[0] + 1}`,
                    gridColumn: `${c[1] + 1} / ${c[1] + 1}`,
                    transformOrigin: `${(place[1][0][1] - c[1]) * 75 + 75 / 2}px ${(place[1][0][0] - c[0]) * 75 + 75 / 2}px`,
                    transform: `rotate(${rotations[ridx]}deg)`,
                    animation:
                      focus === ridx
                        ? `0.2s ease-out forwards ${(() => {
                            switch (rotations[ridx]) {
                              case '0':
                                return 'two-seventy-to-three-sixty'
                              case '90':
                                return 'zero-to-ninety'
                              case '180':
                                return 'ninety-to-one-eighty'
                              case '270':
                                return 'one-eighty-to-two-seventy'
                            }
                          })()}`
                        : '',
                  }}
                >
                  {cidx === 0 ? (
                    <div
                      onClick={() => {
                        setFocus(ridx)
                        setRotations((prevR) => {
                          if (prevR) {
                            let newR = [...prevR]
                            let oldRValue = parseInt(newR[ridx])
                            newR[ridx] = ((oldRValue + 90) % 360).toString()
                            return newR
                          }
                        })
                      }}
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
                          transform: 'rotate(45deg)',
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
            )
          : grid &&
            grid.map((r, ridx) =>
              r.map((c, cidx) => (
                <div
                  key={`${ridx}-${cidx}`}
                  style={{
                    backgroundColor: c[0] === 'c' ? c.slice(3) : c.slice(1),
                  }}
                >
                  {c[0] === 'c' && (
                    <div
                      style={{
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
                          transform: 'rotate(45deg)',
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
                  )}
                </div>
              ))
            )}
      </div>
    </div>
  )
}

export default App
