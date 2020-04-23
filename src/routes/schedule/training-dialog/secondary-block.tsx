import React from 'react'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

interface IProps {
  title: string
  children: React.ReactNode
}

export default function SecondaryBlock({ title, children }: IProps) {
  const [opened, setOpened] = React.useState(true)

  const toggleOpened = React.useCallback(
    () => setOpened(!opened),
    [opened, setOpened]
  )

  return (
    <>
      <Grid item={true} lg={12}>
        <Box color='primary.main' borderBottom={2} />
      </Grid>
      <Grid item={true} lg={12} container={true} justify='space-between'>
        <Box marginY='auto'>
          <Typography>
            {title}
          </Typography>
        </Box>
        <IconButton onClick={toggleOpened}>
          {
            opened
              ? <KeyboardArrowUpIcon />
              : <KeyboardArrowDownIcon />
          }
        </IconButton>
      </Grid>
      <Box width={1} paddingX={1.5}>
        <Collapse in={opened} timeout='auto' unmountOnExit={true}>
          <Grid container={true} spacing={3}>
            {children}
          </Grid>
        </Collapse>
      </Box>
    </>
  )
}
