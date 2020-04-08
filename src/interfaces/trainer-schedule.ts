export interface ITrainerScheduleForm {
  _id?: string
  trainer: {
    link: string
  }
  gym: {
    link: string
  }
  date: Date
  time: number
}
