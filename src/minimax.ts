import clone from 'lodash/cloneDeep'

type EnhancedBoard = { board: IBoard; position: IPosition }

function minimax(board: IBoard) {
  const start = Date.now()

  const pos = max(...generateBoards(board, 'o')).position
  console.log(Date.now() - start)
  return pos
}
function max(...boards: EnhancedBoard[]): {
  value: number
  position: IPosition
} {
  if (boards.some((b) => evaluateBoard(b.board) || isBoardCompleted(b.board))) {
    let evaluations: number[] = []
    for (const board of boards) {
      const value = evaluateBoard(board.board)

      evaluations.push(value)
      if (value === 1) break
    }
    const max = Math.max(...evaluations)
    return {
      value: max,
      position: boards[evaluations.findIndex((ev) => ev === max)].position,
    }
  }

  const evaluation = boards.map((b) =>
    min(...generateBoards(b.board, 'x', b.position))
  )
  const max = Math.max(...evaluation.map((ev) => ev.value))

  return {
    value: max,
    position: boards[evaluation.findIndex((ev) => ev.value === max)].position,
  }
}

function min(...boards: EnhancedBoard[]): {
  value: number
  position: IPosition
} {
  if (boards.some((b) => evaluateBoard(b.board) || isBoardCompleted(b.board))) {
    let evaluations: number[] = []
    for (const board of boards) {
      const value = evaluateBoard(board.board)

      evaluations.push(value)
      if (value === -1) break
    }
    const max = Math.max(...evaluations)
    return {
      value: max,
      position: boards[evaluations.findIndex((ev) => ev === max)].position,
    }
  }

  const evaluation = boards.map((b) =>
    max(...generateBoards(b.board, 'o', b.position))
  )
  const min = Math.min(...evaluation.map((ev) => ev.value))

  return {
    value: min,
    position: boards[evaluation.findIndex((ev) => ev.value === min)].position,
  }
}

function generateBoards(
  board: IBoard,
  value: IValue,
  originalPosition?: IPosition
) {
  const emptyPositions: IPosition[] = []
  for (let i = 0; i < 9; i++) {
    if (!board[Math.floor(i / 3)][i % 3]) {
      emptyPositions.push([Math.floor(i / 3), i % 3])
    }
  }

  return emptyPositions.map((position) => {
    const newBoard = clone(board)
    newBoard[position[0]][position[1]] = value
    return { board: newBoard, position: originalPosition || position }
  })
}

function isBoardCompleted(board: IBoard) {
  return board.flat().every(Boolean)
}

const winnerPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
function evaluateBoard(board: IBoard) {
  if (
    winnerPositions.some((positions) => {
      return positions.every(
        (pos) => board[Math.floor(pos / 3)][pos % 3] === 'x'
      )
    })
  ) {
    return -1
  }
  if (
    winnerPositions.some((positions) =>
      positions.every((pos) => board[Math.floor(pos / 3)][pos % 3] === 'o')
    )
  ) {
    return 1
  }
  return 0
}

// Computer wins || no winner
function getWiningCombo(board: IBoard) {
  return winnerPositions.find((positions) => {
    return positions.every((pos) => board[Math.floor(pos / 3)][pos % 3] === 'o')
  })
}

export { isBoardCompleted, evaluateBoard, getWiningCombo }
export default minimax
