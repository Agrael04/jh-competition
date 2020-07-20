import React from 'react'
import { useSelector, useActions } from 'store'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

interface IProps {
  label: string
  disabled?: boolean
  handleChange?: (user: string | null) => void
  value: string | null
  initialFilter?: string
  initialBalance?: number
  StartAdornment?: React.ComponentType<{ balance: number }>
  error?: boolean
  helperText?: string
}

interface IInputProps {
  label?: string
  error?: boolean
  helperText?: string
}

interface IStartAbornment {
  Component?: React.ComponentType<{ balance: number }>
  prors?: any
}

const renderInput = (loading: boolean, inputProps: IInputProps, abornment?: IStartAbornment) => (params: any) => {
  return (
    <TextField
      {...params}
      {...inputProps}
      fullWidth={true}
      variant='outlined'
      InputProps={{
        ...params.InputProps,
        startAdornment: (
          params.inputProps.value &&
          abornment?.Component && <abornment.Component {...abornment.prors} />
        ),
        endAdornment: (
          <React.Fragment>
            {loading ? <CircularProgress color='inherit' size={20} /> : null}
            {params.InputProps.endAdornment}
          </React.Fragment>
        ),
      }}
    />
  )
}

export default function ContactSuggester({ value, handleChange, label, initialFilter, initialBalance, disabled, StartAdornment, error, helperText }: IProps) {
  const { options, loading } = useSelector(state => ({
    loading: state.clientSuggester.loading,
    options: state.clientSuggester.options,
  }))

  const actions = useActions()

  const [opened, setOpened] = React.useState(false)
  const [filter, setFilter] = React.useState<string>(initialFilter || '')
  const [balance, setBalance] = React.useState<number>(initialBalance || 0)

  React.useEffect(
    () => {
      if (opened) {
        actions.clientSuggester.search(filter)
      }
    },
    [opened, filter, actions]
  )

  const open = () => setOpened(true)
  const close = () => setOpened(false)

  const mapOptionLabel = (option?: string | null) => {
    const o = options.find(o => o._id === option)
    return o?.fullName || ''
  }

  const mapOptionBalance = (option?: string | null) => {
    const o = options.find(o => o._id === option)
    return o?.balance || 0
  }

  const filterOptions = (options: any) => options

  const handleInputChange = (e: any) => {
    if (e) {
      setFilter(e.target.value)
    }
  }

  const boundHandleChange = (e: any, link: string | null) => {
    if (handleChange) {
      handleChange(link)
    }
    setFilter(mapOptionLabel(link))
    setBalance(mapOptionBalance(link))
  }

  return (
    <Autocomplete
      open={opened}
      onOpen={open}
      onClose={close}

      onChange={boundHandleChange}
      value={value}

      options={options.map(o => o._id)}
      getOptionLabel={mapOptionLabel}
      onInputChange={handleInputChange}
      filterOptions={filterOptions}

      inputValue={filter || ''}
      loading={loading}
      renderInput={
        renderInput(
          loading && opened,
          {
            label,
            error,
            helperText,
          },
          {
            Component: StartAdornment,
            prors: { balance },
          }
        )
      }
      disabled={disabled}
    />
  )
}
