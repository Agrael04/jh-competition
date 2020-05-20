import React from 'react'
// import { IStoreState, useSelector, useActions } from 'store'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

export default function RecordForm({ cancel }: any) {
  const [currency, setCurrency] = React.useState<string | undefined>('units')

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue !== null) {
      setCurrency(newValue)
    }
  }

  return (
    <>
      <div>
        <Typography variant='h6'>
          Груповая тренировка (Стена)
        </Typography>
        <Box marginTop={1}>
          <Typography variant='body1'>
            Батут 1, 8:00-10:00, Хоботов Сергей
          </Typography>
        </Box>
        <Box marginTop={1}>
          <Typography variant='body1'>
            Физ лицо 1
          </Typography>
        </Box>
        <Box marginTop={6}>
          <TextField
            label='Цена'
            variant='outlined'
            fullWidth={true}
            InputProps={{
              endAdornment: (
                <ToggleButtonGroup
                  exclusive={true}
                  value={currency}
                  onChange={handleChange}
                >
                  <ToggleButton value='money'>
                    Грн
                  </ToggleButton>
                  <ToggleButton value='units'>
                    АБ
                  </ToggleButton>
                </ToggleButtonGroup>
              ),
            }}
          />
        </Box>
      </div>
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
