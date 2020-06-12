import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions'
import constants from 'store/constants/check-dialog'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { IPaymentForm } from 'interfaces/payment'
import { IServiceForm } from 'interfaces/service'

import { IStoreState } from 'store'

export function* openRecord(action: ReturnType<typeof actions.checkDialog.openRecord>) {
  try {
    yield put(actions.checkDialog.setRecord(action.payload.record, 'update'))
  } catch (error) {
    console.log(error)
  }
}

export function* openService(action: ReturnType<typeof actions.checkDialog.openService>) {
  try {
    const { contact } = yield select((state: IStoreState) => ({
      contact: state.checkDialog.contact,
    }))

    let service: Partial<IServiceForm>
    let mode: 'create' | 'update' | null = null

    if (action.payload.service) {
      service = action.payload.service
      mode = 'update'
    } else {
      service = {
        _id: new BSON.ObjectID(),
        contact: { link: contact },
        type: undefined,
        service: undefined,
        priceAmount: 0,
        priceType: 'money',
      }
      mode = 'create'
    }

    yield put(actions.checkDialog.setService(service, mode))
  } catch (error) {
    console.log(error)
  }
}

export function* openPayment(action: ReturnType<typeof actions.checkDialog.openPayment>) {
  try {
    const { gym, activeDate, contact } = yield select((state: IStoreState) => ({
      gym: state.schedule.page.activeGym,
      activeDate: state.schedule.page.activeDate,
      contact: state.checkDialog.contact,
    }))

    let payment: Partial<IPaymentForm>
    let mode: 'create' | 'update' | null = null

    if (action.payload.payment) {
      payment = action.payload.payment
      mode = 'update'
    } else {
      payment = {
        _id: new BSON.ObjectID(),
        contact: { link: contact },
        gym: { link: gym },
        date: activeDate,
        createdAt: activeDate,
        type: 'units',
        amount: null,
        isDebt: false,
      }
      mode = 'create'
    }

    yield put(actions.checkDialog.setPayment(payment, mode))
  } catch (error) {
    console.log(error)
  }
}

export function* openPass(action: ReturnType<typeof actions.checkDialog.openPass>) {
  try {
    const { contact, activeDate } = yield select((state: IStoreState) => ({
      contact: state.checkDialog.contact,
      activeDate: state.schedule.page.activeDate,
    }))

    const pass: Partial<ITrainingPassForm> = {
      _id: new BSON.ObjectID(),
      contact: { link: contact },
      type: null,
      size: null,
      capacity: null,
      duration: null,
      activation: null,
      createdAt: activeDate,
    }
    const mode = 'create'

    yield put(actions.passForm.open(mode, pass, action.payload.initialFilter))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenRecord() {
  yield takeLatest(constants.OPEN_RECORD, openRecord)
}

function* watchOpenService() {
  yield takeLatest(constants.OPEN_SERVICE, openService)
}

function* watchOpenPayment() {
  yield takeLatest(constants.OPEN_PAYMENT, openPayment)
}

function* watchOpenPass() {
  yield takeLatest(constants.OPEN_PASS, openPass)
}

export default function* root() {
  yield all([
    watchOpenRecord(),
    watchOpenService(),
    watchOpenPayment(),
    watchOpenPass(),
  ])
}
