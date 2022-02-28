import {Box, ButtonTone, Card, Flex, Layer, Tab, TabList, TabPanel} from '@sanity/ui'
import React, {createElement, memo, useMemo, useState} from 'react'
import {useWorkshop} from '../useWorkshop'

interface InspectorTab {
  id: string
  label: React.ReactNode
  panel?: React.ComponentType
  tone?: ButtonTone
}

export const WorkshopInspector = memo(function WorkshopInspector(): React.ReactElement {
  const {plugins} = useWorkshop()

  const tabs: InspectorTab[] = useMemo(() => {
    return plugins
      .filter((plugin) => plugin.inspector)
      .map((plugin) => {
        return {
          id: plugin.name,
          label: plugin.title,
          tone: undefined,
          panel: plugin.inspector,
        }
      })
  }, [plugins])

  const [tabId, setTabId] = useState<string | null>(tabs.length > 0 ? tabs[0].id : null)
  const currentTab = tabs.find((tab) => tab.id === tabId)
  const showTabs = tabs.length > 1

  return (
    <Card
      borderLeft
      display={['none', 'none', 'block']}
      flex={1}
      overflow="auto"
      style={{minWidth: 180, maxWidth: 300}}
    >
      <Flex direction="column" height="fill">
        {showTabs && (
          <InspectorHeaderWithTabs currentTabId={tabId} onTabChange={setTabId} tabs={tabs} />
        )}

        {showTabs &&
          tabs.map((tab) => (
            <TabPanel
              aria-labelledby={`${tab.id}-tab`}
              flex={1}
              hidden={tab.id !== tabId}
              id={`${tab.id}-panel`}
              key={tab.id}
              overflow="auto"
            >
              {tab.panel && createElement(tab.panel)}
            </TabPanel>
          ))}

        {!showTabs && currentTab?.panel && (
          <Box flex={1} overflow="auto">
            <MemoRender component={currentTab.panel} />
          </Box>
        )}
      </Flex>
    </Card>
  )
})

const InspectorHeaderWithTabs = memo(function InspectorHeaderWithTabs(props: {
  currentTabId: string | null
  onTabChange: (id: string) => void
  tabs: InspectorTab[]
}) {
  const {currentTabId, onTabChange, tabs} = props

  return (
    <Layer style={{flex: 'none', position: 'sticky', top: 0}}>
      <Card padding={2} shadow={1} style={{lineHeight: 0}}>
        <TabList space={1}>
          {tabs.map((tab) => (
            <Tab
              aria-controls={`${tab.id}-panel`}
              fontSize={1}
              id={tab.id}
              key={tab.id}
              label={tab.label}
              onClick={() => onTabChange(tab.id)}
              selected={tab.id === currentTabId}
              tone={tab.tone}
            />
          ))}
        </TabList>
      </Card>
    </Layer>
  )
})

const MemoRender = memo(function MemoRender(props: {component: React.ComponentType}) {
  return createElement(props.component)
})
