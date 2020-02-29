import { all, takeLatest, select, call, put } from 'redux-saga/effects'

import actions from '../../actions'
import constants from '../../constants/trainings'

import { IStoreState } from '../../index'

import { createTraining, readTrainings, updateTraining, deleteTraining } from '../../../api/mongodb/training'

export function* createTrainingSaga(action: ReturnType<typeof actions.trainings.createTraining>) {
  try {
    const training = yield select((state: IStoreState) => state.schedule.recordForm)

    yield call(createTraining, training)

    yield put(actions.trainings.readTrainings())
    yield put(actions.schedule.closeRecordDialog())
  } catch (error) {
    console.log(error)
  }
}

export function* readTrainingsSaga(action: ReturnType<typeof actions.trainings.readTrainings>) {
  try {
    const res = yield call(readTrainings)

    yield put(actions.trainings.readTrainingsSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

export function* updateTrainingSaga(action: ReturnType<typeof actions.trainings.createTraining>) {
  try {
    const training = yield select((state: IStoreState) => state.schedule.recordForm)
    const oldTraining = yield select((state: IStoreState) => state.trainings.data.find(tr => tr._id === training._id))

    yield call(updateTraining, oldTraining, training)

    yield put(actions.trainings.readTrainings())
    yield put(actions.schedule.closeRecordDialog())
  } catch (error) {
    console.log(error)
  }
}

export function* deleteTrainingSaga(action: ReturnType<typeof actions.trainings.deleteTraining>) {
  try {
    const training = yield select((state: IStoreState) => state.schedule.recordForm)

    yield call(deleteTraining, training)

    yield put(actions.trainings.readTrainings())
    yield put(actions.schedule.closeRecordDialog())
  } catch (error) {
    console.log(error)
  }
}

function* watchCreateTraining() {
  yield takeLatest(constants.CREATE_TRAINING, createTrainingSaga)
}

function* watchReadTrainings() {
  yield takeLatest(constants.READ_TRAININGS, readTrainingsSaga)
}

function* watchUpdateTraining() {
  yield takeLatest(constants.UPDATE_TRAINING, updateTrainingSaga)
}

function* watchDeleteTraining() {
  yield takeLatest(constants.DELETE_TRAINING, deleteTrainingSaga)
}

export default function*() {
  yield all([
    watchCreateTraining(),
    watchReadTrainings(),
    watchUpdateTraining(),
    watchDeleteTraining(),
  ])
}
