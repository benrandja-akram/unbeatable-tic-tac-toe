import { Cross1Icon, Cross2Icon, ValueIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { getWiningCombo } from '../minimax'
import useGameState from '../use-game-state'

import styles from './index.module.scss'

const Home: NextPage = () => {
  const [{ board, turn, isCompleted }, dispatch] = useGameState()

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-24">
      <div className={styles.board}>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <button
              key={i}
              onClick={() =>
                dispatch({
                  position: [Math.floor(i / 3), i % 3],
                  value: 'x',
                  type: 'player-move',
                })
              }
              disabled={turn === 'computer' || isCompleted}
              className={classNames(
                'flex justify-center items-center lg:rounded-lg w-24 h-24 lg:w-40 lg:h-40 border-slate-700 border-2 lg:border-4 disabled:cursor-not-allowed cursor-pointer transition-colors',
                {
                  'hover:bg-slate-50':
                    !isCompleted ||
                    turn === 'computer' ||
                    !!board[Math.floor(i / 3)][i % 3],
                  'text-slate-800':
                    !isCompleted && !!getWiningCombo(board)?.includes(i),
                  'text-amber-600':
                    isCompleted && !!getWiningCombo(board)?.includes(i),
                }
              )}
            >
              {board[Math.floor(i / 3)][i % 3] && (
                <span className="">
                  {board[Math.floor(i / 3)][i % 3] === 'x' ? (
                    <Cross1Icon className="w-16 h-16 lg:w-28 lg:h-28" />
                  ) : (
                    <ValueIcon className="w-16 h-16 lg:w-28 lg:h-28" />
                  )}
                </span>
              )}
            </button>
          ))}
      </div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => dispatch({ type: 'reset' })}
          className="px-16 py-4 text-xl rounded-md bg-teal-500 text-white font-bold"
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}

export default Home
