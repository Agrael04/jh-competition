import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetGymsResponse {
  gyms: Array<{
    _id: string
    name: string
    __typename: string
  }>
  resources: Array<{
    _id: string
    name: string
    shortName: string
    type: string
    gym: {
      _id: string
    }
  }>
}

export const GET_GYMS = gql`
  query getGyms{
    gyms {
      _id
      name
    }
    resources {
      _id
      name
      shortName
      type
      gym {
        _id
      }
    }
  }
`

export const useGetTrainingsQuery = () => {
  const result = useQuery<IGetGymsResponse>(GET_GYMS)

  return result
}

export default useGetTrainingsQuery
