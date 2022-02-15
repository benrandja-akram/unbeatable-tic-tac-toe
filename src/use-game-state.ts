import { useEffect, useReducer, useRef } from 'react'
import clone from 'lodash/cloneDeep'
import minimax, { evaluateBoard, isBoardCompleted } from './minimax'

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'reset':
      return initialState

    case 'player-move': {
      if (state.isCompleted) return state
      if (state.board[action.position[0]][action.position[1]]) return state

      const newBoard: IBoard = clone(state.board) // immutability
      newBoard[action.position[0]][action.position[1]] = action.value

      return {
        turn: 'computer',
        board: newBoard,
        hasWinner: !!evaluateBoard(newBoard),
        isCompleted: !!evaluateBoard(newBoard) || isBoardCompleted(newBoard),
      }
    }

    case 'computer-move': {
      if (state.isCompleted) return state

      const newBoard: IBoard = clone(state.board) // immutability
      const position = minimax(state.board)
      newBoard[position[0]][position[1]] = 'o'

      return {
        turn: 'player',
        board: newBoard,
        hasWinner: !!evaluateBoard(newBoard),
        isCompleted: !!evaluateBoard(newBoard) || isBoardCompleted(newBoard),
      }
    }
    default:
      return state
  }
}

const initialState: IState = {
  board: [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ],
  turn: 'player',
}

export default function useGameState() {
  const [game, dispatch] = useReducer(reducer, initialState)
  const playerSound = useRef<any>()
  const computerSound = useRef<any>()
  const gameOverSound = useRef<any>()
  const hasWinnerSound = useRef<any>()

  const gameRef = useRef(game)
  gameRef.current = game

  useEffect(() => {
    playerSound.current = new Audio('/note.mp3')
    computerSound.current = new Audio('/note-low.mp3')
    gameOverSound.current = new Audio('/game-over.mp3')
    hasWinnerSound.current = new Audio('/game-over-tie.mp3')

    playerSound.current.addEventListener('ended', () => {
      dispatch({ type: 'computer-move' })
    })
  }, [])

  useEffect(() => {
    if (!game.board.flat().some(Boolean)) return
    if (game.hasWinner) {
      hasWinnerSound.current.play()
      return
    }
    if (game.isCompleted) {
      gameOverSound.current.play()
      return
    }

    if (game.turn === 'computer') {
      playerSound.current.play()
    }
    if (game.turn === 'player') {
      computerSound.current.play()
    }
  }, [game.isCompleted, game.turn, game.board, game.hasWinner])

  return [
    game,
    (action: IAction) => {
      dispatch(action)
      if (action.type === 'player-move' && game.turn === 'player') {
        playerSound.current.play()
      }
    },
  ] as [IState, (action: IAction) => void]
}
