import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjectId: any;
  /** The `DateTime` scalar type represents a DateTime. The DateTime is serialized as an RFC 3339 quoted string */
  DateTime: any;
};


export type DeleteManyPayload = {
   __typename?: 'DeleteManyPayload';
  deletedCount: Scalars['Int'];
};

export type InsertManyPayload = {
   __typename?: 'InsertManyPayload';
  insertedIds: Array<Maybe<Scalars['ObjectId']>>;
};

export type Mutation = {
   __typename?: 'Mutation';
  deleteManyTrainingRecords?: Maybe<DeleteManyPayload>;
  deleteManyTrainings?: Maybe<DeleteManyPayload>;
  deleteManyUsers?: Maybe<DeleteManyPayload>;
  deleteOneTraining?: Maybe<Training>;
  deleteOneTrainingRecord?: Maybe<TrainingRecord>;
  deleteOneUser?: Maybe<User>;
  insertManyTrainingRecords?: Maybe<InsertManyPayload>;
  insertManyTrainings?: Maybe<InsertManyPayload>;
  insertManyUsers?: Maybe<InsertManyPayload>;
  insertOneTraining?: Maybe<Training>;
  insertOneTrainingRecord?: Maybe<TrainingRecord>;
  insertOneUser?: Maybe<User>;
  replaceOneTraining?: Maybe<Training>;
  replaceOneTrainingRecord?: Maybe<TrainingRecord>;
  replaceOneUser?: Maybe<User>;
  updateManyTrainingRecords?: Maybe<UpdateManyPayload>;
  updateManyTrainings?: Maybe<UpdateManyPayload>;
  updateManyUsers?: Maybe<UpdateManyPayload>;
  updateOneTraining?: Maybe<Training>;
  updateOneTrainingRecord?: Maybe<TrainingRecord>;
  updateOneUser?: Maybe<User>;
  upsertOneTraining?: Maybe<Training>;
  upsertOneTrainingRecord?: Maybe<TrainingRecord>;
  upsertOneUser?: Maybe<User>;
};


export type MutationDeleteManyTrainingRecordsArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
};


export type MutationDeleteManyTrainingsArgs = {
  query?: Maybe<TrainingQueryInput>;
};


export type MutationDeleteManyUsersArgs = {
  query?: Maybe<UserQueryInput>;
};


export type MutationDeleteOneTrainingArgs = {
  query: TrainingQueryInput;
};


export type MutationDeleteOneTrainingRecordArgs = {
  query: TrainingRecordQueryInput;
};


export type MutationDeleteOneUserArgs = {
  query: UserQueryInput;
};


export type MutationInsertManyTrainingRecordsArgs = {
  data: Array<TrainingRecordInsertInput>;
};


export type MutationInsertManyTrainingsArgs = {
  data: Array<TrainingInsertInput>;
};


export type MutationInsertManyUsersArgs = {
  data: Array<UserInsertInput>;
};


export type MutationInsertOneTrainingArgs = {
  data: TrainingInsertInput;
};


export type MutationInsertOneTrainingRecordArgs = {
  data: TrainingRecordInsertInput;
};


export type MutationInsertOneUserArgs = {
  data: UserInsertInput;
};


export type MutationReplaceOneTrainingArgs = {
  data: TrainingInsertInput;
  query?: Maybe<TrainingQueryInput>;
};


export type MutationReplaceOneTrainingRecordArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
  data: TrainingRecordInsertInput;
};


export type MutationReplaceOneUserArgs = {
  query?: Maybe<UserQueryInput>;
  data: UserInsertInput;
};


export type MutationUpdateManyTrainingRecordsArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
  set: TrainingRecordUpdateInput;
};


export type MutationUpdateManyTrainingsArgs = {
  query?: Maybe<TrainingQueryInput>;
  set: TrainingUpdateInput;
};


export type MutationUpdateManyUsersArgs = {
  query?: Maybe<UserQueryInput>;
  set: UserUpdateInput;
};


export type MutationUpdateOneTrainingArgs = {
  query?: Maybe<TrainingQueryInput>;
  set: TrainingUpdateInput;
};


export type MutationUpdateOneTrainingRecordArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
  set: TrainingRecordUpdateInput;
};


export type MutationUpdateOneUserArgs = {
  set: UserUpdateInput;
  query?: Maybe<UserQueryInput>;
};


export type MutationUpsertOneTrainingArgs = {
  query?: Maybe<TrainingQueryInput>;
  data: TrainingInsertInput;
};


export type MutationUpsertOneTrainingRecordArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
  data: TrainingRecordInsertInput;
};


export type MutationUpsertOneUserArgs = {
  data: UserInsertInput;
  query?: Maybe<UserQueryInput>;
};


export type Query = {
   __typename?: 'Query';
  training?: Maybe<Training>;
  trainingRecord?: Maybe<TrainingRecord>;
  trainingRecords: Array<Maybe<TrainingRecord>>;
  trainings: Array<Maybe<Training>>;
  user?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryTrainingArgs = {
  query?: Maybe<TrainingQueryInput>;
};


export type QueryTrainingRecordArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
};


export type QueryTrainingRecordsArgs = {
  query?: Maybe<TrainingRecordQueryInput>;
  sortBy?: Maybe<TrainingRecordSortByInput>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryTrainingsArgs = {
  query?: Maybe<TrainingQueryInput>;
  sortBy?: Maybe<TrainingSortByInput>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  query?: Maybe<UserQueryInput>;
};


export type QueryUsersArgs = {
  query?: Maybe<UserQueryInput>;
  sortBy?: Maybe<UserSortByInput>;
  limit?: Maybe<Scalars['Int']>;
};

export type Training = {
   __typename?: 'Training';
  _id?: Maybe<Scalars['ObjectId']>;
  date?: Maybe<Scalars['DateTime']>;
  gym?: Maybe<Scalars['Int']>;
  markPrice?: Maybe<Scalars['Int']>;
  moneyPrice?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  records?: Maybe<Array<Maybe<TrainingRecord>>>;
  resource?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['String']>;
  trainer?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type TrainingInsertInput = {
  markPrice?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  gym?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  moneyPrice?: Maybe<Scalars['Int']>;
  trainer?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['Int']>;
};

export type TrainingQueryInput = {
  resource?: Maybe<Scalars['Int']>;
  records?: Maybe<Array<Maybe<TrainingRecordQueryInput>>>;
  trainer?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  markPrice?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  time?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  gym?: Maybe<Scalars['Int']>;
  moneyPrice?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

export type TrainingRecord = {
   __typename?: 'TrainingRecord';
  _id?: Maybe<Scalars['ObjectId']>;
  note?: Maybe<Scalars['String']>;
  seasonPass?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  trainee?: Maybe<User>;
  training?: Maybe<Scalars['ObjectId']>;
};

export type TrainingRecordInsertInput = {
  status?: Maybe<Scalars['String']>;
  trainee?: Maybe<TrainingRecordTraineeRelationInput>;
  training?: Maybe<Scalars['ObjectId']>;
  _id?: Maybe<Scalars['ObjectId']>;
  note?: Maybe<Scalars['String']>;
  seasonPass?: Maybe<Scalars['String']>;
};

export type TrainingRecordQueryInput = {
  trainee?: Maybe<UserQueryInput>;
  training?: Maybe<Scalars['ObjectId']>;
  _id?: Maybe<Scalars['ObjectId']>;
  note?: Maybe<Scalars['String']>;
  seasonPass?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export enum TrainingRecordSortByInput {
  StatusAsc = 'STATUS_ASC',
  StatusDesc = 'STATUS_DESC',
  TraineeAsc = 'TRAINEE_ASC',
  TraineeDesc = 'TRAINEE_DESC',
  TrainingAsc = 'TRAINING_ASC',
  TrainingDesc = 'TRAINING_DESC',
  IdAsc = '_ID_ASC',
  NoteAsc = 'NOTE_ASC',
  NoteDesc = 'NOTE_DESC',
  IdDesc = '_ID_DESC',
  SeasonpassAsc = 'SEASONPASS_ASC',
  SeasonpassDesc = 'SEASONPASS_DESC'
}

export type TrainingRecordTraineeRelationInput = {
  create?: Maybe<UserInsertInput>;
  link?: Maybe<Scalars['ObjectId']>;
};

export type TrainingRecordUpdateInput = {
  _id?: Maybe<Scalars['ObjectId']>;
  note?: Maybe<Scalars['String']>;
  seasonPass?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  trainee?: Maybe<TrainingRecordTraineeRelationInput>;
  training?: Maybe<Scalars['ObjectId']>;
};

export enum TrainingSortByInput {
  IdAsc = '_ID_ASC',
  TrainerAsc = 'TRAINER_ASC',
  IdDesc = '_ID_DESC',
  MoneypriceAsc = 'MONEYPRICE_ASC',
  ResourceAsc = 'RESOURCE_ASC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  GymAsc = 'GYM_ASC',
  NoteDesc = 'NOTE_DESC',
  ResourceDesc = 'RESOURCE_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  MarkpriceAsc = 'MARKPRICE_ASC',
  TrainerDesc = 'TRAINER_DESC',
  NameDesc = 'NAME_DESC',
  GymDesc = 'GYM_DESC',
  MoneypriceDesc = 'MONEYPRICE_DESC',
  NoteAsc = 'NOTE_ASC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  MarkpriceDesc = 'MARKPRICE_DESC',
  NameAsc = 'NAME_ASC'
}

export type TrainingUpdateInput = {
  moneyPrice?: Maybe<Scalars['Int']>;
  gym?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['DateTime']>;
  name?: Maybe<Scalars['String']>;
  trainer?: Maybe<Scalars['Int']>;
  _id?: Maybe<Scalars['ObjectId']>;
  time?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['Int']>;
  markPrice?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdateManyPayload = {
   __typename?: 'UpdateManyPayload';
  matchedCount: Scalars['Int'];
  modifiedCount: Scalars['Int'];
};

export type User = {
   __typename?: 'User';
  _id?: Maybe<Scalars['ObjectId']>;
  altPhone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  childName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type UserInsertInput = {
  birthday?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  altPhone?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  childName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export type UserQueryInput = {
  type?: Maybe<Scalars['String']>;
  altPhone?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  childName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
};

export enum UserSortByInput {
  IdDesc = '_ID_DESC',
  NoteAsc = 'NOTE_ASC',
  PhoneAsc = 'PHONE_ASC',
  ChildnameAsc = 'CHILDNAME_ASC',
  BirthdayAsc = 'BIRTHDAY_ASC',
  PhoneDesc = 'PHONE_DESC',
  FullnameDesc = 'FULLNAME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NoteDesc = 'NOTE_DESC',
  QuestionarynumberAsc = 'QUESTIONARYNUMBER_ASC',
  QuestionarynumberDesc = 'QUESTIONARYNUMBER_DESC',
  ChildnameDesc = 'CHILDNAME_DESC',
  TypeAsc = 'TYPE_ASC',
  IdAsc = '_ID_ASC',
  AltphoneAsc = 'ALTPHONE_ASC',
  AltphoneDesc = 'ALTPHONE_DESC',
  BirthdayDesc = 'BIRTHDAY_DESC',
  FullnameAsc = 'FULLNAME_ASC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  SurnameAsc = 'SURNAME_ASC',
  SurnameDesc = 'SURNAME_DESC',
  TypeDesc = 'TYPE_DESC'
}

export type UserUpdateInput = {
  phone?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  altPhone?: Maybe<Scalars['String']>;
  childName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  birthday?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
};

export type CreateTrainingRecordsMutationVariables = {
  records: Array<TrainingRecordInsertInput>;
};


export type CreateTrainingRecordsMutation = (
  { __typename?: 'Mutation' }
  & { insertManyTrainingRecords: Maybe<(
    { __typename?: 'InsertManyPayload' }
    & Pick<InsertManyPayload, 'insertedIds'>
  )> }
);

export type CreateTrainingMutationVariables = {
  training: TrainingInsertInput;
};


export type CreateTrainingMutation = (
  { __typename?: 'Mutation' }
  & { insertOneTraining: Maybe<(
    { __typename?: 'Training' }
    & Pick<Training, '_id'>
  )> }
);

export type DeleteTrainingMutationVariables = {
  _id: Scalars['ObjectId'];
};


export type DeleteTrainingMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneTraining: Maybe<(
    { __typename?: 'Training' }
    & Pick<Training, '_id'>
  )>, deleteManyTrainingRecords: Maybe<(
    { __typename?: 'DeleteManyPayload' }
    & Pick<DeleteManyPayload, 'deletedCount'>
  )> }
);

export type UpdateTrainingMutationVariables = {
  _id: Scalars['ObjectId'];
  training: TrainingUpdateInput;
};


export type UpdateTrainingMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTraining: Maybe<(
    { __typename?: 'Training' }
    & Pick<Training, '_id'>
  )>, deleteManyTrainingRecords: Maybe<(
    { __typename?: 'DeleteManyPayload' }
    & Pick<DeleteManyPayload, 'deletedCount'>
  )> }
);

export type GetTrainingQueryVariables = {
  id?: Maybe<Scalars['ObjectId']>;
};


export type GetTrainingQuery = (
  { __typename?: 'Query' }
  & { training: Maybe<(
    { __typename?: 'Training' }
    & Pick<Training, '_id' | 'date' | 'gym' | 'markPrice' | 'moneyPrice' | 'name' | 'note' | 'resource' | 'time' | 'trainer' | 'type'>
  )>, trainingRecords: Array<Maybe<(
    { __typename?: 'TrainingRecord' }
    & Pick<TrainingRecord, 'seasonPass' | 'note' | 'status' | 'training'>
    & { trainee: Maybe<(
      { __typename?: 'User' }
      & Pick<User, '_id' | 'fullName'>
    )> }
  )>> }
);

export type GetTrainingsQueryVariables = {
  date?: Maybe<Scalars['DateTime']>;
};


export type GetTrainingsQuery = (
  { __typename?: 'Query' }
  & { trainings: Array<Maybe<(
    { __typename?: 'Training' }
    & Pick<Training, '_id' | 'time' | 'resource' | 'trainer'>
  )>> }
);


export const CreateTrainingRecordsDocument = gql`
    mutation createTrainingRecords($records: [TrainingRecordInsertInput!]!) {
  insertManyTrainingRecords(data: $records) {
    insertedIds
  }
}
    `;
export type CreateTrainingRecordsMutationFn = ApolloReactCommon.MutationFunction<CreateTrainingRecordsMutation, CreateTrainingRecordsMutationVariables>;

/**
 * __useCreateTrainingRecordsMutation__
 *
 * To run a mutation, you first call `useCreateTrainingRecordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainingRecordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainingRecordsMutation, { data, loading, error }] = useCreateTrainingRecordsMutation({
 *   variables: {
 *      records: // value for 'records'
 *   },
 * });
 */
export function useCreateTrainingRecordsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTrainingRecordsMutation, CreateTrainingRecordsMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTrainingRecordsMutation, CreateTrainingRecordsMutationVariables>(CreateTrainingRecordsDocument, baseOptions);
      }
export type CreateTrainingRecordsMutationHookResult = ReturnType<typeof useCreateTrainingRecordsMutation>;
export type CreateTrainingRecordsMutationResult = ApolloReactCommon.MutationResult<CreateTrainingRecordsMutation>;
export type CreateTrainingRecordsMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTrainingRecordsMutation, CreateTrainingRecordsMutationVariables>;
export const CreateTrainingDocument = gql`
    mutation createTraining($training: TrainingInsertInput!) {
  insertOneTraining(data: $training) {
    _id
  }
}
    `;
export type CreateTrainingMutationFn = ApolloReactCommon.MutationFunction<CreateTrainingMutation, CreateTrainingMutationVariables>;

/**
 * __useCreateTrainingMutation__
 *
 * To run a mutation, you first call `useCreateTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTrainingMutation, { data, loading, error }] = useCreateTrainingMutation({
 *   variables: {
 *      training: // value for 'training'
 *   },
 * });
 */
export function useCreateTrainingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateTrainingMutation, CreateTrainingMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateTrainingMutation, CreateTrainingMutationVariables>(CreateTrainingDocument, baseOptions);
      }
export type CreateTrainingMutationHookResult = ReturnType<typeof useCreateTrainingMutation>;
export type CreateTrainingMutationResult = ApolloReactCommon.MutationResult<CreateTrainingMutation>;
export type CreateTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateTrainingMutation, CreateTrainingMutationVariables>;
export const DeleteTrainingDocument = gql`
    mutation deleteTraining($_id: ObjectId!) {
  deleteOneTraining(query: {_id: $_id}) {
    _id
  }
  deleteManyTrainingRecords(query: {_id: $_id}) {
    deletedCount
  }
}
    `;
export type DeleteTrainingMutationFn = ApolloReactCommon.MutationFunction<DeleteTrainingMutation, DeleteTrainingMutationVariables>;

/**
 * __useDeleteTrainingMutation__
 *
 * To run a mutation, you first call `useDeleteTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTrainingMutation, { data, loading, error }] = useDeleteTrainingMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useDeleteTrainingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTrainingMutation, DeleteTrainingMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTrainingMutation, DeleteTrainingMutationVariables>(DeleteTrainingDocument, baseOptions);
      }
export type DeleteTrainingMutationHookResult = ReturnType<typeof useDeleteTrainingMutation>;
export type DeleteTrainingMutationResult = ApolloReactCommon.MutationResult<DeleteTrainingMutation>;
export type DeleteTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTrainingMutation, DeleteTrainingMutationVariables>;
export const UpdateTrainingDocument = gql`
    mutation updateTraining($_id: ObjectId!, $training: TrainingUpdateInput!) {
  updateOneTraining(query: {_id: $_id}, set: $training) {
    _id
  }
  deleteManyTrainingRecords(query: {training: $_id}) {
    deletedCount
  }
}
    `;
export type UpdateTrainingMutationFn = ApolloReactCommon.MutationFunction<UpdateTrainingMutation, UpdateTrainingMutationVariables>;

/**
 * __useUpdateTrainingMutation__
 *
 * To run a mutation, you first call `useUpdateTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTrainingMutation, { data, loading, error }] = useUpdateTrainingMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      training: // value for 'training'
 *   },
 * });
 */
export function useUpdateTrainingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTrainingMutation, UpdateTrainingMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTrainingMutation, UpdateTrainingMutationVariables>(UpdateTrainingDocument, baseOptions);
      }
export type UpdateTrainingMutationHookResult = ReturnType<typeof useUpdateTrainingMutation>;
export type UpdateTrainingMutationResult = ApolloReactCommon.MutationResult<UpdateTrainingMutation>;
export type UpdateTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTrainingMutation, UpdateTrainingMutationVariables>;
export const GetTrainingDocument = gql`
    query getTraining($id: ObjectId) {
  training(query: {_id: $id}) {
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
  trainingRecords(query: {training: $id}) {
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
    `;

/**
 * __useGetTrainingQuery__
 *
 * To run a query within a React component, call `useGetTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrainingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTrainingQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrainingQuery, GetTrainingQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTrainingQuery, GetTrainingQueryVariables>(GetTrainingDocument, baseOptions);
      }
export function useGetTrainingLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrainingQuery, GetTrainingQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTrainingQuery, GetTrainingQueryVariables>(GetTrainingDocument, baseOptions);
        }
export type GetTrainingQueryHookResult = ReturnType<typeof useGetTrainingQuery>;
export type GetTrainingLazyQueryHookResult = ReturnType<typeof useGetTrainingLazyQuery>;
export type GetTrainingQueryResult = ApolloReactCommon.QueryResult<GetTrainingQuery, GetTrainingQueryVariables>;
export const GetTrainingsDocument = gql`
    query getTrainings($date: DateTime) {
  trainings(query: {date: $date}) {
    _id
    time
    resource
    trainer
  }
}
    `;

/**
 * __useGetTrainingsQuery__
 *
 * To run a query within a React component, call `useGetTrainingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrainingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrainingsQuery({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useGetTrainingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrainingsQuery, GetTrainingsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTrainingsQuery, GetTrainingsQueryVariables>(GetTrainingsDocument, baseOptions);
      }
export function useGetTrainingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrainingsQuery, GetTrainingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTrainingsQuery, GetTrainingsQueryVariables>(GetTrainingsDocument, baseOptions);
        }
export type GetTrainingsQueryHookResult = ReturnType<typeof useGetTrainingsQuery>;
export type GetTrainingsLazyQueryHookResult = ReturnType<typeof useGetTrainingsLazyQuery>;
export type GetTrainingsQueryResult = ApolloReactCommon.QueryResult<GetTrainingsQuery, GetTrainingsQueryVariables>;