import React, { useCallback, useEffect, useState, useMemo } from 'react'
import moment from 'moment'
// import { useSelector, useActions } from 'store'

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
// import Dialog from '@material-ui/core/Dialog'

import FilterListIcon from '@material-ui/icons/FilterList'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import InfoIcon from '@material-ui/icons/Info'

import ClientDialog, { IClientForm } from 'containers/client-dialog'

import useGetClients from './graphql/get-clients'
import useGetClient from './graphql/get-full-client'
import useCreateClient from './graphql/create-client'
import useUpdateClient from './graphql/update-client'

import useStyles from './styles'

const ClientsPage = () => {
  // const actions = useActions()
  // const { openedFiltersDialog } = useSelector(state => state.records.page)
  const classes = useStyles()
  const [openedClientDialog, setOpenedClientDialog] = useState<boolean>(false)

  const { data, loading } = useGetClients()
  const { load, result } = useGetClient()
  const createClient = useCreateClient()
  const updateClient = useUpdateClient()

  const startFilterEditing = useCallback(
    () => {
      console.log('started')
      // actions.records.page.startFilterUpdate()
    }, [
    // actions,
  ]
  )

  // const close = useCallback(
  //   () => {
  //     actions.records.page.cancelFilterUpdate()
  //   }, [actions]
  // )

  const openNewClientDialog = useCallback(
    () => {
      setOpenedClientDialog(true)
    }, [setOpenedClientDialog]
  )

  const openOldClientDialog = useCallback(
    (id: string) => async () => {
      await load(id)
    }, [load]
  )

  const closeClientDialog = useCallback(
    () => {
      setOpenedClientDialog(false)
    }, [setOpenedClientDialog]
  )

  const submit = useCallback(
    async (values: IClientForm) => {
      if (result.data?.client) {
        await updateClient(result.data.client._id, values)
      } else {
        await createClient(values)
      }

      closeClientDialog()
    }, [createClient, updateClient, result, closeClientDialog]
  )

  const defaultValues = useMemo(
    () => {
      if (result.loading || !result.data?.client) {
        return undefined
      }

      return {
        ...result.data.client,
        birthday: result.data.client.birthday ? new Date(result.data.client.birthday) : null,
      }
    },
    [result]
  )

  useEffect(
    () => {
      if (defaultValues) {
        setOpenedClientDialog(true)
      }
    },
    [defaultValues, setOpenedClientDialog]
  )

  return (
    <Paper className={classes.rootPaper}>
      <Toolbar>
        <Grid container={true} justify='flex-end'>
          <IconButton color='primary' onClick={startFilterEditing}>
            <FilterListIcon />
          </IconButton>
          <IconButton color='primary' onClick={openNewClientDialog}>
            <AddCircleIcon />
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
              Телефон
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Возраст
            </TableCell>
            {/* <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Тип клиента
            </TableCell> */}
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Дата посещения
            </TableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Баланс
            </TableCell>
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
            !loading && data?.clients.map(client => (
              <TableRow key={client._id} onClick={openOldClientDialog(client._id)} className={classes.clickable}>
                <TableCell>
                  <Grid container={true}>
                    <Box marginY='auto'>
                      {client.lastName} {client.firstName}
                      {
                        client.group && (
                          <>
                            <br />
                            {client.group}, {client.groupRole}
                          </>
                        )
                      }
                    </Box>
                    {
                      client.specialConditions && (
                        <Box marginTop={0} marginLeft={2}>
                          <InfoIcon color='primary' />
                        </Box>
                      )
                    }
                  </Grid>
                </TableCell>
                <TableCell>
                  {client.phone}
                  {
                    client.altPhone && (
                      <>
                        <br />
                        {client.altPhone}
                      </>
                    )
                  }
                  {
                    client.communicationType.length ? (
                      <>
                        <br />
                        {client.communicationType.join(', ')}
                      </>
                    ) : null
                  }

                </TableCell>
                <TableCell>
                  {client.birthday && moment().diff(moment(client.birthday), 'years')}
                </TableCell>
                {/* <TableCell>
                  {client.type}
                </TableCell> */}
                <TableCell>
                  {moment().format('D MMMM, YYYY')}
                </TableCell>
                <TableCell>
                  {client.balance}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <ClientDialog
        opened={openedClientDialog}
        close={closeClientDialog}
        submit={submit}
        defaultValues={defaultValues}
      />

      {/* <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true} /> */}
    </Paper>
  )
}

export default ClientsPage
