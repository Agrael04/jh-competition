import React from 'react'
import { IStoreState, useSelector, useActions } from 'store'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

import { ISearchedTrainee } from 'interfaces/trainee'

interface IProps {
  name: any
  onChange: (name: any, value: any) => void
  fieldSelector: (name: any) => (state: IStoreState) => any
  [x: string]: any
  label: string
  initialFilter?: string
}

const renderInput = (loading: boolean, label: string) => (params: any) => (
  <TextField
    {...params}
    fullWidth={true}
    label={label}
    variant='outlined'
    InputProps={{
      ...params.InputProps,
      endAdornment: (
        <React.Fragment>
          {loading ? <CircularProgress color='inherit' size={20} /> : null}
          {params.InputProps.endAdornment}
        </React.Fragment>
      ),
    }}
  />
)

export default function TraineeSuggester({ name, onChange, fieldSelector, label, initialFilter }: IProps) {
  const { options, loading } = useSelector(state => ({
    loading: state.schedule.clientSuggester.loading,
    options: state.schedule.clientSuggester.options,
  }))
  const value = useSelector(fieldSelector(name))

  const handleChange = (e: any, option: ISearchedTrainee | null) => {
    onChange(name, { link: option?._id })
    setFilter(option?.fullName || '')
  }

  const actions = useActions()

  const [opened, setOpened] = React.useState(false)
  const [filter, setFilter] = React.useState<string>(initialFilter || '')

  const handleInputChange = (e: any) => {
    if (e) {
      setFilter(e.target.value)
    }
  }

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

  const mapOptionLabel = (option: ISearchedTrainee) => option.fullName || ''

  return (
    <Autocomplete
      open={opened}
      onOpen={open}
      onClose={close}
      onChange={handleChange}
      value={value}
      options={options}
      onInputChange={handleInputChange}
      inputValue={filter || ''}
      getOptionLabel={mapOptionLabel}
      loading={loading}
      renderInput={renderInput(loading && opened, label)}
    />
  )
}
