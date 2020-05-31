import React from 'react'
import { useSelector } from 'store'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/react-hooks'

import { updateQuery } from 'utils/apollo-cache-updater'

import { IGetContactDetails } from '../get-contract-details'

const UPDATE_TRAINING_RECORD = loader('./mutation.gql')
const GET_CONTRACT_DETAILS = loader('../get-contract-details/query.gql')

const useUpdateTrainingRecord = () => {
  const [updateTrainingRecord] = useMutation(UPDATE_TRAINING_RECORD)

  const variables = useSelector(state => ({
    date: state.schedule.page.activeDate,
    gym: state.schedule.page.activeGym,
    _id: state.checkDialog.contact,
  }))

  const mutate = React.useCallback(
    (debt: boolean) => {
      return updateTrainingRecord({
        variables: {
          ...variables,
          data: {
            status: debt ? 'CLOSED_DEBT' : 'CLOSED',
          },
        },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = (data: IGetContactDetails) => {
            return ({
              ...data,
              trainingRecords: data.trainingRecords.map(tr => ({
                ...tr,
                status: debt ? 'CLOSED_DEBT' : 'CLOSED',
              })),
            })
          }

          boundUpdateCachedQuery({
            query: GET_CONTRACT_DETAILS,
            variables,
            updater,
          })
        },
      })
    },
    [updateTrainingRecord, variables]
  )

  return mutate
}

export default useUpdateTrainingRecord
