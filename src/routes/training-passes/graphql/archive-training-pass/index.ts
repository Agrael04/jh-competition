import { useCallback } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { loader } from 'graphql.macro'

import { updateQuery, removeUpdater } from 'utils/apollo-cache-updater'

const ARCHIVE_TRAINING_PASS = loader('./mutation.gql')
const GET_TRAINING_PASSES = loader('../get-training-passes/query.gql')

const useArchiveTrainingPass = () => {
  const [archiveTrainingPass] = useMutation(ARCHIVE_TRAINING_PASS)

  const mutate = useCallback(
    (_id: string) => {
      if (!_id) {
        return
      }

      return archiveTrainingPass({
        variables: { _id },
        update: (client, { data }) => {
          const boundUpdateCachedQuery = updateQuery(client)
          const updater = removeUpdater('trainingPasss', data.updateOneTrainingPass)

          boundUpdateCachedQuery({
            query: GET_TRAINING_PASSES,
            updater,
          })
        },
      })
    },
    [archiveTrainingPass]
  )

  return mutate
}

export default useArchiveTrainingPass
