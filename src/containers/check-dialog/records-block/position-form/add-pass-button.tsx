import React from 'react'

import { useFormContext } from 'react-hook-form'
import { useActions } from 'store'

import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { products } from '../../data'

export default function PassSelect() {
  const { watch } = useFormContext()
  const type = watch('type')
  const service = watch('service')

  const actions = useActions()
  const openPassForm = actions.checkDialog.openPassForm

  if (type !== 'pass') {
    return null
  }

  if (service === undefined || service === null) {
    return null
  }

  const s: any = products.find(p => p.id === type)?.options.find(o => o.id === service)

  if (s.type === 'open') {
    return null
  }

  return (
    <Box marginY='auto' marginRight={0}>
      <Button color='primary' onClick={openPassForm}>
        Добавить
      </Button>
    </Box>
  )
}
