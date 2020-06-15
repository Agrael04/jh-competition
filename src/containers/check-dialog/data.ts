
export const paymentTypes = [
  { text: 'Деньги', value: 'money' },
  { text: 'Абонимент', value: 'units' },
]

export const paymentDestinations = [
  { text: 'Готівка Берест', value: '1' },
  { text: 'Готівка Харківське Шосе', value: '2' },
  { text: 'Готівка Почайна', value: '3' },
  { text: 'Готівка ПДН', value: '4' },
  { text: 'Термінал Берест', value: '5' },
  { text: 'Картка "ПБ Мазурик"', value: '6' },
  { text: 'ФОП "Мазурик ОМ"', value: '7' },
]

export const products = [
  {
    id: 'product',
    name: 'Товар',
    options: [
      { id: 0, name: 'Coca-Cola 0,33' },
      { id: 1, name: 'Pepsi 0,33' },
      { id: 2, name: 'Fanta 0,33' },
      { id: 3, name: 'Sprite 0,33' },
      { id: 4, name: 'Jaffa Vital' },
      { id: 5, name: 'Nestea' },
      { id: 6, name: 'Aquarte 0,5' },
      { id: 7, name: 'Вода 0,5' },
      { id: 9, name: 'Вода 1,5' },

      { id: 10, name: 'Nutty Way' },
      { id: 11, name: 'Twix Big' },
      { id: 12, name: 'Snikers Big' },
      { id: 13, name: 'Bounty Big' },

      { id: 14, name: 'Футболка' },
      { id: 15, name: 'Перчатки' },
      { id: 16, name: 'Наколенник' },
      { id: 17, name: 'Налокотник' },
      { id: 18, name: 'Бандаж на руку' },
      { id: 19, name: 'Носки' },
      { id: 20, name: 'Голеностоп' },
      { id: 21, name: 'Голень' },

      { id: 22, name: 'Чай' },
      { id: 23, name: 'Кава' },
    ],
  },
  {
    id: 'pass',
    name: 'Абонимент',
    options: [
      { id: 0, name: 'Універсальний S', type: 'universal', size: 'S', showLink: true },
      { id: 1, name: 'Універсальний M', type: 'universal', size: 'M', showLink: true },
      { id: 2, name: 'Універсальний L', type: 'universal', size: 'L', showLink: true },
      { id: 3, name: 'Універсальний XL', type: 'universal', size: 'XL', showLink: true },
      { id: 4, name: 'Без тренера 20', type: 'no_trainer', size: '20', showLink: true },
      { id: 5, name: 'Без тренера 30', type: 'no_trainer', size: '30', showLink: true },
      { id: 6, name: 'Без тренера 40', type: 'no_trainer', size: '40', showLink: true },
      { id: 7, name: 'Без тренера 200', type: 'no_trainer', size: '200', showLink: true },
      { id: 8, name: 'СПОРТ дитячий', type: 'sport', size: 'child', showLink: true },
      { id: 9, name: 'СПОРТ дорослий', type: 'sport', size: 'adult', showLink: true },
      { id: 10, name: 'Cертифікат на 1 годину', type: 'open', showLink: false },
    ],
  },
  {
    id: 'service',
    name: 'Услуга',
    options: [
      { id: 0, name: 'Послуги тренера' },
      { id: 1, name: 'Оренда рушника' },
      { id: 2, name: 'Оренда обладнення' },
      { id: 3, name: 'Штраф за пошкодження майна' },
      { id: 4, name: '5 хв на батуті' },
      { id: 5, name: '10 хв на батуті' },
      { id: 6, name: '15 хв на батуті' },
      { id: 7, name: '45 хв на батуті' },
      { id: 8, name: 'Промопослуга' },
    ],
  },
]
