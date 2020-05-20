import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

export interface IGetContactPasses {
  trainingPasss: Array<{
    _id: string
    __typename: string
    contact: {
      _id: string
      fullName: string
      __typename: string
    }
    type: 'universal' | 'no_trainer' | 'child_sport' | 'adult_sport' | 'open'
    size: string
    capacity: number
    createdAt: Date
    activatedAt: Date
    activatesIn: Date
    expiresIn: Date
  }>
}

export const GET_CONTACT_PASSES = gql`
  query getContactPasses($_id: ObjectId){
    trainingPasss(query: {
      contact: {
        _id: $_id
      }
    }) {
      _id
      contact {
        _id
        fullName
      }
      type
      size
      capacity
      createdAt
      activatedAt
      activatesIn
      expiresIn
    }
  }
`

export const useGetContactPassesQuery = (date: Date, gym: string, contactId: string | null) => {
  const result = useQuery<IGetContactPasses>(GET_CONTACT_PASSES, {
    variables: { date, gym, _id: contactId },
    skip: !gym || !contactId,
    fetchPolicy: 'cache-and-network',
  })

  return result
}

export default useGetContactPassesQuery
