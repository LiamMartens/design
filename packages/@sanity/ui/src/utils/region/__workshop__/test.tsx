import {Box, Card, Code, Flex, Stack, Text} from '@sanity/ui'
import React, {useRef, useState} from 'react'
import {Region} from '../region'
import {OverlayProvider} from '../regionProvider'
import {RegionData} from '../types'

export default function TestStory() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [regions, setRegions] = useState<RegionData[]>([])

  return (
    <Box height="fill" padding={4} sizing="border">
      <Flex height="fill">
        <Card flex={1} height="fill" overflow="auto" tone="primary">
          <OverlayProvider onChange={setRegions} rootRef={rootRef} scrollRef={scrollRef}>
            <Stack padding={4} ref={rootRef} space={9}>
              <Region id="a">
                <Card>
                  <Text>A</Text>
                </Card>
              </Region>

              <Region id="b">
                <Card>
                  <Text>B</Text>
                </Card>
              </Region>

              <Region id="c">
                <Card>
                  <Text>C</Text>
                </Card>
              </Region>
            </Stack>
          </OverlayProvider>
        </Card>
        <Card flex={1} marginLeft={1} overflow="auto" padding={3} tone="transparent">
          <Code language="json" size={1}>
            {JSON.stringify(regions, null, 2)}
          </Code>
        </Card>
      </Flex>
    </Box>
  )
}
