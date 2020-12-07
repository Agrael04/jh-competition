import { useCallback, useMemo } from 'react'
import { useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import { trainingTypes, GROUP_TRAININGS } from 'data/training-types'

interface IMappedRecord {
  _id: string
  type: string
  name: string
  count: number
  status: string
  isMulti: boolean
}

export default function TrainingDialog() {
  const actions = useActions()
  const { data } = useGetContactDetailsQuery()

  const mappedRecords = useMemo(
    () => data?.trainingRecords.reduce(
      (res, item) => {
        const isMulti = (
          item.training.type === GROUP_TRAININGS.GROUP ||
          item.training.type === GROUP_TRAININGS.EVENT ||
          item.training.type === GROUP_TRAININGS.SECTION
        )
        const index = res.findIndex(record => record._id === item.training._id)

        if (index === -1) {
          const rs = data?.trainingRecords.filter(r => r.training._id === item.training._id)

          return [
            ...res,
            {
              _id: item.training._id,
              type: item.training.type,
              name: item.training.name,
              status: item.status,
              count: isMulti ? rs.length : (item.resource.endTime - item.resource.startTime) / 2,
              isMulti,
            },
          ]
        }

        return res
      }, [] as IMappedRecord[]
    ), [data]
  )!

  const openPositionForm = useCallback(
    (service: string) => () => {
      actions.checkDialog.openCreatePositionForm({
        type: 'training',
        service,
        priceType: 'money',
      })
    },
    [actions]
  )

  return (
    <>
      <Grid item={true} lg={12} container={true} spacing={1}>
        {
          mappedRecords?.map(r => (
              <Grid item={true} key={r._id}>
                <Chip
                  key={r._id}
                  label={(
                    <Typography color='textPrimary' variant='body2'>
                      {`${trainingTypes.find(t => t.id === r.type)?.text}`}
                      {r.name ? `(${r.name})` : ''}
                    </Typography>
                  )}
                  variant='outlined'
                  color={r.isMulti ? 'secondary' : 'primary'}
                  avatar={
                    <Avatar>
                      {r.count}
                    </Avatar>
                  }
                  onClick={r.status !== 'CLOSED' ? openPositionForm(r.type) : undefined}
                  disabled={r.status === 'CLOSED'}
                />
              </Grid>
            ))
        }
      </Grid>
    </>
  )
}
