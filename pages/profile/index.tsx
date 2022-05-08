import React from 'react'
import { useState, useEffect } from "react";
import { AppLayout } from '/components/Layout/AppLayout'
import { PageHeader } from '/components/Layout/PageHeader'
import { MyCollectedNFTs, ProfileTab } from '/features/nft/market/profile'
import { styled, theme } from 'components/theme'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { useRecoilState } from 'recoil'
import { walletState, WalletStatusType } from '../../state/atoms/walletAtoms'
import { ConnectedWalletButton } from '/components/ConnectedWalletButton'
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";

import { useDispatch, useSelector } from "react-redux";
import { setUIData } from "store/actions/uiAction";
import { setFilterData } from "store/actions/filterAction";
import { NFT_COLUMN_COUNT, UI_ERROR, FILTER_STATUS } from "store/types";

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
      <SdkProvider config={config}>
      <PageHeader
        title="Profile"
        subtitle=""
      />
      { Boolean(key?.name) &&
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList css={`border-bottom: 1px solid ${borderColor}`}>
          <Container className="mauto profile-tab">
            <ProfileTab index={tabIndex}/>
          </Container>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Container className="middle mauto">
              <MyCollectedNFTs/>
            </Container>
          </TabPanel>
          <TabPanel>
            Testing1
          </TabPanel>
          <TabPanel>
            Testing2
          </TabPanel>
          <TabPanel>
            Testing3
          </TabPanel>
          <TabPanel>
            Testing4
          </TabPanel>
        </TabPanels>
      </Tabs>
      }
      { !Boolean(key?.name) &&
        <WalletContainer>
        <ConnectedWalletButton
          connected={Boolean(key?.name)}
          walletName={key?.name}
          onConnect={() => connectWallet(null)}
          onDisconnect={resetWalletConnection}
        />
        </WalletContainer>
      }
      </SdkProvider>
    </AppLayout>
  )
}

const Container = styled('div', {
  '&.profile-tab':{
    maxWidth: '1600px',
    width: '100%',
    paddingLeft: '$25',
    '>div':{
      justifyContent: 'space-around',
    }
  }
})
const WalletContainer = styled('div', {
  justifyContent: 'center',
  margin: '$18 0',
  display: 'flex',
})