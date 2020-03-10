import gql from 'graphql-tag'

export default gql`
  query getTraining($id: ObjectId){
    training(query: { _id: $id }) {
      _id
      date
      gym
      markPrice
      moneyPrice
      name
      note
      resource
      time
      trainer
      type
    }
    trainingRecords(query: { training: $id }) {
      seasonPass
      trainee {
        _id
        fullName
      }
      note
      status
      training
    }
  }
`
