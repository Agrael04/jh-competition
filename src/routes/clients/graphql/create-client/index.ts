import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'

import { IClientForm } from 'containers/client-dialog'

const CREATE_PAYMENT = loader('./mutation.gql')
const GET_CLIENTS = loader('../get-clients/query.gql')

type IClient = IClientForm & {
  fullName?: string
}

const useCreateClient = () => {
  const [createClient] = useMutation(CREATE_PAYMENT)

  const mutate = useCallback(
    (data: Partial<IClient>) => {
      if (!data) {
        return
      }

      return createClient({
        variables: { data },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = createUpdater('clients', data.insertOneClient)

          boundUpdateCachedQuery({
            query: GET_CLIENTS,
            updater,
          })
        },
      })
    },
    [createClient]
  )

  return mutate
}

export default useCreateClient
