type IValue = 'x' | 'o' | undefined
type IPosition = [number, number]
type IRow = [IValue, IValue, IValue]
type IBoard = [IRow, IRow, IRow]
type IAction =
  | {
      player: 'player'
      value: IValue
      position: IPosition
    }
  | { player: 'computer' }
type IState = {
  board: IBoard
  turn: 'computer' | 'player'
  isCompleted: boolean
}
