const RENT = 'RENT'
const RENT_WITH_TRAINER = 'RENT_WITH_TRAINER'
const INDIVIDUAL = 'INDIVIDUAL'
const GUEST = 'GUEST'

const GROUP = 'GROUP'
const EVENT = 'EVENT'
const SECTION = 'SECTION'

export const SINGLE_TRAININGS = {
  RENT,
  RENT_WITH_TRAINER,
  INDIVIDUAL,
  GUEST,
}

export const GROUP_TRAININGS = {
  GROUP,
  EVENT,
  SECTION,
}

export const trainingTypes = [
  {
    id: RENT,
    text: 'Аренда батута',
    hasResourceLimit: true,
  },
  {
    id: RENT_WITH_TRAINER,
    text: 'Аренда батута с тренером',
    hasResourceLimit: true,
  },
  {
    id: INDIVIDUAL,
    text: 'Индивидуальная тренировка',
    hasResourceLimit: true,
  },
  {
    id: GUEST,
    text: 'Гостевой',
    hasResourceLimit: true,
  },

  {
    id: GROUP,
    text: 'Групповая тренировка',
    hasResourceLimit: false,
  },
  {
    id: EVENT,
    text: 'Тематическое мероприятие',
    hasResourceLimit: false,
  },
  {
    id: SECTION,
    text: 'Спортивная секция',
    hasResourceLimit: false,
  },
  // {
  //   id: 'AMUSEMENT',
  //   text: 'Аттракцион(5, 10, 15) мин',
  //   hasResourceLimit: false,
  // },
] as const
