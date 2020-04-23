import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_TRAINING } from '../queries/get-training'
import { GET_TRAININGS, IGetTrainingsResponse } from '../queries/get-trainings'
import { ITrainingForm, ITrainingResourceForm, ITrainingRecordForm } from 'interfaces/training'

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
      traineesCount
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
          fullName
        }
        attendant {
          _id
          fullName
        }
        status
      }
    }
  }
`

const useCreateTraining = () => {
  const [createTraining] = useMutation(CREATE_TRAINING)

  const mutate = React.useCallback(
    (training: ITrainingForm, resources: ITrainingResourceForm[], records: ITrainingRecordForm[]) => {
      const t = {
        ...training,
        resources: { create: resources },
        records: {
          create: records.map(r => ({
            _id: r._id,
            status: r.status,
            contact: { link: r.contact.link },
            attendant: r.attendant ? { link: r.attendant.link } : null,
          })),
        },
      }

      return createTraining({
        variables: { training: t },
        update: (client, { data }) => {
          const trainingsData = client.readQuery<IGetTrainingsResponse>({
            query: GET_TRAININGS,
            variables: {
              date: new Date(training.date),
            },
          })

          client.writeQuery({
            query: GET_TRAINING,
            variables: {
              id: training._id,
            },
            data: {
              training: data.insertOneTraining,
            },
          })

          if (trainingsData) {
            client.writeQuery({
              query: GET_TRAININGS,
              variables: {
                date: new Date(training.date),
              },
              data: {
                trainings: [
                  ...trainingsData.trainings,
                  data.insertOneTraining,
                ],
              },
            })
          }
        },
      })
    },
    [createTraining]
  )

  return mutate
}

export default useCreateTraining
