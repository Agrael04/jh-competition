import React from 'react'

import { useSelector } from 'store'
import api from 'api/mongodb/training'
import client from 'api/mongodb/graphql'

import { ITrainingId } from 'interfaces/training'

import GET_TRAININGS from '../queries/get-trainings'
import { GetTrainingsQuery } from 'generated/graphql'

export default () => {
  const date = useSelector(state => state.schedule.currentDate)

  const mutate = React.useCallback(
    async (from: ITrainingId, to: ITrainingId) => {
      try {
        const variables = { date }

        await api.moveTraining(from, to)

        const data = client?.readQuery<GetTrainingsQuery>({ query: GET_TRAININGS, variables })

        const toIndex = data?.trainings.findIndex(tr => tr?.time === to.time && tr?.resource === to.resource)
        const fromIndex = data?.trainings.findIndex(tr => tr?.time === from.time && tr?.resource === from.resource)

        client?.writeQuery({
          query: GET_TRAININGS,
          variables,
          data: {
            trainings: data?.trainings.map(((item, index) => {
              if (index === fromIndex) {
                return { ...item, ...to }
              }

              if (index === toIndex) {
                return { ...item, ...from }
              }

              return item
            })),
          },
        })
      } catch (e) {
        console.log(e)
      }
    },
    [date]
  )

  return mutate
}
