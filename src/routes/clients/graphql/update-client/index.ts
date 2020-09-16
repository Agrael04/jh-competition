import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { IClientForm } from 'containers/client-dialog'

const UPDATE_PAYMENT = loader('./mutation.gql')

const useUpdateClient = () => {
  const [updateClient] = useMutation(UPDATE_PAYMENT)

  const mutate = React.useCallback(
    (_id: string, data: Partial<IClientForm>) => {
      if (!data) {
        return
      }

      return updateClient({
        variables: { _id, data },
      })
    },
    [updateClient]
  )

  return mutate
}

export default useUpdateClient
