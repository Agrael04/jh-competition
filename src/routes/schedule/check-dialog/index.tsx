import React from 'react'

import CheckDialog from 'containers/check-dialog'

import { useSelector } from 'store'

const CheckDialogWrap = () => {
  const props = useSelector(state => ({
    activeDate: state.schedule.page.activeDate,
    activeGym: state.schedule.page.activeGym,
    opened: state.schedule.page.openedCheckDialog,
    contact: state.schedule.page.activeContact,
  }))

  return (
    <CheckDialog {...props} />
  )
}

export default CheckDialogWrap
