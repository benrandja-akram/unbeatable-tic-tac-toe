import { cloneBoard, evaluateBoard, isBoardCompleted } from './utils'

type BoardState = { board: IBoard; position: IPosition }

function minimax(board: IBoard) {
  return max(...generateBoards(board, 'o')).position
}

function max(...boards: BoardState[]): {
  value: number
  position: IPosition
} {
  const maxBoard = findBoard(boards, Math.max)
  if (maxBoard) return maxBoard

  const evaluation = boards.map((b) =>
    min(...generateBoards(b.board, 'x', b.position))
  )
  const max = Math.max(...evaluation.map((ev) => ev.value))

  return {
    value: max,
    position: boards[evaluation.findIndex((ev) => ev.value === max)].position,
  }
}

function min(...boards: BoardState[]): {
  value: number
  position: IPosition
} {
  const minBoard = findBoard(boards, Math.min)
  if (minBoard) return minBoard

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
    const newBoard = cloneBoard(board)
    newBoard[position[0]][position[1]] = value
    return { board: newBoard, position: originalPosition || position }
  })
}

function findBoard(
  boards: BoardState[],
  operator: (...values: number[]) => number
) {
  if (boards.some((b) => evaluateBoard(b.board) || isBoardCompleted(b.board))) {
    let evaluations = boards.map((state) => evaluateBoard(state.board))

    const bestValue = operator(...evaluations)
    return {
      value: bestValue,
      position:
        boards[evaluations.findIndex((ev) => ev === bestValue)].position,
    }
  }
}

export default minimax
