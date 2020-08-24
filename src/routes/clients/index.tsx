import React, { useCallback } from 'react'
import moment from 'moment'
import { useSelector, useActions } from 'store'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'

import FilterListIcon from '@material-ui/icons/FilterList'
import DeleteIcon from '@material-ui/icons/Delete'

import useGetClients from './graphql/get-clients'

import useStyles from './styles'

const ClientsPage = () => {
  const actions = useActions()
  const { openedFiltersDialog } = useSelector(state => state.records.page)
  const classes = useStyles()

  const { data, loading } = useGetClients()

  const startFilterEditing = useCallback(
    () => {
      actions.records.page.startFilterUpdate()
    }, [actions]
  )

  const close = useCallback(
    () => {
      actions.records.page.cancelFilterUpdate()
    }, [actions]
  )

  return (
    <Paper className={classes.rootPaper}>
      <Toolbar>
        <Grid container={true} justify='flex-end'>
          <IconButton color='primary' onClick={startFilterEditing}>
            <FilterListIcon />
          </IconButton>
        </Grid>
      </Toolbar>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Имя
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Возраст
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тип клиента
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Дата добавления
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Дата посещения
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Баланс
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Телефон
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тип общения
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            loading && (
              <TableRow>
                <TableCell colSpan={9}>
                  <Grid container={true}>
                    <Box margin='auto'>
                      <CircularProgress />
                    </Box>
                  </Grid>
                </TableCell>
              </TableRow>
            )
          }
          {
            !loading && data?.users.map(client => (
              <TableRow key={client._id}>
                <TableCell>
                  {client.surname} {client.name}
                </TableCell>
                <TableCell>
                  {client.birthday && moment().diff(moment(client.birthday, 'DD.MM.YYYY'), 'years')}
                </TableCell>
                <TableCell>
                  {client.type}
                </TableCell>
                <TableCell>
                  {moment().format('D MMMM, YYYY')}
                </TableCell>
                <TableCell>
                  {moment().format('D MMMM, YYYY')}
                </TableCell>
                <TableCell>
                  {client.balance}
                </TableCell>
                <TableCell>
                  {client.phone}
                  <br />
                  {client.altPhone}
                </TableCell>
                <TableCell>
                  Telegram
                </TableCell>
                <TableCell align='right'>
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true} />
    </Paper>
  )
}

export default ClientsPage
