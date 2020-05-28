import { all, put, takeLatest, select } from 'redux-saga/effects'
import { BSON } from 'mongodb-stitch-browser-sdk'

import { actions } from 'store/actions/check-dialog'
import constants from 'store/constants/check-dialog'

import { ITrainingPassForm } from 'interfaces/training-pass'
import { IPaymentForm } from 'interfaces/payment'

import { IStoreState } from 'store'

export function* openPayment(action: ReturnType<typeof actions.openPayment>) {
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

    yield put(actions.setPayment(payment, mode))
  } catch (error) {
    console.log(error)
  }
}

export function* openPass(action: ReturnType<typeof actions.openPass>) {
  try {
    const { contact, activeDate } = yield select((state: IStoreState) => ({
      contact: state.checkDialog.contact,
      activeDate: state.schedule.page.activeDate,
    }))

    let pass: Partial<ITrainingPassForm>
    let mode: 'create' | 'update' | null = null

    if (action.payload.pass) {
      pass = action.payload.pass
      mode = 'update'
    } else {
      pass = {
        _id: new BSON.ObjectID(),
        contact: { link: contact },
        type: null,
        size: null,
        capacity: null,
        duration: null,
        activation: null,
        createdAt: activeDate,
        // activatedAt: null,
        // activatesIn: null,
        // expiresIn: null,
      }
      mode = 'create'
    }

    yield put(actions.setPass(pass, mode))
  } catch (error) {
    console.log(error)
  }
}

function* watchOpenPayment() {
  yield takeLatest(constants.OPEN_PAYMENT, openPayment)
}

function* watchOpenPass() {
  yield takeLatest(constants.OPEN_PASS, openPass)
}

export default function* root() {
  yield all([
    watchOpenPayment(),
    watchOpenPass(),
  ])
}
