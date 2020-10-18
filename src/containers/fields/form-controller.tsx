import React from 'react'
import get from 'lodash/get'

import { useFormContext, Controller, ControllerProps } from 'react-hook-form'

export interface IDefaultComponentProps {
  value: any
  onChange: (value: any) => void
}

type IProps = Omit<ControllerProps<any>, 'render'> & {
  children: React.ReactElement
}

export default function FormController(props: IProps) {
  const { control, errors } = useFormContext()

  const error = get(errors, props.name)
  const Child = React.cloneElement(props.children, { name: props.name, error })

  return (
    <Controller
      name={props.name}
      rules={props.rules}
      control={control}
      as={Child}
    />
  )
}
