import purple from '@material-ui/core/colors/purple'
import indigo from '@material-ui/core/colors/indigo'
import teal from '@material-ui/core/colors/teal'
import orange from '@material-ui/core/colors/orange'
import lightBlue from '@material-ui/core/colors/lightBlue'
import brown from '@material-ui/core/colors/brown'
import blue from '@material-ui/core/colors/blue'
import deepPurple from '@material-ui/core/colors/deepPurple'
import cyan from '@material-ui/core/colors/cyan'
import lightGreen from '@material-ui/core/colors/lightGreen'

const colors = [
  purple, indigo, orange, lightBlue, brown, blue, lightGreen, deepPurple, cyan,
]

export default function getColor(id?: number) {
  if (id === undefined || id === null || !colors[id]) {
    return teal
  }

  return colors[id]
}
