import { useCallback } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { useSelector } from 'store'
import { loader } from 'graphql.macro'

import moment from 'moment'

import IQueryResponse from './query'

const GET_TRAINING_RESOURCE = loader('./query.gql')

export const useRead = () => {
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)
  const client = useApolloClient()

  const fn = useCallback(
    (time: number, resource: string, date?: Date) => {
      return client.readQuery<IQueryResponse>({
        query: GET_TRAINING_RESOURCE,
        variables: {
          time,
          resource,
          date: date ? moment(date).toDate() : filters.date.toDate(),
        },
      })
    }, [filters, client]
  )

  return fn
}

export default useRead
