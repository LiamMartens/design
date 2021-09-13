import {Box, ButtonTone, Card, Layer, Tab, TabList, TabPanel, Text} from '@sanity/ui'
import React, {useMemo, useState} from 'react'
import {features} from '../../features'
import {Prop} from '../../props'
import {useScope} from '../../useScope'
import {useWorkshop} from '../../useWorkshop'
import {InspectAxeResults} from './inspectAxeResults'

interface InspectorTab {
  id: string
  label: React.ReactNode
  panel: React.ReactNode
  tone?: ButtonTone
}

export function Inspector(): React.ReactElement {
  const {axeResults} = useWorkshop()
  const scope = useScope()

  const hasA11yViolations = (axeResults?.violations?.length || 0) > 0

  const tabs: InspectorTab[] = useMemo(
    () =>
      [
        {
          id: 'props',
          label: <>Props</>,
          panel: (
            <>
              {scope.props.length === 0 && (
                <Box padding={3}>
                  <Text muted size={1}>
                    No properties
                  </Text>
                </Box>
              )}
              {scope.props.length > 0 &&
                scope.props.map((prop, propIndex) => (
                  <Prop key={propIndex} schema={prop.schema} value={prop.value} />
                ))}
            </>
          ),
        },
        features.axe && {
          id: 'accessibility',
          label: <>Accessibility ({axeResults?.violations.length || 0})</>,
          tone: hasA11yViolations ? 'critical' : undefined,
          panel: axeResults && <InspectAxeResults axeResults={axeResults} />,
        },
      ].filter(Boolean) as InspectorTab[],
    [axeResults, hasA11yViolations, scope.props]
  )

  const [tabId, setTabId] = useState<string | null>(tabs.length > 0 ? tabs[0].id : null)

  const currentTab = tabs.find((tab) => tab.id === tabId)

  const showTabs = tabs.length > 1

  return (
    <div>
      {showTabs && (
        <Layer style={{position: 'sticky', top: 0}}>
          <Card padding={2} shadow={1}>
            <TabList space={1}>
              {tabs.map((tab) => (
                <Tab
                  aria-controls={`${tab.id}-panel`}
                  fontSize={1}
                  id={tab.id}
                  key={tab.id}
                  label={tab.label as any}
                  onClick={() => setTabId(tab.id)}
                  selected={tab.id === tabId}
                  tone={tab.tone}
                />
              ))}
            </TabList>
          </Card>
        </Layer>
      )}

      {showTabs &&
        tabs.map((tab) => (
          <TabPanel
            aria-labelledby={`${tab.id}-tab`}
            hidden={tab.id === tabId}
            id={`${tab.id}-panel`}
            key={tab.id}
            overflow="auto"
            padding={2}
          >
            {tab.panel}
          </TabPanel>
        ))}

      {!showTabs && currentTab && <Box padding={2}>{currentTab.panel}</Box>}
    </div>
  )
}
