import React from 'react'
import { useState, useEffect } from "react";
import { AppLayout } from '/components/Layout/AppLayout'
import { PageHeader } from '/components/Layout/PageHeader'
import { Collection, CollectionTab } from '/features/nft/market/collection'
import { styled, theme } from 'components/theme'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";
import { setUIData } from "store/actions/uiAction";
import { NFT_COLUMN_COUNT, UI_ERROR } from "store/types";

export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
  const [tabIndex, setTabIndex] = React.useState(0)

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }

  const borderColor = theme.borderColors.default
  const dispatch = useDispatch()
  const uiListData = useSelector((state) => state.uiData)
  const { nft_column_count } = uiListData
  const DEFAULT_NFT_COLUMN_COUNT = 3
  useEffect(() => {
    dispatch(setUIData(NFT_COLUMN_COUNT, DEFAULT_NFT_COLUMN_COUNT))
    
  }, [dispatch]);

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
