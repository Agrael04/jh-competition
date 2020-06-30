import React from 'react'
import { useSelector, useActions } from 'store'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

interface IProps {
  [x: string]: any
  label: string
  disabled?: boolean
  handleChange?: (contact: string | null) => void
  value: string | null
  initialFilter?: string
  startAdornment?: React.ReactChild
}

const renderInput = (loading: boolean, label: string, startAdornment?: React.ReactChild) => (params: any) => (
  <TextField
    {...params}
    fullWidth={true}
    label={label}
    variant='outlined'
    InputProps={{
      ...params.InputProps,
      startAdornment: params.inputProps.value && startAdornment,
      endAdornment: (
        <React.Fragment>
          {loading ? <CircularProgress color='inherit' size={20} /> : null}
          {params.InputProps.endAdornment}
        </React.Fragment>
      ),
    }}
  />
)

export default function ContactSuggester({ value, handleChange, label, initialFilter, disabled, startAdornment }: IProps) {
  const { options, loading } = useSelector(state => ({
    loading: state.schedule.clientSuggester.loading,
    options: state.schedule.clientSuggester.options,
  }))

  const actions = useActions()

  const [opened, setOpened] = React.useState(false)
  const [filter, setFilter] = React.useState<string>(initialFilter || '')

  React.useEffect(
    () => {
      if (opened) {
        actions.schedule.clientSuggester.search(filter)
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
      renderInput={renderInput(loading && opened, label, startAdornment)}
      disabled={disabled}
    />
  )
}
