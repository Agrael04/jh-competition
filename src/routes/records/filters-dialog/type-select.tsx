import React, { useCallback } from 'react'

import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'

import Select, { ISelectProps } from 'components/select'

import { trainingTypes, GROUP_TRAININGS } from 'data/training-types'

type IProps = ISelectProps & {
  onChange?: any
  value?: any
  error?: {
    message: string
  }
}

const TypeSelect = (props: IProps) => {
  const { value, onChange } = props

  const findType = useCallback(
    (type: string) => {
      return value.find((v: string) => v === type)
    }, [value]
  )

  const selectType = useCallback(
    (type: string) => {
      const item = findType(type)

      if (!item) {
        onChange([...value, type])
      } else {
        onChange(value.filter((v: string) => v !== type))
      }
    },
    [onChange, findType, value]
  )

  const handleCheckboxClick = useCallback(
    (type: string) => () => selectType(type),
    [selectType]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  const renderValue = useCallback(
    () => `Выбрано: ${value.length}`,
    [value]
  )

  return (
    <Select
      value={value}
      onChange={handleChange}
      label='Тип'
      fullWidth={true}
      variant='outlined'
      multiple={true}
      renderValue={renderValue}
    >
      {
        trainingTypes
          .filter(type => !(
            type.id === GROUP_TRAININGS.GROUP ||
            type.id === GROUP_TRAININGS.EVENT ||
            type.id === GROUP_TRAININGS.SECTION
          ))
          .map(type => (
            <MenuItem value={type.id} key={type.id}>
              <ListItemText
                primary={type.text}
                secondary='Количество батуто-часов'
              />
              <ListItemSecondaryAction>
                <Checkbox
                  color='primary'
                  checked={!!findType(type.id)}
                  onClick={handleCheckboxClick(type.id)}
                />
              </ListItemSecondaryAction>
            </MenuItem>
          ))
      }
      <Divider />
      {
        trainingTypes
          .filter(type => (
            type.id === GROUP_TRAININGS.GROUP ||
            type.id === GROUP_TRAININGS.EVENT ||
            type.id === GROUP_TRAININGS.SECTION
          ))
          .map(type => (
            <MenuItem value={type.id} key={type.id}>
              <ListItemText
                primary={type.text}
                secondary={
                  type.id === GROUP_TRAININGS.GROUP
                    ? 'Количество батуто-часов'
                    : 'Количество человек'
                }
              />
              <ListItemSecondaryAction>
                <Checkbox
                  color='primary'
                  checked={!!findType(type.id)}
                  onClick={handleCheckboxClick(type.id)}
                />
              </ListItemSecondaryAction>
            </MenuItem>
          ))
      }
    </Select>
  )
}

export default TypeSelect
