import {LinkIcon} from '@sanity/icons'
import {Box, Tree, TreeItem} from '@sanity/ui'
import React from 'react'

export default function BasicStory() {
  return (
    <Box padding={[4, 5, 6]}>
      <Tree id="tree" space={1}>
        <TreeItem expanded id="item-0" text="Fruit">
          <TreeItem id="item-0-0" text="Oranges" />
          <TreeItem id="item-0-1" text="Pineapple" selected />
          <TreeItem id="item-0-2" text="Apples">
            <TreeItem href="#apples-macintosh" icon={LinkIcon} id="id-0-2-0" text="Macintosh" />
            <TreeItem text="Granny Smith" id="id-0-2-1" />
            <TreeItem text="Fuji" id="id-0-2-2" />
          </TreeItem>
          <TreeItem id="item-0-3" text="Bananas" />
          <TreeItem id="item-0-4" text="Pears">
            <TreeItem id="item-0-4-0" text="Anjou" />
            <TreeItem id="item-0-4-1" text="Bartlett" />
            <TreeItem id="item-0-4-2" text="Bosc" />
            <TreeItem id="item-0-4-3" text="Concorde" />
            <TreeItem id="item-0-4-4" text="Seckel" />
            <TreeItem id="item-0-4-5" text="Starkrimson" />
          </TreeItem>
        </TreeItem>
        <TreeItem id="item-1" text="Vegetables">
          <TreeItem id="item-1-0" text="Podded vegetables">
            <TreeItem id="item-1-0-0" text="Lentil" />
            <TreeItem id="item-1-0-1" text="Pea" />
            <TreeItem id="item-1-0-2" text="Peanut" />
          </TreeItem>
          <TreeItem id="item-1-1" text="Bulb and stem vegetables">
            <TreeItem id="item-1-1-0" text="Asparagus" />
            <TreeItem id="item-1-1-1" text="Celery" />
            <TreeItem id="item-1-1-2" text="Leek" />
            <TreeItem id="item-1-1-3" text="Onion" />
          </TreeItem>
          <TreeItem id="item-1-2" text="Root and tuberous vegetables">
            <TreeItem id="item-1-2-0" text="Carrot" />
            <TreeItem id="item-1-2-1" text="Ginger" />
            <TreeItem id="item-1-2-2" text="Parsnip" />
            <TreeItem id="item-1-2-3" text="Potato" />
          </TreeItem>
        </TreeItem>
        <TreeItem id="item-2" text="Grains">
          <TreeItem id="item-2-0" text="Cereal grains">
            <TreeItem id="item-2-0-0" text="Barley" />
            <TreeItem id="item-2-0-1" text="Oats" />
            <TreeItem id="item-2-0-2" text="Rice" />
          </TreeItem>
          <TreeItem id="item-2-1" text="Pseudocereal grains">
            <TreeItem id="item-2-1-0" text="Amaranth" />
            <TreeItem id="item-2-1-1" text="Buckwheat" />
            <TreeItem id="item-2-1-2" text="Chia" />
            <TreeItem id="item-2-1-3" text="Quinoa" />
          </TreeItem>
          <TreeItem id="item-2-2" text="Oilseeds">
            <TreeItem id="item-2-2-0" text="India mustard" />
            <TreeItem id="item-2-2-1" text="Safflower" />
            <TreeItem id="item-2-2-2" text="Flax seed" />
            <TreeItem id="item-2-2-3" text="Poppy seed" />
          </TreeItem>
        </TreeItem>
      </Tree>
    </Box>
  )
}
