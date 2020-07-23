import React, { ComponentProps } from 'react'

import { useFormContext, Controller } from 'react-hook-form'

type BaseProps = ComponentProps<typeof Controller>

interface IDefaultComponentProps {
  value: any
  onChange: (value: any) => void
}

interface IExtendedComponentProps extends IDefaultComponentProps {
  error?: any
}

interface IProps extends BaseProps {
  Component: (props: IExtendedComponentProps) => React.ReactElement
}

export default function FormController(props: IProps) {
  const { control, errors } = useFormContext()
  const error = errors[props.name]

  const Component = (defaultProps: IDefaultComponentProps) => (
    <props.Component {...defaultProps} error={error} />
  )

  return (
    <Controller
      {...props}
      control={control}
      render={Component}
    />
  )
}
