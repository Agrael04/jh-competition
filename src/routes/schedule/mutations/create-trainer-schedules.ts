import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_SCHEDULES, IGetSchedulesResponse } from '../queries/get-schedules'
import { ITrainerSchedule } from 'interfaces/trainer-schedule'

export const CREATE_TRAINER_SCHEDULES = gql`
  mutation createTrainerSchedules ($schedules: [TrainerScheduleInsertInput!]!) {
    insertManyTrainerSchedules(data: $schedules) {
      insertedIds
    }
  }
`

const useCreateTrainerSchedules = () => {
  const [createTrainingRecords] = useMutation(CREATE_TRAINER_SCHEDULES)

  const mutate = React.useCallback(
    (schedules: ITrainerSchedule[]) => {
      const schedulesQuery = { query: GET_SCHEDULES, variables: { date: new Date(schedules[0].date) } }
      const mappedSchedules = schedules.map(sh => ({ ...sh, trainer: { link: sh.trainer } }))

      return createTrainingRecords({
        variables: { schedules: mappedSchedules },
        update: (cache, { data }) => {
          const queryData = cache.readQuery<IGetSchedulesResponse>(schedulesQuery)

          const newSchedules = schedules.map((s, index) => ({
            ...s,
            _id: data.insertManyTrainerSchedules.insertedIds[index],
            __typename: 'TrainerSchedule',
          }))

          cache.writeQuery({
            ...schedulesQuery,
            data: {
              trainerSchedules: [
                ...queryData?.trainerSchedules!,
                ...newSchedules,
              ],
            },
          })
        },
      })
    },
    [createTrainingRecords]
  )

  return mutate
}

export default useCreateTrainerSchedules
