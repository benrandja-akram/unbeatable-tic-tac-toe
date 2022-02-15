import minimax from '../minimax'

describe('MiniMax Algorithms', () => {
  test('Computer must prevent player from winning.', () => {
    const position = minimax([
      ['x', 'x', undefined],
      ['o', undefined, undefined],
      [undefined, undefined, undefined],
    ])
    expect(position).toEqual([0, 2])
  })
  test('Computer must win.', () => {
    const position = minimax([
      ['o', 'o', undefined],
      ['x', 'x', undefined],
      [undefined, undefined, undefined],
    ])
    expect(position).toEqual([0, 2])
  })
  test('Computer must make guaranteed win.', () => {
    const position = minimax([
      ['o', 'x', 'x'],
      [undefined, 'x', undefined],
      [undefined, 'o', undefined],
    ])
    expect(position).toEqual([2, 0])
  })
})
