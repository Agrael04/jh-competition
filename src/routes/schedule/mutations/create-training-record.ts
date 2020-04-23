import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import useGetTrainingsQuery from '../queries/get-trainings'
import { ITrainingForm, ITrainingRecordForm } from 'interfaces/training'

export const CREATE_TRAINING_RECORD = gql`
  mutation createTrainingRecord ($trainingId: ObjectId, $links: [ObjectId], $record: TrainingRecordInsertInput!) {
    insertOneTrainingRecord(data: $record) {
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
    updateOneTraining(query: { _id: $trainingId }, set: { records: { link: $links } }) {
      _id
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

const useCreateTrainingRecord = () => {
  const trainings = useGetTrainingsQuery()
  const [createTrainingRecord] = useMutation(CREATE_TRAINING_RECORD)

  const mutate = React.useCallback(
    (training: ITrainingForm, records: ITrainingRecordForm[], rawRecord: ITrainingRecordForm) => {

      const tr = trainings.data?.trainings.find(tr => tr._id === training._id)
      const links = records.map(r => r._id) || []
      links.push(rawRecord._id!)

      const record = ({
        ...rawRecord,
        training: { link: training._id },
        contact: { link: rawRecord.contact.link },
        attendant: rawRecord.attendant ? { link: rawRecord.attendant.link } : null,
      })

      return createTrainingRecord({
        variables: { trainingId: tr?._id, links, record },
      })
    },
    [createTrainingRecord, trainings]
  )

  return mutate
}

export default useCreateTrainingRecord
