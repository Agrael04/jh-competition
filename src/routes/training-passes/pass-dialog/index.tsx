import { useMemo } from 'react'
import moment from 'moment'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import { loader } from 'graphql.macro'

import PassForm from 'containers/pass-form'

import { ApolloCache } from '@apollo/client'

import Header from './header'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'
import getClientLabel from 'utils/get-client-label'

import useGetTrainingPassesQuery from '../graphql/get-training-passes'
const GET_TRAINING_PASSES = loader('../graphql/get-training-passes/query.gql')

interface IProps {
  mode: 'create' | 'update' | null
  _id?: string
  handleClose: () => void
}

const updateCacheOnCreate = (client: ApolloCache<any>, { data }: any) => {
  const boundUpdateCachedQuery = updateQuery(client)
  const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

  boundUpdateCachedQuery({
    query: GET_TRAINING_PASSES,
    updater,
  })
}

export default function PassFormWrap({ _id, mode, handleClose }: IProps) {
  const { data } = useGetTrainingPassesQuery()
  const pass = data?.trainingPasss.find(pass => pass._id === _id)

  const initialForm = useMemo(
    () => {
      if (mode === 'update' && pass) {
        return {
          _id: pass._id,
          contact: {
            link: pass.contact._id,
          },
          type: pass.type,
          size: pass.size,
          capacity: pass.capacity,
          duration: pass.duration,
          activation: pass.activation,
          price: pass.price,
          createdAt: moment(pass.createdAt),
        }
      }

      if (mode === 'create') {
        return {
          createdAt: moment().startOf('day'),
          isActive: true,
        }
      }

      return {}
    }, [pass, mode]
  )

  const contactLabel = getClientLabel(pass?.contact)

  return (
    <Dialog open={!!mode} onClose={handleClose} maxWidth='sm' fullWidth={true}>
      <Header close={handleClose} />
      <Box padding={3}>
        <PassForm
          mode={mode}
          initialForm={initialForm}
          close={handleClose}
          initialContactFilter={contactLabel}
          updateCacheOnCreate={updateCacheOnCreate}
        />
      </Box>
    </Dialog>
  )
}
