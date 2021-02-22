import { useCallback, useState, useEffect, ComponentType } from 'react'
import { useDebounce } from 'use-debounce'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import CircularProgress from '@material-ui/core/CircularProgress'

import useSearchClients from './graphql/search-clients'

export interface ISuggesterProps {
  label: string
  disabled?: boolean
  handleChange?: (user: string | null) => void
  value: string | null
  initialFilter?: string
  initialBalance?: number
  StartAdornment?: ComponentType<{ balance: number }>
  error?: boolean
  helperText?: string
  rights?: string[]
}

interface IInputProps {
  label?: string
  error?: boolean
  helperText?: string
}

interface IStartAbornment {
  Component?: ComponentType<{ balance: number }>
  props?: any
}

const renderInput = (loading: boolean, inputProps: IInputProps, abornment?: IStartAbornment) => {
  const InnerInput = (params: any) => {
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
            abornment?.Component && <abornment.Component {...abornment.props} />
          ),
          endAdornment: (
            <>
              {loading ? <CircularProgress color='inherit' size={20} /> : null}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    )
  }

  return InnerInput
}

export default function ClientSuggester({ value, handleChange, label, initialFilter, initialBalance, disabled, StartAdornment, error, helperText, rights }: ISuggesterProps) {
  const { search, res: { data, loading } } = useSearchClients()

  const [opened, setOpened] = useState(false)
  const [filter, setFilter] = useState<string>(initialFilter || '')
  const [balance, setBalance] = useState<number>(initialBalance || 0)
  const [query] = useDebounce(filter, 750)

  useEffect(
    () => {
      if (opened && query) {
        search({ variables: { query, rights: rights || ['RECORD', 'ATTEND'] } })
      }
    },
    [opened, query, search, rights]
  )

  const open = useCallback(
    () => setOpened(true),
    []
  )
  const close = useCallback(
    () => setOpened(false),
    []
  )

  const mapOptionLabel = useCallback(
    (option?: string | null) => {
      const o = data?.suggestedClients.find(o => o._id === option)
      return o ? `${o.lastName} ${o.firstName}` : ''
    },
    [data]
  )

  const mapOptionBalance = useCallback(
    (option?: string | null) => {
      const o = data?.suggestedClients.find(o => o._id === option)
      return o?.balance || 0
    },
    [data]
  )

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
      options={data?.suggestedClients.map(o => o._id) || []}
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
            props: { balance },
          }
        )
      }
      disabled={disabled}
    />
  )
}
