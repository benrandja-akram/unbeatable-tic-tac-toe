import { useEffect, useReducer, useRef } from 'react'
import minimax from './minimax'
import { cloneBoard, evaluateBoard, isBoardCompleted } from './utils'

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'toggle-sound':
      return { ...state, sound: !state.sound }
    case 'reset':
      return { ...initialState, sound: state.sound }

    case 'player-move': {
      if (isBoardCompleted(state.board)) return state
      if (state.board[action.position[0]][action.position[1]]) return state

      const newBoard: IBoard = cloneBoard(state.board) // immutability
      newBoard[action.position[0]][action.position[1]] = action.value

      return {
        ...state,
        turn: 'computer',
        board: newBoard,
      }
    }

    case 'computer-move': {
      if (isBoardCompleted(state.board)) return state

      const newBoard: IBoard = cloneBoard(state.board) // immutability
      const position = minimax(state.board)
      newBoard[position[0]][position[1]] = 'o'

      return {
        ...state,
        turn: 'player',
        board: newBoard,
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
  sound: true,
}

export default function useGameState() {
  const [game, dispatch] = useReducer(reducer, initialState)

  const playerSound = useRef<any>()
  const computerSound = useRef<any>()
  const gameOverSound = useRef<any>()
  const hasWinnerSound = useRef<any>()
  const hasWinner = !!evaluateBoard(game.board)
  const isCompleted =
    !!evaluateBoard(game.board) || isBoardCompleted(game.board)

  useEffect(() => {
    // initialize and prefetch audio files
    playerSound.current = new Audio('/note.mp3')
    computerSound.current = new Audio('/note-low.mp3')
    gameOverSound.current = new Audio('/game-over.mp3')
    hasWinnerSound.current = new Audio('/game-over-tie.mp3')
  }, [])

  useEffect(() => {
    // no sound or game has not yet started
    if (!game.sound || !game.board.flat().some(Boolean)) return
    if (hasWinner) {
      hasWinnerSound.current.play()
      return
    }
    if (isCompleted) {
      gameOverSound.current.play()
      return
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, game.turn, game.board, hasWinner])

  return [
    {
      ...game,
      hasWinner,
      isCompleted,
    },
    (action: IAction) => {
      dispatch(action)
      if (action.type === 'player-move') {
        if (game.sound) {
          playerSound.current.play()
        }
        setTimeout(() => {
          dispatch({ type: 'computer-move' })
          if (game.sound) computerSound.current.play()
        }, 150)
      }
      if (action.type === 'toggle-sound' && !game.sound) {
        computerSound.current.play()
      }
    },
  ] as [
    IState & { hasWinner: boolean; isCompleted: boolean },
    (action: IAction) => void
  ]
}
