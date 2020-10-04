import React, { useCallback } from 'react'
import moment from 'moment'
import { useSelector, useActions } from 'store'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
// import Dialog from '@material-ui/core/Dialog'

import InfoIcon from '@material-ui/icons/Info'

import SortableCell from 'components/sortable-cell'
import ClientDialog, { IClientForm } from 'containers/client-dialog'

import Header from './header'

import useGetClients from './graphql/get-clients'
import useCreateClient from './graphql/create-client'
import useUpdateClient from './graphql/update-client'

import useStyles from './styles'

const ClientsPage = () => {
  const actions = useActions()
  const { activeOrder, clientDialog } = useSelector(state => state.clients.page)
  const classes = useStyles()

  const { data, loading } = useGetClients(`${activeOrder.orderKey.toUpperCase()}_${activeOrder.direction.toUpperCase()}`)
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
      actions.clients.page.openClientDialog()
    }, [actions]
  )

  const openOldClientDialog = useCallback(
    (id: string) => () => {
      actions.clients.page.openClientDialog(id)
    }, [actions]
  )

  const closeClientDialog = useCallback(
    () => {
      actions.clients.page.closeClientDialog()
    }, [actions]
  )

  const submit = useCallback(
    async (values: IClientForm) => {
      if (clientDialog.id) {
        await updateClient(clientDialog.id, {
          ...values,
          fullName: `${values.lastName} ${values.firstName}`,
        })
      } else {
        await createClient({
          ...values,
          fullName: `${values.lastName} ${values.firstName}`,
        })
      }

      closeClientDialog()
    }, [createClient, updateClient, clientDialog, closeClientDialog]
  )

  const onOrderChange = (key: string) => () => actions.clients.page.changeOrder(key)

  return (
    <Paper className={classes.rootPaper}>
      <Header
        openClientForm={openNewClientDialog}
      />
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <SortableCell
              orderKey='fullName'
              activeOrder={activeOrder}
              onOrderChange={onOrderChange}
            >
              Имя
            </SortableCell>
            <TableCell onClick={startFilterEditing} className={classes.clickable}>
              Телефон
            </TableCell>
            <SortableCell
              orderKey='birthday'
              activeOrder={activeOrder}
              onOrderChange={onOrderChange}
            >
              Возраст
            </SortableCell>
            <SortableCell
              orderKey='visitedAt'
              activeOrder={activeOrder}
              onOrderChange={onOrderChange}
            >
              Дата посещения
            </SortableCell>
            <SortableCell
              orderKey='balance'
              activeOrder={activeOrder}
              onOrderChange={onOrderChange}
            >
              Баланс
            </SortableCell>
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
                    client.communicationType?.length ? (
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
                <TableCell>
                  {client.visitedAt && moment(client.visitedAt).format('D MMMM, YYYY')}
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
        opened={clientDialog.opened}
        close={closeClientDialog}
        submit={submit}
        id={clientDialog.id}
      />

      {/* <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true} /> */}
    </Paper>
  )
}

export default ClientsPage
