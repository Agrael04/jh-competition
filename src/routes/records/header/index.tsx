import React, { useMemo } from 'react'
import { uniq } from 'lodash'

import { useSelector } from 'store'

import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Box from '@material-ui/core/Box'

import FilterListIcon from '@material-ui/icons/FilterList'
import ReceiptIcon from '@material-ui/icons/Receipt'

import useGetGymsQuery from '../graphql/get-gyms'
import useGetTrainersQuery from '../graphql/get-trainers'

import { trainingTypes } from 'data/training-types'

import { ITraining } from '../index'

interface IProps {
  startFilterEditing: () => void
  handleXLSXClick: () => void
  trainings: ITraining[]
}

const Header = ({ startFilterEditing, handleXLSXClick, trainings }: IProps) => {
  const filters = useSelector(state => state.records.page.filters)

  const gyms = useGetGymsQuery()
  const trainers = useGetTrainersQuery()

  const currentGym = useMemo(
    () => {
      return gyms?.data?.gyms.find(gym => gym._id === filters.gym)
    }, [gyms, filters.gym]
  )

  const currentTrainer = useMemo(
    () => {
      return trainers?.data?.trainers.find(trainer => trainer._id === filters.trainer)
    }, [trainers, filters.trainer]
  )

  const filterChips = useMemo(
    () => {
      const chips = []

      if (filters.date) {
        chips.push(filters.date.format('MMMM YYYY'))
      }

      if (currentGym) {
        chips.push(currentGym?.name)
      }

      if (currentTrainer) {
        chips.push(`${currentTrainer?.lastName} ${currentTrainer?.firstName}`)
      }

      filters.types.forEach(type => {
        chips.push(trainingTypes.find(t => t.id === type)?.text)
      })

      return chips
    }, [filters, currentGym, currentTrainer]
  )

  return (
    <Toolbar>
      <Grid container={true} justify='space-between'>
        <Grid item={true} lg={9}>
          <Grid container={true}>
            <IconButton color='primary' onClick={startFilterEditing}>
              <FilterListIcon />
            </IconButton>
            {
              !trainings.length && (
                <Box marginLeft={1} marginY='auto'>
                  <Chip
                    color='primary'
                    label={`${uniq(trainings.map(t => t.date)).length} дней`}
                  />
                </Box>
              )
            }
            {
              !trainings.length && (
                <Box marginLeft={1} marginY='auto'>
                  <Chip
                    color='primary'
                    label={`${uniq(trainings.reduce((res: ITraining['contacts'], a) => [...res, ...a.contacts], []).map(c => `${c.surname} ${c.name}`)).length} контактов`}
                  />
                </Box>
              )
            }
            {
              !trainings.length && (
                <Box marginLeft={1} marginY='auto'>
                  <Chip
                    color='primary'
                    label={`${trainings.reduce((res, a) => res + a.people, 0)} чел`}
                  />
                </Box>
              )
            }
            {
              !trainings.length && (
                <Box marginLeft={1} marginY='auto'>
                  <Chip
                    color='primary'
                    label={`${trainings.reduce((res, a) => res + a.hours, 0)} бч`}
                  />
                </Box>
              )
            }
            <Grid item={true} lg={12} />
            {
              filterChips.map(filter => (
                <Box marginLeft={1} marginY={1} key={filter}>
                  <Chip
                    label={filter}
                  />
                </Box>
              ))
            }
          </Grid>
        </Grid>
        <Grid item={true}>
          <IconButton color='primary' onClick={handleXLSXClick}>
            <ReceiptIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Toolbar>
  )
}

export default Header
