import { ReactElement, Fragment } from 'react'

import Tooltip from '@material-ui/core/Tooltip'

interface IProps {
  children: ReactElement
  rows: string[]
}

const TooltipComponent = ({ rows }: { rows: string[] }) => {
  return (
    <>
      {
        rows.map((row, key) => (
          <Fragment key={`tooltip-${key}`}>
            {row}
            <br />
          </Fragment>
        ))
      }
    </>
  )
}

const TooltipWrap = ({ rows, children }: IProps) => (
  <Tooltip title={<TooltipComponent rows={rows} />}>
    {children}
  </Tooltip>
)

export default TooltipWrap
