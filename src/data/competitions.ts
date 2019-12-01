export interface ICompetition {
  type: 'battle' | 'classic' | 'complication' | 'reCap'
  status: 'finished' | 'running' | 'opened'
  location: string
  date: string
}

export const competitions: ICompetition[] = [
  {
    type: 'classic',
    status: 'opened',
    location: 'Харьковское Шосе',
    date: '30.02.2020',
  },
  {
    type: 'reCap',
    status: 'running',
    location: 'Харьковское Шосе',
    date: '30.02.2020',
  },
  {
    type: 'reCap',
    status: 'finished',
    location: 'Харьковское Шосе',
    date: '30.11.2019',
  },
  {
    type: 'complication',
    status: 'finished',
    location: 'Харьковское Шосе',
    date: '30.11.2019',
  },
  {
    type: 'classic',
    status: 'finished',
    location: 'Берестейская',
    date: '23.11.2019',
  },
  {
    type: 'classic',
    status: 'finished',
    location: 'Берестейская',
    date: '07.07.2019',
  },
  {
    type: 'reCap',
    status: 'finished',
    location: 'Берестейская',
    date: '07.07.2019',
  },
  {
    type: 'battle',
    status: 'finished',
    location: 'X-Park',
    date: '06.07.2019',
  },
  {
    type: 'complication',
    status: 'finished',
    location: 'X-Park',
    date: '06.07.2019',
  },
  {
    type: 'complication',
    status: 'finished',
    location: 'Харьковское Шосе',
    date: '02.03.2019',
  },
  {
    type: 'classic',
    status: 'finished',
    location: 'Берестейская',
    date: '15.12.2018',
  },
  {
    type: 'complication',
    status: 'finished',
    location: 'Берестейская / Sport Fest UA',
    date: '06.08.2018',
  },
  {
    type: 'battle',
    status: 'finished',
    location: 'Берестейская / Sport Fest UA',
    date: '06.08.2018',
  },
]
