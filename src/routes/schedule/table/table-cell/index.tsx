import React from 'react'
import clsx from 'clsx'

import TableCell, { TableCellProps } from '@material-ui/core/TableCell'

import useStyles from './styles'

interface IProps extends TableCellProps {
  primaryRow?: boolean
  secondaryRow?: boolean
  activeRow?: boolean
  primaryCol?: boolean
  secondaryCol?: boolean
}

const TrainingCell = ({ primaryRow, secondaryRow, activeRow, primaryCol, secondaryCol, className, ...rest }: IProps) => {
  const classes = useStyles()

  return (
    <TableCell
      {...rest}
      className={clsx({
        [classes.primaryRow]: primaryRow,
        [classes.secondaryRow]: secondaryRow,
        [classes.activeRow]: activeRow,
        [classes.primaryCol]: primaryCol,
        [classes.secondaryCol]: secondaryCol,
      }, className)}
    />
  )
}

export default TrainingCell
