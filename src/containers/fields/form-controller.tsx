import React, { ComponentProps } from 'react'

import { useFormContext, Controller } from 'react-hook-form'

type BaseProps = ComponentProps<typeof Controller>

export interface IDefaultComponentProps {
  value: any
  onChange: (value: any) => void
}

interface IProps extends BaseProps {
  children: React.ReactElement
}

export default function FormController(props: IProps) {
  const { control, errors } = useFormContext()

  const error = errors[props.name]
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
