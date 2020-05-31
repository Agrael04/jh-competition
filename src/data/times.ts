export const times = [
  { id: 1, label: '8:00' },
  { id: 2, label: '8:30' },
  { id: 3, label: '9:00' },
  { id: 4, label: '9:30' },
  { id: 5, label: '10:00' },
  { id: 6, label: '10:30' },
  { id: 7, label: '11:00' },
  { id: 8, label: '11:30' },
  { id: 9, label: '12:00' },
  { id: 10, label: '12:30' },
  { id: 11, label: '13:00' },
  { id: 12, label: '13:30' },
  { id: 13, label: '14:00' },
  { id: 14, label: '14:30' },
  { id: 15, label: '15:00' },
  { id: 16, label: '15:30' },
  { id: 17, label: '16:00' },
  { id: 18, label: '16:30' },
  { id: 19, label: '17:00' },
  { id: 20, label: '17:30' },
  { id: 21, label: '18:00' },
  { id: 22, label: '18:30' },
  { id: 23, label: '19:00' },
  { id: 24, label: '19:30' },
  { id: 25, label: '20:00' },
  { id: 26, label: '20:30' },
  { id: 27, label: '21:00' },
  { id: 28, label: '21:30' },
  { id: 29, label: '22:00' },
]

export const getTimeLabel = (id?: number) => {
  return times.find(t => t.id === id)?.label
}

export default times
