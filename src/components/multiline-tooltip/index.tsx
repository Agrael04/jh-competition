import React from 'react'

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

export default TooltipComponent
