import { ReactElement, cloneElement } from 'react'
import get from 'lodash/get'

import { useFormContext, Controller, ControllerProps } from 'react-hook-form'

export interface IInnerProps<Value> {
  value: Value
  onChange: (value: Value) => void
  error: {
    message: string
  }
  name: string
}

type IProps = Omit<ControllerProps<ReactElement>, 'render'> & {
  children: ReactElement
}

export default function FormController(props: IProps) {
  const { control, errors } = useFormContext()

  const error = get(errors, props.name)
  const Child = cloneElement(props.children, { name: props.name, error })

  return (
    <Controller
      name={props.name}
      rules={props.rules}
      control={control}
      as={Child}
    />
  )
}
