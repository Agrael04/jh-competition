import React from 'react'
import { IStoreState, useSelector, useActions } from '../../../../store'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

import { ISearchedTrainee } from '../../../../interfaces/trainee'

interface IProps {
  name: any
  onChange: (name: any, value: any) => void
  fieldSelector: (name: any) => (state: IStoreState) => any
  [x: string]: any
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

export default function TraineeSuggester({ name, onChange, fieldSelector }: IProps) {
  const { options, loading } = useSelector(state => state.schedule.traineeSuggester)
  const value = useSelector(fieldSelector(name))
  const optionValue = options.find(o => o._id === value) || null

  const handleChange = (target: any, option: ISearchedTrainee | null) => {
    onChange(name, option?._id || '')
  }

  const actions = useActions()

  const [opened, setOpened] = React.useState(false)
  const [filter, setFilter] = React.useState<string>('')

  const handleInputChange = (e: any) => {
    if (e) {
      setFilter(e.target.value)
    }
  }

  React.useEffect(
    () => {
      if (opened) {
        actions.schedule.searchTrainees(filter)
      }
    },
    [opened, filter, actions]
  )

  const open = () => setOpened(true)
  const close = () => setOpened(false)

  const mapOptionLabel = (option: ISearchedTrainee) => option.fullName

  return (
    <Autocomplete
      open={opened}
      onOpen={open}
      onClose={close}
      onChange={handleChange}
      value={optionValue}
      options={options}
      onInputChange={handleInputChange}
      getOptionLabel={mapOptionLabel}
      loading={loading}
      // freeSolo={true}
      renderInput={renderInput(loading && opened, 'Search user')}
    />
  )
}
