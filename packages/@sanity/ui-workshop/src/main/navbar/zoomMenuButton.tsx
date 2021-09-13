import {SelectIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, MenuItem} from '@sanity/ui'
import React from 'react'
import {useWorkshop} from '../../useWorkshop'
import {ZOOM_OPTIONS} from '../constants'

export function ZoomMenuButton(): React.ReactElement {
  const {setZoom, zoom} = useWorkshop()

  return (
    <MenuButton
      button={
        <Button
          iconRight={SelectIcon}
          mode="ghost"
          text={ZOOM_OPTIONS.find((o) => o.value === zoom)?.title}
        />
      }
      id="zoom-menu"
      menu={
        <Menu>
          {ZOOM_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => setZoom(option.value)}
              selected={option.value === zoom}
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
