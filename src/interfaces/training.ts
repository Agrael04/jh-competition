export default interface ITraining {
  id?: string

  gym: number | undefined
  date: Date | undefined
  trainer?: number | undefined
  time: string
  resource: number | undefined

  name?: string
  type?: string
  markPrice?: number | null
  moneyPrice?: number | null
  note?: string

  records: Array<{
    trainee: {
      _id: string
      fullName: string
    }
    seasonPass?: string
    status?: string
    note?: string
  }>
}
