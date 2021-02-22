import { useCallback } from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import range from 'lodash/range'

import { updateQuery } from 'utils/apollo-cache-updater'

import ITrainingForm from 'routes/schedule/training-dialog/training-form/form'

import { GET_TRAINING_RESOURCE, IGetTrainingResourceResponse } from '../../queries/get-training-resource'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: NewTrainingInsertInput!) {
    insertOneNewTraining(data: $training) {
      _id
      type
      name
      note
      date
      startTime
      endTime
      resource {
        _id
      }
      gym {
        _id
      }
      trainer {
        _id
        color
        avatarSrc
        firstName
        lastName
      }
    }
  }
`

interface IMutationResponse {
  insertOneNewTraining: {
    _id: string
    __typename: string
    type: string
    name: string
    note: string
    date: Date
    startTime: number
    endTime: number
    gym: {
      _id: string
      __typename: string
    }
    resource: {
      _id: string
      __typename: string
    }
    trainer: {
      _id: string
      __typename: string
      color: number
      avatarSrc: string
      firstName: string
      lastName: string
    }
  }
}

const useCreateTraining = () => {
  const [mutation] = useMutation<IMutationResponse>(CREATE_TRAINING)

  const mutate = useCallback(
    (training: ITrainingForm) => {
      console.log(training)
      return mutation({
        variables: {
          training,
        },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)

          if (!data) {
            return
          }

          range(training.startTime, training.endTime).forEach(
            time => {
              boundUpdateCachedQuery<IGetTrainingResourceResponse>({
                query: GET_TRAINING_RESOURCE,
                variables: {
                  time,
                  resource: training.resource.link,
                  date: training.date,
                },
                updater: () => ({
                  newTraining: data.insertOneNewTraining,
                  trainingRecords: [],
                }),
              })
            }
          )
        },
      })
    },
    [mutation]
  )

  return mutate
}

export default useCreateTraining
