import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'store'

import ITrainingForm from 'routes/schedule/training-dialog/training-step/training-form/form'

import { GET_TRAINING, IGetTrainingResponse } from '../queries/get-training'

import { updateQuery } from 'utils/apollo-cache-updater'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!) {
    insertOneTraining(data: $training) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }
      name
      type
      traineesAmount
      note
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)
  const _id = useSelector(state => state.schedule.trainingDialog._id)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      return createTraining({
        variables: {
          training: {
            ...training,
            _id,
          },
        },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = () => ({
            training: data.insertOneTraining,
            trainingRecords: [],
            trainingResources: [],
          })

          boundUpdateCachedQuery<IGetTrainingResponse>({
            query: GET_TRAINING,
            variables: { id: _id },
            updater,
          })
        },
      })
    },
    [createTraining, _id]
  )

  return mutate
}

export default useCreateTraining
