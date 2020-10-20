export default interface IRecordForm {
  contact: { link: string }
  resource: { link: string }

  attendant?: { link: string }
  status?: string
  note?: string
}