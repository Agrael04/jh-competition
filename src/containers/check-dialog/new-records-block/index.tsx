import React from 'react'
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
  isMulti: boolean
}

export default function TrainingDialog() {
  const actions = useActions()
  const openCreatePositionForm = actions.checkDialog.openCreatePositionForm
  const { data } = useGetContactDetailsQuery()

  const mappedRecords = React.useMemo(
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
              count: isMulti ? rs.length : (item.resource.endTime - item.resource.startTime) / 2,
              isMulti,
            },
          ]
        }

        return res
      }, [] as IMappedRecord[]
    ), [data]
  )!

  const openPositionForm = (service: string) => () => openCreatePositionForm({ type: 'training', service })

  return (
    <>
      <Grid item={true} lg={12} container={true} spacing={1}>
        {
          mappedRecords
            .map(r => (
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
                  avatar={<Avatar>{r.count}</Avatar>}
                  onClick={openPositionForm(r.type)}
                />
              </Grid>
            ))
        }
      </Grid>
    </>
  )
}
