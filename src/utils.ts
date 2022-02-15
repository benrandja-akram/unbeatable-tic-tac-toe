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
function cloneBoard(board: IBoard) {
  const cloned: IBoard = [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      cloned[i][j] = board[i][j]
    }
  }
  return cloned
}

export { isBoardCompleted, evaluateBoard, getWiningCombo, cloneBoard }
