export default interface IForm<T> {
  isActive: boolean
  mode?: 'create' | 'update'
  _id?: string
  defaultValues?: Partial<T>
}
