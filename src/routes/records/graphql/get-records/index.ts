import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'
import { useSelector } from 'store'
import moment from 'moment'

const GET_RECORDS = loader('./query.gql')

export interface IRecord {
  _id: string
  training: {
    _id: string
    date: string
    gym: {
      _id: string
      shortName: string
    }
    type: string
  }
  resource: {
    startTime: number
    endTime: number
    trainer: {
      _id: string
      firstName: string
      lastName: string
    }
  }
  contact: {
    _id: string
    firstName: string
    lastName: string
  }
}

export interface IGetRecords {
  trainingRecords: IRecord[]
}

export const useGetRecordsQuery = () => {
  const filters = useSelector(state => state.records.page.filters)

  const minDate = moment(filters.date).startOf('month').utc().format()
  const maxDate = moment(filters.date).startOf('month').add(1, 'month').utc().format()

  const result = useQuery<IGetRecords>(GET_RECORDS, {
    variables: {
      minDate,
      maxDate,
      trainer: filters.trainer ? { _id: filters.trainer } : null,
      gym: filters.gym,
      types: filters.types.length > 0 ? filters.types : null,
    },
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetRecordsQuery
