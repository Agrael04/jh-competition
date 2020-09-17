export default (client?: { lastName: string, firstName: string }) => {
  if (!client) {
    return ''
  }

  return `${client.lastName} ${client.firstName}`
}
