import React from 'react'
import { useSelector } from 'store'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { updateCachedQuery } from './cache-updaters'
import { addTrainingPassUpdater } from './cache-updaters/training-pass'
import { GET_CONTACT_RECORDS, IGetContactRecords } from '../queries/get-contact-details'

export const CREATE_TRAINING_PASS = gql`
  mutation createTrainingPass ($pass: TrainingPassInsertInput!) {
    insertOneTrainingPass(data: $pass) {
      _id
      contact {
        _id
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

const useCreateTrainingPass = () => {
  const [createTrainingPass] = useMutation(CREATE_TRAINING_PASS)
  const { date, gym, _id } = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.schedule.checkDialog.contact,
  }))

  const mutate = React.useCallback(
    (p: ITrainingPassForm) => {
      const pass = ({
        contact: { link: p.contact.link },
        type: p.type,
        size: p.size,
        capacity: p.capacity,
        createdAt: p.createdAt,
        activatedAt: p.activatedAt,
        activatesIn: p.activatesIn,
        expiresIn: p.expiresIn,
      })
      return createTrainingPass({
        variables: { pass },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateCachedQuery(client)
          const updater = addTrainingPassUpdater(data.insertOneTrainingPass)

          boundUpdateCachedQuery<IGetContactRecords>({
            query: GET_CONTACT_RECORDS,
            variables: { date, gym, _id },
            updater,
          })
        },
      })
    },
    [createTrainingPass, date, gym, _id]
  )

  return mutate
}

export default useCreateTrainingPass
