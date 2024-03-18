import { useState, useEffect } from 'react'
import worker from './worker?worker'
const w = new worker()
import './App.css'
function App() {
  const [grid, setGrid] = useState<string[][]>()
  const [placements, setPlacements] =
    useState<Array<[string, Array<[number, number]>]>>()
  const [rotations, setRotations] = useState<
    [number | undefined, Array<string> | undefined]
  >([undefined, undefined])
  const [showAns, setShowAns] = useState<boolean>(false)
  useEffect(() => {
    w.onmessage = (e) => {
      setGrid(e.data[0])
      const r = []
      for (let i = 0; i < e.data[1].length; ++i) {
        const deg = ['90', '180', '270'][Math.floor(Math.random() * 3)]
        r.push(deg)
      }
      setRotations([undefined, r])
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
        onClick={() => {
          setShowAns((prev) => !prev)
          setRotations([undefined, rotations[1]])
        }}
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
                    zIndex:
                      cidx === 0 ? '1000' : rotations[0] === ridx ? '500' : '0',
                    border: rotations[0] === ridx ? 'solid white' : 'none',
                    backgroundColor:
                      cidx === 0
                        ? grid[c[0]][c[1]].slice(3)
                        : grid[c[0]][c[1]].slice(1),
                    gridRow: `${c[0] + 1} / ${c[0] + 1}`,
                    gridColumn: `${c[1] + 1} / ${c[1] + 1}`,
                    transformOrigin: `${(place[1][0][1] - c[1]) * 75 + 75 / 2}px ${(place[1][0][0] - c[0]) * 75 + 75 / 2}px`,
                    transform:
                      rotations[1] && `rotate(${rotations[1][ridx]}deg)`,
                    animation:
                      rotations[0] === ridx && rotations[1]
                        ? `0.2s ease-out forwards ${(() => {
                            switch (rotations[1][ridx]) {
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
                        setRotations((prevR) => {
                          if (prevR[1]) {
                            const newR = [...prevR[1]]
                            const oldRValue = parseInt(newR[ridx])
                            newR[ridx] = ((oldRValue + 90) % 360).toString()
                            return [ridx, newR]
                          }
                          return prevR
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
