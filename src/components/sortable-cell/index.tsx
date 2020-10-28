import React, { useMemo } from 'react'

import TableCell, { TableCellProps } from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

interface ISortingProps {
  orderKey: string
  onOrderChange: (key: string) => () => void
  activeOrder: {
    orderKey: string
    direction: 'asc' | 'desc'
  }
}

type SortableProps = TableCellProps & ISortingProps

const SortableCell = (props: SortableProps) => {
  const { orderKey, onOrderChange, activeOrder, ...innerProps } = { ...props }

  const active = useMemo(
    () => activeOrder.orderKey === orderKey,
    [activeOrder, orderKey]
  )

  const handleOrderChange = useMemo(
    () => onOrderChange(props.orderKey),
    [onOrderChange]
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
