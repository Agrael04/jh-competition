import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import Box from '@material-ui/core/Box'
import { loader } from 'graphql.macro'

import PassForm from 'containers/pass-form'

import { DataProxy } from 'apollo-cache'

import Header from './header'

import { updateQuery, createUpdater } from 'utils/apollo-cache-updater'
import removeTimeFromDate from 'utils/remove-time-from-date'

import useGetTrainingPassesQuery from '../graphql/get-training-passes'
const GET_TRAINING_PASSES = loader('../graphql/get-training-passes/query.gql')

interface IProps {
  mode: 'create' | 'update' | null
  _id?: string
  handleClose: () => void
}

export default function PassFormWrap({ _id, mode, handleClose }: IProps) {
  const updateCacheOnCreate = (client: DataProxy, { data }: any) => {
    const boundUpdateCachedQuery = updateQuery(client)
    const updater = createUpdater('trainingPasss', data.insertOneTrainingPass)

    boundUpdateCachedQuery({
      query: GET_TRAINING_PASSES,
      updater,
    })
  }

  const { data } = useGetTrainingPassesQuery()
  const pass = data?.trainingPasss.find(pass => pass._id === _id)

  const initialForm = React.useMemo(
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
          createdAt: pass.createdAt,
        }
      }

      if (mode === 'create') {
        return {
          createdAt: removeTimeFromDate(new Date())!,
          isActive: true,
        }
      }

      return {}
    }, [pass, mode]
  )

  return (
    <Dialog open={!!mode} onClose={handleClose} maxWidth='sm' fullWidth={true}>
      <Header close={handleClose}/>
      <Box padding={3}>
        <PassForm
          mode={mode}
          initialForm={initialForm}
          close={handleClose}

          initialContactFilter={pass?.contact.fullName || ''}
          updateCacheOnCreate={updateCacheOnCreate}
        />
      </Box>
    </Dialog>
  )
}
