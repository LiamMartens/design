import {black, ColorTintKey, ColorTints, ColorValue, COLOR_HUES, hues, white} from '@sanity/color'
import {Box, Card, Code, Flex, Grid, Heading, useTheme, useToast} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React, {useCallback} from 'react'
import {clipboard, ucfirst} from './_helpers'

const contrast = {
  aa: 4.5,
  aaa: 7,
}

function getContrastScore(tint: ColorValue, dark: boolean) {
  const c = dark ? tint.contrast.onBlack : tint.contrast.onWhite

  if (c >= contrast.aaa) {
    return '– AAA'
  }

  if (c >= contrast.aa) {
    return '– AA'
  }

  return null
}

export default function ColorOverviewStory(): React.ReactElement {
  const labels = useBoolean('Labels', true, 'Props') || false

  return (
    <Grid columns={[1, 1, 2, 3]} gapX={[3, 4, 5]} gapY={[4, 5, 6]} padding={[3, 4, 5]}>
      {COLOR_HUES.map((hueKey) => (
        <ColorHuePreview labels={labels} tints={hues[hueKey]} hueKey={hueKey} key={hueKey} />
      ))}
    </Grid>
  )
}

function ColorHuePreview(props: {hueKey: string; labels: boolean; tints: ColorTints}) {
  const {hueKey, labels, tints} = props

  return (
    <Box>
      <Heading as="h2" size={[1, 1, 2]}>
        {ucfirst(hueKey)}
      </Heading>

      <Card marginTop={[3, 3, 4]} overflow="hidden" radius={2} shadow={1}>
        {Object.entries(tints).map(([tintKey, tint]) => (
          <ColorTintPreview
            key={tintKey}
            labels={labels}
            tint={tint}
            tintKey={tintKey as ColorTintKey}
          />
        ))}
      </Card>
    </Box>
  )
}

function ColorTintPreview(props: {labels: boolean; tint: ColorValue; tintKey: ColorTintKey}) {
  const {labels, tint, tintKey} = props
  const {push: pushToast} = useToast()
  const theme = useTheme()
  const {dark} = theme.sanity.color

  const handleClick = useCallback(() => {
    clipboard
      .write(tint.hex)
      .then(() => {
        pushToast({
          title: (
            <>
              Copied {tint.title} (<code>{tint.hex}</code>) to clipboard!
            </>
          ),
        })
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err)
        pushToast({
          status: 'error',
          title: <>Copied not write to clipboard!</>,
        })
      })
  }, [pushToast, tint])

  return (
    <Card
      __unstable_focusRing
      as="button"
      onClick={handleClick}
      style={
        {
          '--card-bg-color': tint.hex,
          '--card-fg-color': tint.contrast.onWhite >= 4.5 ? white.hex : black.hex,
          cursor: 'pointer',
        } as any
      }
    >
      <Flex padding={3}>
        <Box flex={1}>
          <Code size={1} style={{color: 'inherit', visibility: labels ? 'visible' : 'hidden'}}>
            {tintKey} – {dark ? tint.contrast.onBlack : tint.contrast.onWhite}:1{' '}
            {getContrastScore(tint, dark)}
          </Code>
        </Box>
        <Box>
          <Code size={1} style={{color: 'inherit', visibility: labels ? 'visible' : 'hidden'}}>
            {tint.hex}
          </Code>
        </Box>
      </Flex>
    </Card>
  )
}
