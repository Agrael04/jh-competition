import React from 'react'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import { GET_SCHEDULES, IGetSchedulesResponse } from '../queries/get-schedules'
import { GET_TRAINERS, IGetTrainersResponse } from '../queries/get-trainers'
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
      const trainersQuery = { query: GET_TRAINERS }

      const mappedSchedules = schedules.map(sh => ({
        ...sh,
        trainer: { link: sh.trainer },
        gym: { link: sh.gym },
      }))

      return createTrainingRecords({
        variables: { schedules: mappedSchedules },
        update: (cache, { data }) => {
          const queryData = cache.readQuery<IGetSchedulesResponse>(schedulesQuery)
          const trainersData = cache.readQuery<IGetTrainersResponse>(trainersQuery)

          const newSchedules = schedules.map((s, index) => ({
            ...s,
            _id: data.insertManyTrainerSchedules.insertedIds[index],
            __typename: 'TrainerSchedule',
            trainer: trainersData?.trainers.find(tr => tr._id === s.trainer),
            gym: {
              _id: s.gym,
              __typename: 'Gym',
            },
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
