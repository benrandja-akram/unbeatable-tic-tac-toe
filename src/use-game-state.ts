import { useReducer } from 'react'

type IValue = 'x' | 'o' | undefined
type IRow = [IValue, IValue, IValue]
type IBoard = [IRow, IRow, IRow]
type IAction = { value: IValue; position: [number, number] }

const reducer = (board: IBoard, action: IAction) => {
  if (board[action.position[0]][action.position[1]]) return board
  const newBoard: IBoard = [...board]
  newBoard[action.position[0]][action.position[1]] = action.value

  return newBoard
}
const initialState: IBoard = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
]
export default function useGameState() {
  const [board, dispatch] = useReducer(reducer, initialState)

  return {
    board,
    dispatch,
  }
}
