import React from 'react'
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { NFTDetail } from 'features/nft/market/detail'
import { useState } from "react";
import { styled } from 'components/theme'
import { useRouter } from 'next/router'

import { useConnectWallet } from '../../../hooks/useConnectWallet'
import { useRecoilState } from 'recoil'
import { walletState, WalletStatusType } from '../../../state/atoms/walletAtoms'
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";

export default function Home() {
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

  const { asPath, pathname } = useRouter()
  const id = asPath.split("/")[3]
  const collectionId = asPath.split("/")[2]
  const [fullWidth, setFullWidth] = useState(true);
  return (

    <AppLayout fullWidth={fullWidth}>
      <SdkProvider config={config}>
        <PageHeader
            title=""
            subtitle=""
            align="center"
          />
        <Container className="middle mauto">

          <NFTDetail collectionId={collectionId} id={id}/>
        </Container>
      </SdkProvider>
    </AppLayout>
  )
}

const Container = styled('div', {

})
