import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'store'
import { loader } from 'graphql.macro'

import IQueryResponse from './query'

const GET_TRAINING_RESOURCE = loader('./query.gql')

export const useGet = (time: number, resource: string) => {
  const filters = useSelector(state => state.ui.pages.schedule.page.filters)

  const result = useQuery<IQueryResponse>(GET_TRAINING_RESOURCE, {
    variables: {
      time,
      resource,
      date: filters.date.toDate(),
    },
  })

  return result
}

export default useGet
