import gql from 'graphql-tag'

export interface IGetTrainingsResponse {
  trainings: Array<{
    _id: string
    resource: number
    time: string
    trainer: number
  }>
}

export default gql`
  query getTrainings($date: DateTime){
    trainings(query: { date: $date }) {
      _id
      resource
      time
      trainer
    }
  }
`
