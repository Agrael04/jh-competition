export const addRecordUpdater = (record: any) => <T extends { trainingRecords: any[] }>(queryData: T): T => {
  const trainingRecords = [
    ...queryData.trainingRecords,
    record,
  ]

  return {
    ...queryData,
    trainingRecords,
  }
}

export const removeRecordUpdater = (...ids: string[]) => <T extends { trainingRecords: any[] }>(queryData: T): T => {
  console.log(queryData)

  const trainingRecords = queryData.trainingRecords
    .filter((tr: any) => !ids.find(_id => tr._id === _id))

  return {
    ...queryData,
    trainingRecords,
  }
}
