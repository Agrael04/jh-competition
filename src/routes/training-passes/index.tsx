import React, { useCallback, useState } from 'react'

import Paper from '@material-ui/core/Paper'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'

import AddCircleIcon from '@material-ui/icons/AddCircle'

import useStyles from './styles'

import useGetTrainingPassesQuery from './graphql/get-training-passes'

import PassDialog from './pass-dialog'
import PassRow from './pass-row'

const SchedulePage = () => {
  const classes = useStyles()

  const { data } = useGetTrainingPassesQuery()
  const [formProps, setFormProps] = useState<{ mode: 'create' | 'update', _id?: string } | null>(null)

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      setFormProps({ mode: 'create' })
    },
    []
  )

  const handleEdit = useCallback(
    (_id: string) => {
      setFormProps({ mode: 'update', _id })
    },
    []
  )

  const handleClose = useCallback(
    () => {
      setFormProps(null)
    },
    []
  )

  return (
    <Paper className={classes.rootPaper}>
      <Toolbar>
        <Grid container={true} justify='flex-end'>
          <IconButton color='primary' onClick={handleAdd}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Toolbar>
      <Table stickyHeader={true}>
        <TableHead>
          <TableRow>
            <TableCell>
              Контактное лицо
            </TableCell>
            <TableCell>
              Тип абонимента
            </TableCell>
            <TableCell>
              Цена
            </TableCell>
            <TableCell>
              Кол-во отметок
            </TableCell>
            <TableCell>
              Цена отметки
            </TableCell>
            <TableCell>
              Дата создания
            </TableCell>
            <TableCell>
              Дата завершения
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.trainingPasss.map(pass => (
            <PassRow key={pass._id} pass={pass} handleEdit={handleEdit} />
          ))}
        </TableBody>
      </Table>
      <PassDialog mode={formProps?.mode || null} _id={formProps?._id} handleClose={handleClose} />
    </Paper>
  )
}

export default SchedulePage
