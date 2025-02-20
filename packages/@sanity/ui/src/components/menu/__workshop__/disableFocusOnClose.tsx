import {SelectIcon} from '@sanity/icons'
import {Button, Flex, Menu, MenuButton, MenuItem} from '@sanity/ui'
import {useBoolean} from '@sanity/ui-workshop'
import React from 'react'

export default function DisableFocusOnCloseStory() {
  const disableRestoreFocusOnClose = useBoolean('Disable restore focus on close', false)

  return (
    <Flex align="center" height="fill" justify="center" padding={4} sizing="border">
      <MenuButton
        __unstable_disableRestoreFocusOnClose={disableRestoreFocusOnClose}
        button={
          <Button
            iconRight={SelectIcon}
            mode="ghost"
            text={
              disableRestoreFocusOnClose
                ? 'Should not focus after close'
                : 'Should focus after close'
            }
          />
        }
        id="example"
        menu={
          <Menu>
            <MenuItem text="Test 1" />
            <MenuItem text="Test 2" />
            <MenuItem text="Test 3" />
          </Menu>
        }
        popover={{constrainSize: true, matchReferenceWidth: true}}
      />
    </Flex>
  )
}
