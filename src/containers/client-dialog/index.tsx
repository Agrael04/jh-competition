import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'

import Header from './header'
import Form from './form'

import { IClientForm } from './form'

export * from './form'

interface IClientDialogProps {
  opened: boolean
  defaultValues?: Partial<IClientForm>
  submit: (form: IClientForm) => void
  close: () => void
}

export default function ClientDialog({ opened, close, defaultValues, submit }: IClientDialogProps) {
  return (
    <Dialog open={opened} maxWidth='lg' fullWidth={true} onClose={close}>
      <Header />
      <Box padding={3}>
        <Form
          submit={submit}
          defaultValues={defaultValues}
        />
      </Box>
    </Dialog>
  )
}
