import React from 'react'

import Tooltip from '@material-ui/core/Tooltip'

const TooltipComponent = ({ rows }: { rows: string[] }) => {
  return (
    <>
      {
        rows.map((row, key) => (
          <React.Fragment key={`tooltip-${key}`}>
            {row}
            <br />
          </React.Fragment>
        ))
      }
    </>
  )
}

const TooltipWrap = ({ rows, children }: any) => (
  <Tooltip title={<TooltipComponent rows={rows} />}>
    {children}
  </Tooltip>
)

export default TooltipWrap
