import { useFormContext } from 'react-hook-form'

import Button from '@material-ui/core/Button'

import IClientForm from './form'

interface IProps {
  submit: (form: IClientForm) => void
}

export default function SubmitButton({ submit }: IProps) {
  const { handleSubmit, errors } = useFormContext()

  const disabled = Object.keys(errors).length > 0

  return (
    <Button color='primary' variant='contained' onClick={handleSubmit(submit)} disabled={disabled}>
      Сохранить
    </Button>
  )
}
