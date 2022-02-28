import {SearchIcon} from '@sanity/icons'
import {Box, Card, Layer, Stack, Text, TextInput, Tree, TreeItem} from '@sanity/ui'
import React, {memo, useCallback, useMemo, useState} from 'react'
import {EMPTY_ARRAY} from '../constants'
import {WorkshopScope, WorkshopStory} from '../types'
import {useWorkshop} from '../useWorkshop'
import {buildMenu} from './helpers'
import {MenuCollection, MenuList, MenuScope} from './types'

export const WorkshopNavigator = memo(function WorkshopNavigator(props: {
  collections?: MenuCollection[]
}): React.ReactElement {
  const {collections = []} = props
  const {broadcast, scopes} = useWorkshop()
  const menu = useMemo(() => buildMenu(collections, scopes), [collections, scopes])
  const [query, setQuery] = useState('')

  const matches = useMemo(() => {
    if (!query) return EMPTY_ARRAY

    const q = query.toLowerCase()

    const ret: {scope: WorkshopScope; story: WorkshopStory}[] = []

    for (const scope of scopes) {
      for (const story of scope.stories) {
        if (scope.title.toLowerCase().includes(q) || story.title.toLowerCase().includes(q)) {
          ret.push({scope, story})
        }
      }
    }

    return ret
  }, [query, scopes])

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) {
        broadcast({type: 'workshop/setPath', value: targetPath})

        setQuery('')
      }
    },
    [broadcast]
  )

  return (
    <Card
      borderRight
      display={['none', 'none', 'block']}
      flex={1}
      overflow="hidden"
      style={{minWidth: 180, maxWidth: 300}}
    >
      <Layer style={{flex: 'none'}}>
        <Card padding={2} shadow={1} style={{lineHeight: 0}}>
          <TextInput
            border={false}
            clearButton={Boolean(query)}
            fontSize={[2, 2, 1]}
            icon={SearchIcon}
            onChange={(event) => setQuery(event.currentTarget.value)}
            onClear={() => setQuery('')}
            padding={2}
            placeholder="Stories"
            radius={2}
            space={2}
            value={query}
          />
        </Card>
      </Layer>

      <Card flex={1} overflow="auto">
        {query && matches.length > 0 && (
          <Stack padding={2} space={1}>
            {matches.map(({scope, story}) => (
              <Card
                as="a"
                data-path={`/${scope.name}/${story.name}`}
                href={`/${scope.name}/${story.name}`}
                key={`${scope.name}/${story.name}`}
                onClick={handleStoryClick}
                padding={2}
                radius={2}
              >
                <Text size={1} textOverflow="ellipsis" weight="semibold">
                  {scope.title} / {story.title}
                </Text>
              </Card>
            ))}
          </Stack>
        )}

        {!query && menu.type === 'list' && (
          <Box padding={2}>
            <Tree space={1}>
              <MenuItems items={menu.items} />
            </Tree>
          </Box>
        )}
      </Card>
    </Card>
  )
})

const MenuItems = memo(function MenuItems(props: {
  basePath?: string
  items: Array<MenuList | MenuScope>
}) {
  const {basePath = '', items} = props
  const {broadcast, path: workshopPath, scope: currentScope, story: currentStory} = useWorkshop()

  const handleStoryClick = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      event.preventDefault()

      const target = event.currentTarget
      const targetPath = target.getAttribute('data-path')

      if (targetPath) {
        broadcast({type: 'workshop/setPath', value: targetPath})
      }
    },
    [broadcast]
  )

  return useMemo(() => {
    if (items.length === 0) {
      return null
    }

    return (
      <>
        {items.map((item, itemIndex) => {
          if (item.type === 'list') {
            const path = `${basePath}/${item.name}`

            return (
              <MemoList
                expanded={workshopPath.startsWith(path + '/')}
                key={item.name || itemIndex}
                item={item}
                path={path}
              />
            )
          }

          if (item.type === 'scope') {
            return (
              <MemoScope
                currentStory={currentStory}
                expanded={item.scope === currentScope}
                item={item}
                key={item.name}
                onStoryClick={handleStoryClick}
              />
            )
          }

          return <TreeItem key={itemIndex} text="unknown" />
        })}
      </>
    )
  }, [basePath, currentScope, currentStory, handleStoryClick, items, workshopPath])
})

const MemoList = memo(function MemoList(props: {expanded: boolean; item: MenuList; path: string}) {
  const {expanded, item, path} = props

  const children = useMemo(() => <MenuItems basePath={path} items={item.items} />, [item, path])

  return (
    <TreeItem expanded={expanded} fontSize={1} padding={2} text={item.title} weight="semibold">
      {children}
    </TreeItem>
  )
})

const MemoScope = memo(function MemoScope(props: {
  currentStory: WorkshopStory | null
  expanded: boolean
  item: MenuScope
  onStoryClick: (event: React.MouseEvent<HTMLLIElement>) => void
}) {
  const {currentStory, expanded, item, onStoryClick} = props

  const children = useMemo(
    () =>
      item.scope.stories.map((story) => (
        <TreeItem
          data-path={`/${item.scope.name}/${story.name}`}
          fontSize={1}
          href={`/${item.scope.name}/${story.name}`}
          key={story.name}
          onClick={onStoryClick}
          padding={2}
          selected={currentStory === story}
          text={story.title}
        />
      )),
    [currentStory, item, onStoryClick]
  )

  return (
    <TreeItem expanded={expanded} fontSize={1} padding={2} text={item.title} weight="semibold">
      {children}
    </TreeItem>
  )
})
