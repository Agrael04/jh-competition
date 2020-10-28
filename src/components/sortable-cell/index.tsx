import React, { useCallback, useMemo } from 'react'

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

const SortableCell = ({ orderKey, onOrderChange, activeOrder, children, ...innerProps }: SortableProps) => {
  const active = useMemo(
    () => activeOrder.orderKey === orderKey,
    [activeOrder, orderKey]
  )

  const handleOrderChange = useCallback(
    () => onOrderChange(orderKey),
    [onOrderChange, orderKey]
  )

  return (
    <TableCell {...innerProps}>
      <TableSortLabel
        active={active}
        direction={active ? activeOrder.direction : 'asc'}
        onClick={handleOrderChange}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  )
}

export default SortableCell
