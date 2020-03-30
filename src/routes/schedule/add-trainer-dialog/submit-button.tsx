import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

export default function SubmitButton() {
  const actions = useActions()
  const { form, timeFrames } = useSelector(state => ({
    form: state.schedule.addTrainerDialog.form,
    timeFrames: state.schedule.addTrainerDialog.timeFrames,
  }))

  const save = React.useCallback(
    async () => {
      console.log(form, timeFrames)

      actions.schedule.addTrainerDialog.close()
    },
    [actions, form, timeFrames]
  )

  return (
    <Button variant='contained' color='primary' onClick={save}> Добавить </Button>
  )
}
