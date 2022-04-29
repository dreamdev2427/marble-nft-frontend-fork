import React from 'react'
import { useState } from "react";
import { AppLayout } from '/components/Layout/AppLayout'
import { PageHeader } from '/components/Layout/PageHeader'
import { Collection, CollectionTab } from '/features/nft/market/collection'
import { styled, theme } from 'components/theme'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }
  const borderColor = theme.borderColors.default
  return (
    <AppLayout fullWidth={fullWidth}>
      <PageHeader
        title="Collection"
        subtitle="Welcome to FewoWorld, a universe created by FEWOCiOUS and the Web3 community. FewoWorld is the first generative art project from the mind of FEWOCiOUS. Unlike anything he has created before."
      />
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList css={`border-bottom: 1px solid ${borderColor}`}>
          <Container className="mauto">
            <CollectionTab index={tabIndex}/>
          </Container>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Container className="middle mauto">
              <Collection />
            </Container>
          </TabPanel>
          <TabPanel>
            Testing
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AppLayout>
  )
}

const Container = styled('div', {
  
})
