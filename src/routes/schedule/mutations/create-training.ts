import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { GET_TRAINING_RESOURCES } from '../queries/get-training-resources'
import { ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

export const CREATE_TRAINING = gql`
  mutation createTraining ($training: TrainingInsertInput!, $resources: [TrainingResourceInsertInput!]!) {
    insertOneTraining(data: $training) {
      _id
      date
      startTime
      endTime
      gym {
        _id
      }

      name
      note
      type
      traineesCount
    }
    insertManyTrainingResources(data: $resources) {
      insertedIds
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm, rawResources: ITrainingResourceForm[]) => {
      const trainingsQuery = { query: GET_TRAINING, variables: { id: training._id } }
      const trainingResourcesQuery = { query: GET_TRAINING_RESOURCES, variables: { date: new Date(training.date) } }

      const resources = rawResources.map(r => ({
        ...r,
        date: training.date,
        training: { link: training._id.toString() },
      }))

      return createTraining({
        variables: { training, resources },
        refetchQueries: [trainingsQuery, trainingResourcesQuery],
      })
    },
    [createTraining]
  )

  return mutate
}

export default useCreateTraining
