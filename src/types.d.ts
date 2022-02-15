type IValue = 'x' | 'o' | undefined
type IPosition = [number, number]
type IRow = [IValue, IValue, IValue]
type IBoard = [IRow, IRow, IRow]
type IAction =
  | {
      type: 'player-move'
      value: IValue
      position: IPosition
    }
  | { type: 'computer-move' }
  | { type: 'reset' }
  | { type: 'toggle-sound' }

type IState = {
  board: IBoard
  turn: 'computer' | 'player'
  sound: boolean
}
