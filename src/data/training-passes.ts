interface IPassType {
  text: string
  value: string
  duration?: number
  activation?: number
  sizes?: Array<{
    text: string
    value: string
    price: number
    capacity?: number
  }>
}

export const passTypes: IPassType[] = [
  {
    text: 'Универсальный',
    value: 'universal',
    duration: 45,
    activation: 31,
    sizes: [
      { text: 'XL(24)', value: 'XL', capacity: 24, price: 3000 },
      { text: 'L(18)', value: 'L', capacity: 18, price: 2520 },
      { text: 'M(12)', value: 'M', capacity: 12, price: 1980 },
      { text: 'S(6)', value: 'S', capacity: 6, price: 1050 },
    ],
  },
  {
    text: 'Без тренера',
    value: 'no_trainer',
    duration: 45,
    activation: 0,
    sizes: [
      { text: '40', value: '40', capacity: 80, price: 8000 },
      { text: '30', value: '30', capacity: 60, price: 6450 },
      { text: '20', value: '20', capacity: 40, price: 4600 },
      { text: '200', value: '200', capacity: 200, price: 34000 },
    ],
  },
  {
    text: 'Спорт',
    value: 'sport',
    duration: 31,
    activation: 0,
    sizes: [
      { text: 'Детский', value: 'child', price: 2000 },
      { text: 'Взрослый', value: 'adult', price: 2600 },
    ],
  },
  {
    text: 'Открытый',
    value: 'open',
  },
]

export const getSizes = (type?: string | null) => {
  return passTypes.find(t => t.value === type)?.sizes
}
