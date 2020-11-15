import { loader } from 'graphql.macro'

import IQueryResponse from './query'
import useGet from './get'
import useRead from './read'
import useReadById from './read-by-id'
import useReadPrev from './read-prev'
import useReadNext from './read-next'

export type IGetTrainingResourceResponse = IQueryResponse
export { useGet as useGetTrainingResourceQuery }
export { useRead as useReadTrainingResource }
export { useReadById as useReadTrainingResourceById }
export { useReadPrev as useReadPrevTrainingResource }
export { useReadNext as useReadNextTrainingResource }

export const GET_TRAINING_RESOURCE = loader('./query.gql')
export const TRAINING_RESOURCE_PARAMS = loader('./params.gql')

export default useGet
