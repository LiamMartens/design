import {SelectIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, MenuItem} from '@sanity/ui'
import React from 'react'
import {useWorkshop} from '../../useWorkshop'
import {VIEWPORT_OPTIONS} from '../constants'

export function ViewportMenuButton(): React.ReactElement {
  const {setViewport, viewport} = useWorkshop()

  return (
    <MenuButton
      button={
        <Button
          iconRight={SelectIcon}
          mode="ghost"
          style={{minWidth: 80}}
          text={VIEWPORT_OPTIONS.find((o) => o.name === viewport)?.title}
        />
      }
      id="viewport-menu"
      menu={
        <Menu>
          {VIEWPORT_OPTIONS.map((option) => (
            <MenuItem
              key={option.name}
              onClick={() => setViewport(option.name)}
              selected={option.name === viewport}
              text={option.title}
            />
          ))}
        </Menu>
      }
      popover={{matchReferenceWidth: true}}
      portal
    />
  )
}
