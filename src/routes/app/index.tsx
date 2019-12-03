import React from 'react'

import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'

import SportsIcon from '@material-ui/icons/Sports'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import useStyles from '../../hooks/use-styles'
import css from './styles'

import * as colors from '../../assets/colors'

import { ICompetition, competitions } from '../../data/competitions'

const competitionContexts = {
  battle: {
    background: colors.redBg,
    paleBackground: colors.paleRedBg,
    text: 'Battle',
    rulesLink: 'https://drive.google.com/drive/folders/1gX2k_DCg0ygv5Ijx9Pt2aTcSZNlpbvAZ',
  },
  classic: {
    background: colors.orangeBg,
    paleBackground: colors.paleOrangeBg,
    text: 'Classic',
    rulesLink: 'https://drive.google.com/drive/folders/1LKQ7Wj9cYMb49yha-CmmIlFOQhsD-pVn',
  },
  complication: {
    background: colors.greenBg,
    paleBackground: colors.paleGreenBg,
    text: 'Complication',
    rulesLink: 'https://drive.google.com/drive/folders/1BlC56zLyevsU1u1YvJvlilYRETT_BUqC',
  },
  reCap: {
    background: colors.purpleBg,
    paleBackground: colors.palePurpleBg,
    text: 'Combination ReCap',
    rulesLink: 'https://drive.google.com/drive/folders/1PskEgI-s7E5dtx4sxveyLtP3cqQLlQyb',
  },
}

const CompetitionCard = ({ competition }: { competition: ICompetition }) => {
  const classes = useStyles(css)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const context = competitionContexts[competition.type]
  const mediaStyles = {
    background: competition.status === 'finished'
      ? context.paleBackground
      : context.background,
  }

  return (
    <Grid item={true} component={Card} xs={true} className={classes.card}>
      <CardActionArea>
        <div className={classes.media} style={mediaStyles}>
          <SportsIcon fontSize='large' className={classes.icon} />
        </div>
        <CardContent>
          <Typography gutterBottom={true} variant='h5'>
            {context.text}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {competition.date}
          </Typography>
          <Typography variant='body2' color='textSecondary'>
            {competition.location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing={true}>
        {
          competition.status === 'opened' && (
            <Button className={classes.button}>
              Подать заявку
            </Button>
          )
        }
        <IconButton className={classes.menuButton} onClick={openMenu}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted={true}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
        >
          <Link href={context.rulesLink} target='_black' className={classes.link}>
            <MenuItem onClick={closeMenu}>
              Правила
            </MenuItem>
          </Link>
          {
            competition.status !== 'finished' &&
            competition.type === 'reCap' && <MenuItem onClick={closeMenu}>Добавить комбинацию</MenuItem>
          }
          {
            competition.status !== 'finished' && <MenuItem onClick={closeMenu}>Расписание</MenuItem>
          }
          {
            competition.status === 'opened' && <MenuItem onClick={closeMenu}>Подать заявку</MenuItem>
          }
          {
            competition.status !== 'opened' && <MenuItem onClick={closeMenu}>Результаты</MenuItem>
          }
        </Menu>
      </CardActions>
    </Grid>
  )
}

const App: React.FC = () => {
  const classes = useStyles(css)

  return (
    <Container className={classes.container}>
      <Paper className={classes.rootPaper}>
        <Grid container={true}>
          {
            competitions.map((competition, index) => (
              <CompetitionCard competition={competition} key={index} />
            ))
          }
        </Grid>
      </Paper>
    </Container>
  )
}

export default App
