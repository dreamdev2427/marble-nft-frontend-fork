import React from 'react'
import { useState, useEffect } from "react";
import { AppLayout } from '/components/Layout/AppLayout'
import { PageHeader } from '/components/Layout/PageHeader'
import { Collection, CollectionTab } from '/features/nft/market/collection'
import { styled, theme } from 'components/theme'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";
import { setUIData } from "store/actions/uiAction";
import { setFilterData } from "store/actions/filterAction";
import { NFT_COLUMN_COUNT, UI_ERROR, FILTER_STATUS } from "store/types";

export default function Home() {
  const DEFAULT_NFT_COLUMN_COUNT = 3
  const DEFAULT_FILTER_STATUS = []

  const [fullWidth, setFullWidth] = useState(true);
  const [tabIndex, setTabIndex] = React.useState(0)

  const borderColor = theme.borderColors.default
  const dispatch = useDispatch()
  
  const uiListData = useSelector((state) => state.uiData)
  const { nft_column_count } = uiListData

  const filterData = useSelector((state) => state.filterData)
  const { filter_status } = filterData

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }
  
  useEffect(() => {
    dispatch(setUIData(NFT_COLUMN_COUNT, DEFAULT_NFT_COLUMN_COUNT))
    dispatch(setFilterData(FILTER_STATUS, DEFAULT_FILTER_STATUS))
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
