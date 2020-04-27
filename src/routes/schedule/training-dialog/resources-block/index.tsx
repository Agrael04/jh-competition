import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import Grid from '@material-ui/core/Grid'

import SecondaryBlock from '../secondary-block'

import AddRecordChip from './add-record-chip'
import AddResourceChip from './add-resource-chip'
import RecordChip from './record-chip'
import ResourceChip from './resource-chip'

import RecordLine from './record-line'
import ResourceLine from './resource-line'

export default function ResourcesBlock() {
  const trainingResources = useSelector(state => state.schedule.trainingDialog.resources)

  return (
    <SecondaryBlock title='Ресурсы'>
      <Grid item={true} lg={12} container={true} spacing={1}>
        <Grid item={true}>
          <AddResourceChip />
        </Grid>
      </Grid>
      {
        trainingResources.map(resource => (
          <Grid item={true} lg={12} container={true} spacing={1} key={resource._id}>
            <Grid item={true}>
              <ResourceChip id={resource._id} />
            </Grid>
            {
              resource.records.link.map(r => (
                <Grid item={true} key={r}>
                  <RecordChip id={r} />
                </Grid>
              ))
            }
            <Grid item={true}>
              <AddRecordChip />
            </Grid>
          </Grid>
        ))
      }
      <RecordLine />
      <ResourceLine />
    </SecondaryBlock>
  )
}
