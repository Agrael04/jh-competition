import React from 'react'

import removeTimeFromDate from 'utils/remove-time-from-date'
import { useSelector } from 'store'
import api from 'api/mongodb/training'
import client from 'api/mongodb/graphql'

import { ITrainingId } from 'interfaces/training'

import GET_TRAININGS from '../queries/get-trainings'

export default () => {
  const date = useSelector(state => state.schedule.currentDate)

  const mutate = React.useCallback(
    async (from: ITrainingId, to: ITrainingId) => {
      try {
        const variables = {
          date: removeTimeFromDate(date),
        }

        await api.moveTraining(from, to)

        const { trainings } = client?.readQuery({ query: GET_TRAININGS, variables: { date: removeTimeFromDate(date) } }) as any

        const toIndex = trainings.findIndex((tr: any) => tr.time === to.time && tr.resource === to.resource)
        const fromIndex = trainings.findIndex((tr: any) => tr.time === from.time && tr.resource === from.resource)

        client?.writeQuery({
          query: GET_TRAININGS,
          variables,
          data: {
            trainings: trainings.map(((item: any, index: number) => {
              if (index === fromIndex) {
                return {
                  ...item,
                  ...to,
                }
              }

              if (index === toIndex) {
                return {
                  ...item,
                  ...from,
                }
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
