import {COLOR_HUES, COLOR_TINTS, hues} from '@sanity/color'
import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
  display: flex;
  overflow: auto;
  height: 100%;
  font-size: 13px;
  line-height: 1;

  & > div {
    flex: 1;
    min-width: 220px;
  }
`

const TintTable = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    padding: 12px;
  }
`

export function App(): React.ReactElement {
  return (
    <Root>
      {COLOR_HUES.map((hueKey) => (
        <div key={hueKey}>
          <div style={{padding: 10}}>
            <strong>{hueKey}</strong>
          </div>
          <TintTable>
            {COLOR_TINTS.map((tintKey) => (
              <div
                key={tintKey}
                style={{backgroundColor: hues[hueKey][tintKey].hex, color: '#fff'}}
              >
                {hues[hueKey][tintKey].title} / {hues[hueKey][tintKey].contrast.onWhite} /{' '}
                {hues[hueKey][tintKey].hex}
              </div>
            ))}
          </TintTable>
        </div>
      ))}
    </Root>
  )
}
