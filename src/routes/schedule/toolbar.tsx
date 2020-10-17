import React, { useCallback } from 'react'
import { useActions } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import FilterListIcon from '@material-ui/icons/FilterList'

import useGetGymsQuery from './queries/get-gyms'

const ToolbarContainer = () => {
  const actions = useActions()

  const gyms = useGetGymsQuery()

  const startFilterEditing = useCallback(
    () => {
      actions.schedule.page.startFilterUpdate()
    }, [actions]
  )

  React.useEffect(
    () => {
      if (!gyms.loading) {
        const _id = gyms.data?.gyms[0]._id!
        actions.schedule.page.setActiveGym(_id, gyms.data?.resources.filter(r => r.gym._id === _id).map(r => r._id) || [])
      }
    }, [gyms, actions]
  )

  return (
    <Toolbar>
      <Grid container={true} justify='space-between'>
        <Box marginY={1}>
          <IconButton color='primary' onClick={startFilterEditing}>
            <FilterListIcon />
          </IconButton>
        </Box>
      </Grid>
    </Toolbar>
  )
}

export default ToolbarContainer
