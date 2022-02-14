import type { NextPage } from 'next'
import useGameState from '../use-game-state'

import styles from './index.module.scss'

type BoxProps = React.ComponentProps<'div'> & {
  position: [number, number]
  dispatch: ReturnType<typeof useGameState>['dispatch']
}

function Box({ className = '', position, dispatch, ...props }: BoxProps) {
  return (
    <div
      onClick={() => dispatch({ position, value: 'x' })}
      className={
        'flex justify-center items-center w-48 h-48 border-slate-500 border-4 cursor-pointer font-bold text-6xl ' +
        className
      }
      {...props}
    />
  )
}

const Home: NextPage = () => {
  const { board, dispatch } = useGameState()

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
            >
              {board[Math.floor(i / 3)][i % 3]}
            </Box>
          ))}
      </div>
    </div>
  )
}

export default Home
