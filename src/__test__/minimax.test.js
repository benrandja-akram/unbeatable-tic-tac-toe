import minimax from '../minimax'

describe('MiniMax Algorithms', () => {
  test('Computer must prevent player from winning.', () => {
    let position = minimax([
      ['x', 'x', undefined],
      ['o', undefined, undefined],
      [undefined, undefined, undefined],
    ])
    expect(position).toEqual([0, 2])

    position = minimax([
      ['x', undefined, undefined],
      ['x', 'o', undefined],
      [undefined, undefined, undefined],
    ])
    expect(position).toEqual([2, 0])
  })
  test('Computer must win.', () => {
    let position = minimax([
      ['o', 'o', undefined],
      ['x', 'x', undefined],
      [undefined, undefined, undefined],
    ])
    expect(position).toEqual([0, 2])

    position = minimax([
      ['o', 'x', undefined],
      ['o', 'x', undefined],
      [undefined, undefined, undefined],
    ])
    expect(position).toEqual([2, 0])
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
