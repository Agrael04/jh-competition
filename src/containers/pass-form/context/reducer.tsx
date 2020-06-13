import { ITrainingPassForm } from 'interfaces/training-pass'

import { passTypes, getSizes } from 'data/training-passes'

export interface IReducerState {
  passForm: ITrainingPassForm | null
}

export const updateForm = (pass: Partial<ITrainingPassForm>) => ({
  type: 'UPDATE_FORM',
  payload: { pass },
})

export const updateTypeField = (type: string) => {
  const passType = passTypes.find(t => t.value === type)
  const sizes = getSizes(type)

  const pass = {
    type,
    duration: passType?.duration,
    activation: passType?.activation,
    size: sizes ? sizes[0].value : null,
    capacity: sizes ? sizes[0].capacity : null,
    price: sizes ? sizes[0].price : null,
  }

  return ({
    type: 'UPDATE_FORM',
    payload: { pass },
  })
}

export const reducer = (state: IReducerState, { payload, type }: any) => {
  switch (type) {
    case 'UPDATE_FORM': {
      return {
        ...state,
        passForm: {
          ...state.passForm,
          ...payload.pass,
        },
      }
    }

    default:
      return state
  }
}
