export const addTrainingPassUpdater = (record: any) => <T extends { trainingPasss: any[] }>(queryData: T): T => {
  const trainingPasss = [
    ...queryData.trainingPasss,
    record,
  ]

  return {
    ...queryData,
    trainingPasss,
  }
}
