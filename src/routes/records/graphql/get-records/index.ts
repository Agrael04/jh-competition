import { useQuery } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

const GET_TRAINING_PASSES = loader('./query.gql')

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
    name: string
    surname: string
  }
}

export interface IGetRecords {
  trainingRecords: IRecord[]
}

export const useGetRecordsQuery = () => {
  const result = useQuery<IGetRecords>(GET_TRAINING_PASSES, {
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetRecordsQuery
