import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import useGetTrainingsQuery from '../queries/get-trainings'
import { GET_TRAINING_RESOURCE } from '../queries/get-training-resource'
import { ITrainingForm } from 'interfaces/training'

export const DELETE_TRAINING_RESOURCE = gql`
  mutation deleteTrainingResource ($trainingId: ObjectId, $links: [ObjectId], $_id: ObjectId!) {
    deleteOneTrainingResource(query: { _id: $_id }) {
      _id
    }
    updateOneTraining(query: { _id: $trainingId }, set: { resources: { link: $links } }) {
      _id
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
    }
  }
`

const useDeleteTrainingResource = () => {
  const trainings = useGetTrainingsQuery()
  const [deleteOneTrainingResource] = useMutation(DELETE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (training: ITrainingForm, _id: string) => {
      const tr = trainings.data?.trainings.find(tr => tr._id === training._id)
      const links = tr?.resources.map(r => r._id).filter(l => l !== _id) || []

      return deleteOneTrainingResource({
        variables: { trainingId: tr?._id, links, _id },
        update: (client, { data }) => {
          client.writeQuery({
            query: GET_TRAINING_RESOURCE,
            variables: {
              _id: data.deleteOneTrainingResource._id,
            },
            data: null,
          })
        },
      })
    },
    [deleteOneTrainingResource, trainings]
  )

  return mutate
}

export default useDeleteTrainingResource
