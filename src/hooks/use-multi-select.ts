import React from 'react'

export default function useMultiSelect<T>(initialValue?: T[]) {
  const [selected, setSelected] = React.useState(initialValue || [])

  const handleChange = (event: React.ChangeEvent<any>) => {
    setSelected(event.target.value)
  }

  const remove = (item: T) => {
    setSelected(selected.filter(s => s !== item))
  }

  const getChecked = (item: T) => {
    return selected.find(s => s === item) !== undefined
  }

  return {
    selected,
    handleChange,
    remove,
    getChecked
  }
}
