import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { Collection, CollectionTab } from 'features/nft/market/collection'
import { styled, theme } from 'components/theme'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";
import { State } from 'store/reducers'
import { setUIData } from "store/actions/uiAction";
import { setFilterData } from "store/actions/filterAction";
import { NFT_COLUMN_COUNT, UI_ERROR, FILTER_STATUS } from "store/types";

export default function Home() {
  const DEFAULT_NFT_COLUMN_COUNT = 3
  const DEFAULT_FILTER_STATUS = []

  const router = useRouter()
  const query = router.query
  const { asPath, pathname } = useRouter();
  const slug = asPath.replace('/collection/', '')
  const [collectionName, setCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")

  const [fullWidth, setFullWidth] = useState(true);
  const [tabIndex, setTabIndex] = React.useState(0)

  const borderColor = theme.borderColors.default
  const dispatch = useDispatch()
  
  const uiListData = useSelector((state: State) => state.uiData)
  const { nft_column_count } = uiListData

  const filterData = useSelector((state: State) => state.filterData)
  const { filter_status } = filterData

  const handleTabsChange = (index) => {
    setTabIndex(index)
  }
  
  useEffect(() => {
    //setUIData(NFT_COLUMN_COUNT, DEFAULT_NFT_COLUMN_COUNT)
    dispatch(
      {
        type: NFT_COLUMN_COUNT,
        payload: DEFAULT_NFT_COLUMN_COUNT
      }
    )
    //setFilterData(FILTER_STATUS, DEFAULT_FILTER_STATUS)
    dispatch(
      {
        type: FILTER_STATUS,
        payload: filter_status,
      }
    )
  }, [dispatch]);
  useEffect(() => {
    (async () => {
      console.log("name", slug)
      if (slug === undefined || slug == "[name]")
        return false
      let res_collection = await fetch(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + slug + '/Collection Metadata.json')
      let collection = await res_collection.json()
      setCollectionName(collection.name)
      setCollectionDescription(collection.description)
    })();

  }, [slug])
  return (
    <AppLayout fullWidth={fullWidth}>
      <PageHeader
        title={collectionName}
        subtitle={collectionDescription}
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
              <Collection slug={slug} name={collectionName}/>
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
