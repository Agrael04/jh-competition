import React, { useMemo } from 'react'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

import Header from './header'
import Form from './form'

import useGetClient from './graphql/get-full-client'
import { IClientForm } from './form'

export * from './form'

interface IClientDialogProps {
  opened: boolean
  submit: (form: IClientForm) => void
  close: () => void
  _id?: string
}

export default function ClientDialog({ opened, close, submit, _id }: IClientDialogProps) {
  const { data, loading } = useGetClient(_id)

  console.log(data, _id)

  const defaultValues = useMemo(
    () => {
      if (loading || !data?.client) {
        return undefined
      }

      return {
        ...data.client,
        birthday: data.client.birthday ? new Date(data.client.birthday) : null,
      }
    },
    [data, loading]
  )

  return (
    <Dialog open={opened} maxWidth='lg' fullWidth={true} onClose={close}>
      <Header />
      <Box padding={3}>
        {
          loading && (
            <CircularProgress />
          )
        }
        {
          !loading && (
            <Form
              submit={submit}
              defaultValues={defaultValues}
            />
          )
        }
      </Box>
    </Dialog>
  )
}
