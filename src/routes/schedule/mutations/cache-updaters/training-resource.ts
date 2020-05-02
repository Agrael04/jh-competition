export const removeFromCache = (client: any, query: any) => (...ids: string[]) => {
  const queryData: any = client.readQuery(query)

  if (queryData) {
    const trainingResources = queryData.trainingResources
      .filter((tr: any) => !ids.find(_id => tr._id === _id))

    client.writeQuery({
      ...query,
      data: { ...queryData, trainingResources },
    })
  }
}

export const addResourceUpdater = (resource: any) => <T extends { trainingResources: any[] }>(queryData: T): T => {
  const trainingResources = [
    ...queryData.trainingResources,
    resource,
  ]

  return {
    ...queryData,
    trainingResources,
  }
}

export const removeResourceUpdater = (...ids: string[]) => <T extends { trainingResources: any[] }>(queryData: T): T => {
  const trainingResources = queryData.trainingResources
    .filter((tr: any) => !ids.find(_id => tr._id === _id))

  return {
    ...queryData,
    trainingResources,
  }
}
