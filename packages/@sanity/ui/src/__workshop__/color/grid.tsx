import {black, ColorValue, COLOR_HUES, COLOR_TINTS, hues, white} from '@sanity/color'
import {Box, Grid, useToast} from '@sanity/ui'
import React, {useCallback} from 'react'
import {clipboard} from './_helpers'

export default function ColorGridStory(): React.ReactElement {
  return (
    <Grid columns={9} height="fill" rows={13}>
      <Cell color={white} column={9} />

      {COLOR_TINTS.map((tintKey) =>
        COLOR_HUES.map((hueKey) => (
          <Cell color={hues[hueKey][tintKey]} key={`${hueKey}-${tintKey}`} />
        ))
      )}

      <Cell color={black} column={9} />
    </Grid>
  )
}

function Cell(props: {color: ColorValue; column?: number}) {
  const {color, column} = props
  const {push: pushToast} = useToast()

  const handleClick = useCallback(() => {
    clipboard
      .write(color.hex)
      .then(() => {
        pushToast({
          title: (
            <>
              Copied {color.title} (<code>{color.hex}</code>) to clipboard!
            </>
          ),
        })
      })
      .catch((err) => {
        console.log(err)
        pushToast({
          status: 'error',
          title: <>Copied not write to clipboard!</>,
        })
      })
  }, [color, pushToast])

  return <Box column={column} onClick={handleClick} style={{backgroundColor: color.hex}} />
}
