import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { ITrainingForm } from 'interfaces/training'

export const UPDATE_TRAINING = gql`
  mutation updateTraining ($_id: ObjectId!, $training: TrainingUpdateInput!) {
    updateOneTraining(query: { _id: $_id }, set: $training) {
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
      resources {
        _id
        startTime
        endTime
        resource {
          _id
        }
        trainer {
          _id
          color
          avatarSrc
        }
        records {
          _id
        }
      }
      records {
        _id
        contact {
          _id
          firstName
          lastName
        }
        attendant {
          _id
          firstName
          lastName
        }
        status
      }
    }
  }
`

const useUpdateTraining = () => {
  const [updateTraining] = useMutation(UPDATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm) => {
      return updateTraining({
        variables: { _id: training._id, training },
      })
    },
    [updateTraining]
  )

  return mutate
}

export default useUpdateTraining
