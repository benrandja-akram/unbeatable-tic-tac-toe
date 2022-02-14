import { Cross1Icon, Cross2Icon, ValueIcon } from '@radix-ui/react-icons'
import classNames from 'classnames'
import type { NextPage } from 'next'
import { getWiningCombo } from '../minimax'
import useGameState from '../use-game-state'

import styles from './index.module.scss'

type BoxProps = React.ComponentProps<'button'> & {
  position: IPosition
  dispatch: (action: IAction) => void
  value: 'x' | 'o' | undefined
  turn: 'computer' | 'player'
  winner: boolean
}

function Box({
  className = '',
  position,
  dispatch,
  children,
  value,
  turn,
  winner,
  ...props
}: BoxProps) {
  return (
    <button
      onClick={() => dispatch({ position, value: 'x', player: 'player' })}
      disabled={turn === 'computer'}
      className={classNames(
        'flex justify-center items-center rounded-lg w-40 h-40 border-slate-700 border-4 disabled:cursor-not-allowed cursor-pointer transition-colors',
        className,
        {
          'hover:bg-slate-50': !props.disabled,
          'text-slate-800': !winner,
          'text-amber-600': winner,
        }
      )}
      {...props}
    >
      {value && (
        <span className="">
          {value === 'x' ? (
            <Cross1Icon className="w-28 h-28" />
          ) : (
            <ValueIcon className="w-28 h-28" />
          )}
        </span>
      )}
    </button>
  )
}

const Home: NextPage = () => {
  const [{ board, turn, isCompleted }, dispatch] = useGameState()

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={styles.board}>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Box
              key={i}
              position={[Math.floor(i / 3), i % 3]}
              dispatch={dispatch}
              value={board[Math.floor(i / 3)][i % 3]}
              turn={turn}
              winner={isCompleted && !!getWiningCombo(board)?.includes(i)}
              disabled={
                isCompleted ||
                turn === 'computer' ||
                !!board[Math.floor(i / 3)][i % 3]
              }
            />
          ))}
      </div>
    </div>
  )
}

export default Home
