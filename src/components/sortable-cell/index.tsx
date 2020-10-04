import React, { useMemo } from 'react'

import TableCell, { TableCellProps } from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

type SortableProps = TableCellProps & {
  orderKey: string
  onOrderChange: (key: string) => () => void
  activeOrder: {
    orderKey: string,
    direction: 'asc' | 'desc'
  }
}

const SortableCell = (props: SortableProps) => {
  const active = useMemo(
    () => props.activeOrder.orderKey === props.orderKey,
    [props]
  )

  const handleOrderChange = useMemo(
    () => props.onOrderChange(props.orderKey),
    [props]
  )

  const innerProps = useMemo(
    () => {
      const innerProps = { ...props }
      delete innerProps.orderKey
      delete innerProps.onOrderChange
      delete innerProps.activeOrder

      return innerProps
    },
    [props]
  )

  return (
    <TableCell {...innerProps}>
      <TableSortLabel
        active={active}
        direction={active ? props.activeOrder.direction : 'asc'}
        onClick={handleOrderChange}
      >
        {props.children}
      </TableSortLabel>
    </TableCell>
  )
}

export default SortableCell
