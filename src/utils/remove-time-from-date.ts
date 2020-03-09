export default (date: Date | undefined) => {
  if (!date) {
    return null
  }

  return new Date(date.toDateString())
}
