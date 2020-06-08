interface IPayment {
  _id: string
  date: Date
  amount: number
  pass: {
    _id: string
  }
}

interface IPass {
  _id: string
  createdAt: Date
  activation: number
  duration: number
}

export const getUsedUnits = (payments: IPayment[], pass: IPass) => {
  return payments.filter(p => p.pass?._id === pass._id).reduce((res, a) => res + a.amount, 0)!
}

export const getFirstDate = (payments: IPayment[], pass: IPass) => {
  return payments.filter(p => p.pass?._id === pass._id).map(p => new Date(p.date).getDate()).sort((a, b) => a - b)[0]!
}

export const getActivationDate = (payments: IPayment[], pass: IPass) => {
  const maxActivationDate = new Date(pass.createdAt).getDate() + pass.activation
  const firstDate = getFirstDate(payments, pass)

  return maxActivationDate > firstDate ? firstDate : maxActivationDate
}

export const getExpirationDate = (payments: IPayment[], pass: IPass) => {
  const activationDate = getActivationDate(payments, pass)

  const date = new Date()
  date.setDate(activationDate + pass.duration)

  return date
}
