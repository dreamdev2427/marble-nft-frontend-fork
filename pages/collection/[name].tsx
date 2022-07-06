import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'

import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { CollectionNFTList, CollectionTab } from 'features/nft/market/collection'
import { styled, theme } from 'components/theme'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useDispatch, useSelector } from "react-redux";
import { State } from 'store/reducers'
import { setUIData } from "store/actions/uiAction";
import { setFilterData } from "store/actions/filterAction";
import { NFT_COLUMN_COUNT, UI_ERROR, FILTER_STATUS } from "store/types";
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";
import { Market, CW721, useSdk } from 'services/nft'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { walletState, WalletStatusType } from '../../state/atoms/walletAtoms'
import { useRecoilValue, useRecoilState } from 'recoil'



const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''

export default function Home() {
  const DEFAULT_NFT_COLUMN_COUNT = 3
  const DEFAULT_FILTER_STATUS = []
  const { mutate: connectWallet } = useConnectWallet()
  const [{ key }, setWalletState] = useRecoilState(walletState)
  function resetWalletConnection() {
    setWalletState({
      status: WalletStatusType.idle,
      address: '',
      key: null,
      client: null,
    })
  }
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)

  const router = useRouter()
  const query = router.query
  const { asPath, pathname } = useRouter();
  const collectionId = asPath.replace('/collection/', '')
  const [numTokens, setNumTokens] = useState(0)
  const [collectionName, setCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  const [collectionAddress, setCollectionAddress] = useState("")
  const [uri, setUri] = useState("")

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
      
      if (collectionId === undefined || collectionId == "[name]")
        return false
      
    })();

  }, [collectionId])
  return (
    <AppLayout fullWidth={fullWidth}>
      <SdkProvider config={config}>
      <PageHeader
        title="collectionName"
        subtitle={collectionId}
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
              <CollectionNFTList id={collectionId}/>
            </Container>
          </TabPanel>
          <TabPanel>
            Testing
          </TabPanel>
        </TabPanels>
      </Tabs>
      </SdkProvider>
    </AppLayout>
  )
}

const Container = styled('div', {
  
})
