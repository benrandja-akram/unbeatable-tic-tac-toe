import Link from 'next/link'
import type { NextPage } from 'next'
import {
  Cross1Icon,
  GitHubLogoIcon,
  ReloadIcon,
  ValueIcon,
} from '@radix-ui/react-icons'
import classNames from 'classnames'

import { getWiningCombo } from '../utils'
import useGameState from '../use-game-state'

import styles from './index.module.scss'

const Home: NextPage = () => {
  const [{ board, turn, isCompleted, hasWinner, sound }, dispatch] =
    useGameState()

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col space-y-12 lg:space-y-24 transition-opacity">
      <div className="flex justify-end space-x-4">
        <button
          onClick={() => dispatch({ type: 'toggle-sound' })}
          className="border p-2 rounded-md hover:bg-slate-50 text-gray-700 hover:scale-105 transition-transform"
        >
          {sound ? soundIcon : noSoundIcon}
        </button>
        <Link href="https://github.com/benrandja-akram/unbeatable-tic-tac-toe">
          <a
            target="_blank"
            className="border p-2 hover:border-sky-500 rounded-md hover:bg-sky-50 text-gray-700 hover:scale-105 transition-transform"
          >
            <GitHubLogoIcon className="h-5 w-5" />
          </a>
        </Link>
      </div>
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
                  'flex justify-center items-center w-24 h-24 lg:w-36 lg:h-36 border-slate-700 border-2 lg:border-4 disabled:cursor-not-allowed cursor-pointer transition-all rounded',
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
                          'text-violet-500 w-16 h-16 lg:w-24 lg:h-24',
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
          className="space-x-4 flex items-center px-16 py-4 text-xl rounded-md bg-teal-500 hover:bg-teal-400 transition-colors text-white font-bold w-[288px] lg:w-[432px] justify-center"
        >
          <ReloadIcon className="w-5 h-5" />
          <span>Reset Game</span>
        </button>
      </div>
    </div>
  )
}

const soundIcon = (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
      clipRule="evenodd"
    />
  </svg>
)
const noSoundIcon = (
  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

export default Home
