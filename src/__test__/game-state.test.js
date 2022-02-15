import { reducer } from '../use-game-state'

const makeState = () => ({
  board: [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ],
  turn: 'player',
  sound: true,
})
describe('Game State', () => {
  test('Should change board and give turn to computer.', () => {
    const state = makeState()

    let next = reducer(state, { type: 'player-move', position: [0, 0] })
    expect(next).toEqual({
      board: [
        ['x', undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      turn: 'computer',
      sound: true,
    })
  })

  test('Should not change when its not the turn of player.', () => {
    const state = makeState()

    let next = reducer(state, { type: 'player-move', position: [0, 0] })
    expect(next).toEqual({
      board: [
        ['x', undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      turn: 'computer',
      sound: true,
    })
    next = reducer(next, { type: 'player-move', position: [1, 0] })
    expect(next).toEqual({
      board: [
        ['x', undefined, undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      turn: 'computer',
      sound: true,
    })
  })
  test('Should not change when the cell is already filled.', () => {
    const state = makeState()

    let next = reducer(state, { type: 'player-move', position: [0, 0] })

    next = reducer(next, { type: 'computer-move' })
    next = reducer(next, { type: 'player-move', position: [0, 0] })
    expect(next.board[0][0]).toEqual('x')
    expect(next.turn).toEqual('player')
  })
  test('Should make a move when its computer turn.', () => {
    const state = makeState()

    let next = reducer(state, { type: 'player-move', position: [0, 0] })
    const lastBoard = next.board
    next = reducer(next, { type: 'computer-move' })

    expect(next.turn).toEqual('player')
    expect(next.board).not.toEqual(lastBoard)
    expect(next.board.flat()).toContain('o')
  })

  test('Should reset game when sending reset action.', () => {
    const state = makeState()

    let next = reducer(state, { type: 'player-move', position: [0, 0] })
    next = reducer(next, { type: 'computer-move' })
    next = reducer(next, { type: 'player-move', position: [2, 0] })
    next = reducer(next, { type: 'reset' })

    expect(next).toEqual(makeState())
  })
  test('Should toggle sound when sending toggle-sound action.', () => {
    const state = makeState()

    const next = reducer(state, { type: 'toggle-sound' })

    const newState = makeState()
    newState.sound = false
    expect(next).toEqual(newState)
  })
  test('Should not reset sound when sending reset action.', () => {
    const state = makeState()

    let next = reducer(state, { type: 'player-move', position: [0, 0] })
    next = reducer(next, { type: 'computer-move' })
    next = reducer(next, { type: 'player-move', position: [2, 0] })
    next = reducer(next, { type: 'toggle-sound' })
    next = reducer(next, { type: 'reset' })
    const newState = makeState()
    newState.sound = false
    expect(next).toEqual(newState)
  })
})
