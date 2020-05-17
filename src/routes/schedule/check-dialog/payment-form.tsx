import React from 'react'
import { useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import MenuItem from '@material-ui/core/MenuItem'

import TextField from '@material-ui/core/TextField'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import Select from 'components/select'

import useGetContactDetailsQuery from '../queries/get-contact-details'

import { passTypes, universalSizes, noTrainerSizes } from './data'

const paymentTypes = [
  { text: 'Деньги', value: 'money' },
  { text: 'Абонимент', value: 'pass' },
]

export default function TransactionForm({ cancel }: any) {
  const actions = useActions()
  const [type, setType] = React.useState<string | null>(null)
  const [pass, setPass] = React.useState<string | null>(null)
  const { activeDate, activeGym, contact } = useSelector(state => ({
    activeDate: state.schedule.page.activeDate,
    activeGym: state.schedule.page.activeGym,
    opened: state.schedule.checkDialog.opened,
    contact: state.schedule.checkDialog.contact,
  }))

  const { data } = useGetContactDetailsQuery(activeDate, activeGym, contact)

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setType(e.target.value)
  }

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value)
  }

  const openAddPassForm = React.useCallback(
    () => actions.schedule.checkDialog.openPass(),
    [actions]
  )

  return (
    <>
      <Grid container={true} spacing={3}>
        <Grid item={true} lg={12}>
          <Select
            value={type}
            onChange={handleTypeChange}
            label='Тип оплаты'
            variant='outlined'
            fullWidth={true}
          >
            {
              paymentTypes.map(type => (
                <MenuItem value={type.value} key={type.value}>
                  {type.text}
                </MenuItem>
              ))
            }
          </Select>
        </Grid>
        {
          type === 'pass' && (
            <>
              <Grid item={true} lg={8}>
                <Select
                  value={pass}
                  onChange={handlePassChange}
                  label='Абонимент'
                  variant='outlined'
                  fullWidth={true}
                >
                  {
                    data?.trainingPasss.map(pass => (
                      <MenuItem value={pass._id} key={pass._id}>
                        {passTypes.find(p => p.value === pass.type)?.text}
                        {
                          pass.type === 'universal' && (
                            <>
                              {' '}
                              {universalSizes.find(s => s.value === pass.size)?.value}
                            </>
                          )
                        }
                        {
                          pass.type === 'no_trainer' && (
                            <>
                              {' '}
                              {noTrainerSizes.find(s => s.value === pass.size)?.text}
                            </>
                          )
                        }
                        {', '}
                        {pass.capacity} АБ
                        {', '}
                        {new Date(pass.expiresIn).toLocaleDateString()}
                      </MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item={true} lg={4} container={true}>
                <Box marginY='auto' marginRight={0}>
                  <Button color='primary' onClick={openAddPassForm}>
                    Добавить
                  </Button>
                </Box>
              </Grid>
            </>
          )
        }
        <Grid item={true} lg={12}>
          <TextField
            label='Сумма'
            variant='outlined'
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <ToggleButtonGroup
                  exclusive={true}
                  value={type === 'pass' ? 'units' : type === 'money' ? 'money' : null}
                >
                  <ToggleButton value='money' disabled={true}>
                    Грн
                  </ToggleButton>
                  <ToggleButton value='units' disabled={true}>
                    АБ
                  </ToggleButton>
                </ToggleButtonGroup>
              ),
            }}
          />
        </Grid>
        <Grid item={true} lg={12}>
          <TextField
            label='Кошелек'
            variant='outlined'
            fullWidth={true}
          />
        </Grid>
        <Grid item={true} lg={12}>
          <TextField
            label='Транзакция'
            variant='outlined'
            fullWidth={true}
          />
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <Grid container={true} justify='space-between'>
          <Button onClick={cancel} color='primary'>
            Отменить
          </Button>
          <Button color='primary' variant='contained'>
            Сохранить
          </Button>
        </Grid>
      </Box>
    </>
  )
}
