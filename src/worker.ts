import { colors, orientations, shapes } from './shapes.ts'
function partition(
  grid: string[][],
  groupings: Array<[string, Array<[number, number]>]>,
  obj: {
    stop: boolean
    groupings: Array<[string, Array<[number, number]>]>
    result: string[][] | null
  }
) {
  if (obj.stop) {
    return
  }
  for (let r = 0; r < 8; ++r) {
    for (let c = 0; c < 8; ++c) {
      if (grid[r][c] === ' ') {
        function placeShape() {
          let placed = false
          let indices: Array<number> = []
          while (indices.length < shapes.length) {
            let i = Math.floor(Math.random() * shapes.length)
            while (indices.includes(i)) {
              i = Math.floor(Math.random() * shapes.length)
            }
            indices.push(i)
          }
          for (let i of indices) {
            let s = shapes[i]
            let orientation_indices: Array<number> = []
            while (orientation_indices.length < orientations[s].length) {
              let i = Math.floor(Math.random() * orientations[s].length)
              while (orientation_indices.includes(i)) {
                i = Math.floor(Math.random() * orientations[s].length)
              }
              orientation_indices.push(i)
            }
            for (let ori_idx of orientation_indices) {
              let coords = orientations[s][ori_idx]
              let valid = coords.reduce(
                (a, e) =>
                  a &&
                  r + e[0] >= 0 &&
                  r + e[0] < grid.length &&
                  c + e[1] >= 0 &&
                  c + e[1] < grid[r].length &&
                  grid[r + e[0]][c + e[1]] === ' ',
                true
              )
              if (valid) {
                placed = true
                let clone = structuredClone(grid)
                let color = colors[Math.floor(Math.random() * colors.length)]
                let new_groupings = structuredClone(groupings)
                let group: Array<[number, number]> = []
                coords.forEach((e) => {
                  group.push([r + e[0], c + e[1]])
                  clone[r + e[0]][c + e[1]] =
                    (e[0] === 0 && e[1] === 0 ? 'c;' : '') + s + color
                })
                new_groupings.push([s, group])
                partition(clone, new_groupings, obj)
              }
            }
          }
          return placed
        }
        if (!placeShape()) {
          return
        }
      }
    }
  }
  let space_count = 0
  for (let r = 0; r < 8; ++r) {
    for (let c = 0; c < 8; ++c) {
      if (grid[r][c] === ' ') {
        ++space_count
      }
    }
  }
  if (space_count === 0) {
    obj.stop = true
    obj.groupings = structuredClone(groupings)
    obj.result = structuredClone(grid)
  }
  return
}
let grid = [
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
]
let obj: {
  stop: boolean
  groupings: Array<[string, Array<[number, number]>]>
  result: string[][]
} = {
  stop: false,
  groupings: [],
  result: grid,
}
partition(grid, [], obj)
postMessage([obj.result, obj.groupings])
