import purple from '@material-ui/core/colors/purple'
import indigo from '@material-ui/core/colors/indigo'
import teal from '@material-ui/core/colors/teal'
import lime from '@material-ui/core/colors/lime'
import lightBlue from '@material-ui/core/colors/lightBlue'
import brown from '@material-ui/core/colors/brown'
import blue from '@material-ui/core/colors/blue'
import deepPurple from '@material-ui/core/colors/deepPurple'
import cyan from '@material-ui/core/colors/cyan'
import green from '@material-ui/core/colors/green'
import blueGrey from '@material-ui/core/colors/blueGrey'

const colors = [
  purple, indigo, teal, lime, lightBlue, brown, blue, green, deepPurple, cyan,
]

export default function(id?: number) {
  if (id === undefined || id === null || !colors[id]) {
    return blueGrey
  }

  return colors[id]
}
