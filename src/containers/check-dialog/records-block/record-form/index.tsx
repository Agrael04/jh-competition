import React from 'react'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import PriceAmount from './price-amount'
import CancelButton from './cancel-button'
import SaveButton from './save-button'

import useGetContactDetailsQuery from '../../graphql/get-contact-details'

import { useContext } from '../../context'

import { getTimeLabel } from 'data/times'

export default function RecordForm() {
  const { _id } = useContext(s => ({
    _id: s.state.recordForm?._id,
  }))
  const { data } = useGetContactDetailsQuery()

  const record = data?.trainingRecords.find(tr => tr._id === _id)

  return (
    <>
      <div>
        <Typography variant='body1'>
          {record?.training.type} {record?.training.name}
        </Typography>
        <Box marginTop={2}>
          <Typography variant='body1'>
            {record?.resource.resource.name}
            {', '}
            {getTimeLabel(record?.resource.startTime)}
            {' - '}
            {getTimeLabel(record?.resource.endTime)}
            {
              record?.resource.trainer && (
                <>
                  {', '}
                  {record?.resource.trainer.firstName}
                  {' '}
                  {record?.resource.trainer.lastName}
                </>
              )
            }
          </Typography>
        </Box>
        {
          record?.attendant && (
            <Box marginTop={2}>
              <Typography variant='body1'>
                {record?.attendant.fullName}
              </Typography>
            </Box>
          )
        }

        <Box marginTop={4}>
          <PriceAmount />
        </Box>
      </div>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <CancelButton />
          <SaveButton />
        </Grid>
      </Box>
    </>
  )
}
