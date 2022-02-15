import {
  Cross1Icon,
  Cross2Icon,
  ReloadIcon,
  ResetIcon,
  ValueIcon,
} from '@radix-ui/react-icons'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { getWiningCombo } from '../minimax'
import useGameState from '../use-game-state'

import styles from './index.module.scss'

const Home: NextPage = () => {
  const [{ board, turn, isCompleted, hasWinner }, dispatch] = useGameState()
  // console.log(board)
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-24 transition-opacity">
      <div
        className={classNames(
          styles.board,

          isCompleted &&
            !hasWinner && [styles['board--highlight'], 'opacity-50']
        )}
      >
        {Array(9)
          .fill(null)
          .map((_, i) => {
            const position: IPosition = [Math.floor(i / 3), i % 3]
            const value = board[position[0]][position[1]]
            const isHighlighted = !!getWiningCombo(board)?.includes(i)
            return (
              <button
                key={i}
                onClick={() => {
                  dispatch({
                    position,
                    value: 'x',
                    type: 'player-move',
                  })
                }}
                disabled={turn === 'computer' || isCompleted || !!value}
                className={classNames(
                  'flex justify-center items-center lg:rounded-lg w-24 h-24 lg:w-36 lg:h-36 border-slate-700 border-2 lg:border-4 disabled:cursor-not-allowed cursor-pointer transition-all',
                  {
                    'bg-amber-100': isHighlighted,
                  }
                )}
              >
                {value && (
                  <span>
                    {value === 'x' ? (
                      <Cross1Icon
                        className={classNames(
                          'text-blue-500 w-16 h-16 lg:w-24 lg:h-24'
                        )}
                      />
                    ) : (
                      <ValueIcon
                        strokeWidth={8}
                        className={classNames(
                          'text-indigo-500 w-16 h-16 lg:w-24 lg:h-24',
                          isHighlighted && styles.highlight
                        )}
                      />
                    )}
                  </span>
                )}
              </button>
            )
          })}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className="space-x-4 flex items-center px-16 py-4 text-xl rounded-md bg-teal-500 text-white font-bold"
        >
          <ReloadIcon className="w-5 h-5" />
          <span>Reset Game</span>
        </button>
      </div>
    </div>
  )
}

export default Home
