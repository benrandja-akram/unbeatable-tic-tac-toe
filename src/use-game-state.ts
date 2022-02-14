import { useReducer } from 'react'
import clone from 'lodash/cloneDeep'
import minimax, { evaluateBoard, isBoardCompleted } from './minimax'

const reducer = (state: IState, action: IAction): IState => {
  console.log(action)
  if (state.isCompleted) return state
  switch (action.player) {
    case 'player': {
      if (state.board[action.position[0]][action.position[1]]) return state
      const newBoard: IBoard = clone(state.board) // immutability
      newBoard[action.position[0]][action.position[1]] = action.value

      return {
        turn: 'computer',
        board: newBoard,
        isCompleted: !!evaluateBoard(newBoard) || isBoardCompleted(newBoard),
      }
    }
    case 'computer': {
      const newBoard: IBoard = clone(state.board) // immutability
      const position = minimax(state.board)
      newBoard[position[0]][position[1]] = 'o'

      return {
        turn: 'player',
        board: newBoard,
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
  isCompleted: false,
}

export default function useGameState() {
  const [game, dispatch] = useReducer(reducer, initialState)

  return [
    game,
    (action: IAction) => {
      dispatch(action)
      setTimeout(() => {
        dispatch({ player: 'computer' })
      }, 150)
    },
  ] as [IState, (action: IAction) => void]
}
