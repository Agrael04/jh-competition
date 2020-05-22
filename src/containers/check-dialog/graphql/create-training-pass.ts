import React from 'react'
import { useSelector } from 'store'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

const CREATE_TRAINING_PASS = loader('./create-training-pass.gql')
const GET_CONTACT_DETAILS = loader('./get-contact-details.gql')

const useCreateTrainingPass = () => {
  const [createTrainingPass] = useMutation(CREATE_TRAINING_PASS)
  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
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
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

          boundUpdateCachedQuery({
            query: GET_CONTACT_DETAILS,
            variables,
            updater,
          })
        },
      })
    },
    [createTrainingPass, variables]
  )

  return mutate
}

export default useCreateTrainingPass
