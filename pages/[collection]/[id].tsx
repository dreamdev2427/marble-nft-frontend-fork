import React from 'react'
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { NFTDetail } from 'features/nft/market/detail'
import { useState } from "react";
import { styled } from 'components/theme'
import { useRouter } from 'next/router'

export default function Home() {
  const { asPath, pathname } = useRouter();
  const id = asPath.replace('/nft/', '')
  const [fullWidth, setFullWidth] = useState(false);
  return (

    <AppLayout fullWidth={fullWidth}>
      <Container className="middle mauto">
        <PageHeader
          title="NFT"
          subtitle=""
          align="left"
        />
        <NFTDetail/>
      </Container>
    </AppLayout>
  )
}

const Container = styled('div', {
  
})
