import { useCallback } from 'react'
import range from 'lodash/range'

import { MAX_TIME_ID } from 'data/times'

import useRead from './read'

export const useReadNext = () => {
  const read = useRead()

  const fn = useCallback(
    (time: number, resource: string, date?: Date) => {
      return range(time, MAX_TIME_ID)
        .map(t => read(t, resource, date))
        .find(t => !!t?.newTraining)
    }, [read]
  )

  return fn
}

export default useReadNext
