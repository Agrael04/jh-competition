import gql from 'graphql-tag'

export default gql`
  query getTrainings($date: DateTime){
    trainings(query: { date: $date }) {
      _id
      time
      resource
      trainer
    }
  }
`
