import { ValidationRules } from 'react-hook-form'

export const requiredValidation: ValidationRules = {
  required: 'Обязательное поле',
}

export const optionalPhoneValidation: ValidationRules = {
  minLength: {
    value: 10,
    message: 'Не правильный номер',
  },
  maxLength: {
    value: 10,
    message: 'Не правильный номер',
  },
}

export const requiredPhoneValidation: ValidationRules = {
  ...requiredValidation,
  ...optionalPhoneValidation,
}
