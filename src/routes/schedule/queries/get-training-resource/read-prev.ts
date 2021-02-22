import { useCallback } from 'react'
import range from 'lodash/range'

import { MIN_TIME_ID } from 'data/times'

import useRead from './read'

export const useReadPrev = () => {
  const read = useRead()

  const fn = useCallback(
    (time: number, resource: string, date?: Date) => {
      return range(time - 1, MIN_TIME_ID)
        .map(t => read(t, resource, date))
        .find(t => !!t?.newTraining)
    }, [read]
  )

  return fn
}

export default useReadPrev
