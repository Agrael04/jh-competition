import { useCallback } from 'react'
import moment from 'moment'
import { useSelector, useDispatch } from 'store'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'

import InfoIcon from '@material-ui/icons/Info'

import { cancelFilterUpdate, openClientDialog, closeClientDialog, changeOrder } from 'store/ui/pages/clients/page/actions'

import SortableCell from 'components/sortable-cell'
import ClientDialog, { IClientForm } from 'containers/client-dialog'

import Header from './header'
import FiltersDialog from './filters-dialog'

import useGetClients from './graphql/get-clients'
import useCreateClient from './graphql/create-client'
import useUpdateClient from './graphql/update-client'

import useStyles from './styles'

const ClientsPage = () => {
  const dispatch = useDispatch()
  const { activeOrder, clientDialog, openedFiltersDialog } = useSelector(state => state.ui.pages.clients.page)
  const classes = useStyles()

  const { data, loading } = useGetClients()
  const createClient = useCreateClient()
  const updateClient = useUpdateClient()

  const close = () => dispatch(cancelFilterUpdate())

  const openNewClientDialog = () => dispatch(openClientDialog())
  const openOldClientDialog = (id: string) => () => dispatch(openClientDialog(id))
  const closeDialog = () => dispatch(closeClientDialog())

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

      closeDialog()
    }, [createClient, updateClient, clientDialog, closeDialog]
  )

  const onOrderChange = (key: string) => () => dispatch(changeOrder(key))

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
            <TableCell className={classes.clickable}>
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
                      {client.lastName}
                      {' '}
                      {client.firstName}
                      {
                        client.group && (
                          <>
                            <br />
                            {client.group}
                            {', '}
                            {client.groupRole}
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
        close={closeDialog}
        submit={submit}
        id={clientDialog.id}
      />

      <Dialog open={openedFiltersDialog} onClose={close} maxWidth='xs' fullWidth={true}>
        <FiltersDialog />
      </Dialog>
    </Paper>
  )
}

export default ClientsPage
