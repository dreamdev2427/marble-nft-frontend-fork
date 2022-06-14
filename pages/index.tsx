import React from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { PageHeader } from '../components/Layout/PageHeader'
import { Explore } from '../features/nft/market/explore'
import { styled } from 'components/theme'
import { useState } from "react";
import { useConnectWallet } from '../hooks/useConnectWallet'
import { useRecoilState } from 'recoil'
import { walletState, WalletStatusType } from '../state/atoms/walletAtoms'
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";


export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
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
  return (
    <AppLayout fullWidth={fullWidth}>
      <SdkProvider config={config}>
      <PageHeader
        title="Collections"
        subtitle="The Marble Marketplace is the bridge the physical and digital world."
      />
      <Container className="middle mauto">
        <Explore/>
      </Container>
      </SdkProvider>
    </AppLayout>
  )
}

const Container = styled('div', {

})
