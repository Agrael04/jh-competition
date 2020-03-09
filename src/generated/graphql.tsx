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
  /** The `DateTime` scalar type represents a DateTime. The DateTime is serialized as an RFC 3339 quoted string */
  DateTime: any;
  ObjectId: any;
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
  query?: Maybe<TrainingQueryInput>;
  data: TrainingInsertInput;
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
  set: TrainingUpdateInput;
  query?: Maybe<TrainingQueryInput>;
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
  query?: Maybe<UserQueryInput>;
  set: UserUpdateInput;
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
  query?: Maybe<UserQueryInput>;
  data: UserInsertInput;
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
  gym?: Maybe<Scalars['Int']>;
  markPrice?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['DateTime']>;
  type?: Maybe<Scalars['String']>;
  trainer?: Maybe<Scalars['Int']>;
  _id?: Maybe<Scalars['ObjectId']>;
  name?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['Int']>;
  time?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  moneyPrice?: Maybe<Scalars['Int']>;
};

export type TrainingQueryInput = {
  trainer?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['Int']>;
  date?: Maybe<Scalars['DateTime']>;
  records?: Maybe<Array<Maybe<TrainingRecordQueryInput>>>;
  markPrice?: Maybe<Scalars['Int']>;
  _id?: Maybe<Scalars['ObjectId']>;
  gym?: Maybe<Scalars['Int']>;
  moneyPrice?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
};

export type TrainingRecord = {
   __typename?: 'TrainingRecord';
  _id?: Maybe<Scalars['ObjectId']>;
  note?: Maybe<Scalars['String']>;
  seasonPass?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  trainee?: Maybe<User>;
};

export type TrainingRecordInsertInput = {
  seasonPass?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  trainee?: Maybe<TrainingRecordTraineeRelationInput>;
  _id?: Maybe<Scalars['ObjectId']>;
  note?: Maybe<Scalars['String']>;
};

export type TrainingRecordQueryInput = {
  note?: Maybe<Scalars['String']>;
  seasonPass?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  trainee?: Maybe<UserQueryInput>;
  _id?: Maybe<Scalars['ObjectId']>;
};

export enum TrainingRecordSortByInput {
  NoteDesc = 'NOTE_DESC',
  StatusAsc = 'STATUS_ASC',
  TraineeAsc = 'TRAINEE_ASC',
  IdAsc = '_ID_ASC',
  NoteAsc = 'NOTE_ASC',
  SeasonpassDesc = 'SEASONPASS_DESC',
  StatusDesc = 'STATUS_DESC',
  TraineeDesc = 'TRAINEE_DESC',
  IdDesc = '_ID_DESC',
  SeasonpassAsc = 'SEASONPASS_ASC'
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
};

export enum TrainingSortByInput {
  IdAsc = '_ID_ASC',
  MoneypriceAsc = 'MONEYPRICE_ASC',
  NameAsc = 'NAME_ASC',
  NoteDesc = 'NOTE_DESC',
  ResourceAsc = 'RESOURCE_ASC',
  TrainerDesc = 'TRAINER_DESC',
  TypeAsc = 'TYPE_ASC',
  IdDesc = '_ID_DESC',
  NameDesc = 'NAME_DESC',
  TimeAsc = 'TIME_ASC',
  TimeDesc = 'TIME_DESC',
  MoneypriceDesc = 'MONEYPRICE_DESC',
  NoteAsc = 'NOTE_ASC',
  TypeDesc = 'TYPE_DESC',
  MarkpriceDesc = 'MARKPRICE_DESC',
  ResourceDesc = 'RESOURCE_DESC',
  DateAsc = 'DATE_ASC',
  DateDesc = 'DATE_DESC',
  GymAsc = 'GYM_ASC',
  GymDesc = 'GYM_DESC',
  MarkpriceAsc = 'MARKPRICE_ASC',
  TrainerAsc = 'TRAINER_ASC'
}

export type TrainingUpdateInput = {
  date?: Maybe<Scalars['DateTime']>;
  moneyPrice?: Maybe<Scalars['Int']>;
  markPrice?: Maybe<Scalars['Int']>;
  resource?: Maybe<Scalars['Int']>;
  trainer?: Maybe<Scalars['Int']>;
  _id?: Maybe<Scalars['ObjectId']>;
  name?: Maybe<Scalars['String']>;
  time?: Maybe<Scalars['String']>;
  gym?: Maybe<Scalars['Int']>;
  note?: Maybe<Scalars['String']>;
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
  childName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
  altPhone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
};

export type UserQueryInput = {
  source?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  altPhone?: Maybe<Scalars['String']>;
  childName?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  surname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export enum UserSortByInput {
  BirthdayDesc = 'BIRTHDAY_DESC',
  FullnameDesc = 'FULLNAME_DESC',
  QuestionarynumberDesc = 'QUESTIONARYNUMBER_DESC',
  ChildnameAsc = 'CHILDNAME_ASC',
  ChildnameDesc = 'CHILDNAME_DESC',
  SurnameDesc = 'SURNAME_DESC',
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  BirthdayAsc = 'BIRTHDAY_ASC',
  NameDesc = 'NAME_DESC',
  PhoneAsc = 'PHONE_ASC',
  PhoneDesc = 'PHONE_DESC',
  QuestionarynumberAsc = 'QUESTIONARYNUMBER_ASC',
  SourceDesc = 'SOURCE_DESC',
  AltphoneAsc = 'ALTPHONE_ASC',
  SurnameAsc = 'SURNAME_ASC',
  TypeAsc = 'TYPE_ASC',
  NameAsc = 'NAME_ASC',
  NoteAsc = 'NOTE_ASC',
  NoteDesc = 'NOTE_DESC',
  TypeDesc = 'TYPE_DESC',
  FullnameAsc = 'FULLNAME_ASC',
  SourceAsc = 'SOURCE_ASC',
  AltphoneDesc = 'ALTPHONE_DESC'
}

export type UserUpdateInput = {
  childName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['ObjectId']>;
  birthday?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  source?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  altPhone?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  questionaryNumber?: Maybe<Scalars['String']>;
};

export type GetTrainingQueryVariables = {
  id?: Maybe<Scalars['ObjectId']>;
};


export type GetTrainingQuery = (
  { __typename?: 'Query' }
  & { training: Maybe<(
    { __typename?: 'Training' }
    & Pick<Training, '_id' | 'date' | 'gym' | 'markPrice' | 'moneyPrice' | 'name' | 'note' | 'resource' | 'time' | 'trainer' | 'type'>
    & { records: Maybe<Array<Maybe<(
      { __typename?: 'TrainingRecord' }
      & Pick<TrainingRecord, '_id' | 'seasonPass' | 'note' | 'status'>
      & { trainee: Maybe<(
        { __typename?: 'User' }
        & Pick<User, '_id' | 'fullName'>
      )> }
    )>>> }
  )> }
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
    records {
      _id
      seasonPass
      trainee {
        _id
        fullName
      }
      note
      status
    }
    resource
    time
    trainer
    type
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