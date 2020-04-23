import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import useGetTrainingsQuery from '../queries/get-trainings'
import { GET_TRAINING_RESOURCE } from '../queries/get-training-resource'
import { ITrainingForm, ITrainingResourceForm } from 'interfaces/training'

export const CREATE_TRAINING_RESOURCE = gql`
  mutation createTrainingResource ($trainingId: ObjectId, $links: [ObjectId], $resource: TrainingResourceInsertInput!) {
    insertOneTrainingResource(data: $resource) {
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
        contact {
          fullName
        }
      }
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

const useCreateTrainingResource = () => {
  const trainings = useGetTrainingsQuery()
  const [createTrainingResource] = useMutation(CREATE_TRAINING_RESOURCE)

  const mutate = React.useCallback(
    (training: ITrainingForm, resource: ITrainingResourceForm) => {
      const tr = trainings.data?.trainings.find(tr => tr._id === training._id)
      const links = tr?.resources.map(r => r._id) || []
      links.push(resource._id!)

      return createTrainingResource({
        variables: { trainingId: tr?._id, links, resource },
        update: (client, { data }) => {
          client.writeQuery({
            query: GET_TRAINING_RESOURCE,
            variables: {
              _id: data.insertOneTrainingResource._id,
            },
            data: {
              trainingResource: data.insertOneTrainingResource,
            },
          })
        },
      })
    },
    [createTrainingResource, trainings]
  )

  return mutate
}

export default useCreateTrainingResource
