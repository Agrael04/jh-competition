import React, { useCallback } from 'react'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import FilterListIcon from '@material-ui/icons/FilterList'
import AddCircleIcon from '@material-ui/icons/AddCircle'

interface IProps {
  openClientForm: () => void
}

const Header = ({ openClientForm }: IProps) => {
  const startFilterEditing = useCallback(
    () => {
      console.log('started')
      // actions.records.page.startFilterUpdate()
    }, [
    // actions,
  ]
  )

  const openNewClientDialog = useCallback(
    () => {
      openClientForm()
    }, [openClientForm]
  )

  return (
    <Toolbar>
      <Grid container={true} justify='space-between'>
        <div>
          <Grid container={true} spacing={2}>
            <Grid item={true}>
              <IconButton color='primary' onClick={startFilterEditing}>
                <FilterListIcon />
              </IconButton>
            </Grid>
            <Box marginLeft={2} marginY='auto'>
              <Chip
                label='Агарков'
              />
            </Box>
            <Box marginLeft={2} marginY='auto'>
              <Chip
                label='Долг'
              />
            </Box>
            <Box marginLeft={2} marginY='auto'>
              <Chip
                label='+38050274793'
              />
            </Box>
            <Box marginLeft={2} marginY='auto'>
              <Chip
                label='Группа'
              />
            </Box>
            <Box marginLeft={2} marginY='auto'>
              <Chip
                label='Посещение: последний месяц'
              />
            </Box>
          </Grid>
        </div>
        <IconButton color='primary' onClick={openNewClientDialog}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Toolbar>
  )
}

export default Header
