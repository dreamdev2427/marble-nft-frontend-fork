import React from 'react'
import { AppLayout } from '/components/Layout/AppLayout'
import { PageHeader } from '/components/Layout/PageHeader'
import { NFTDetail } from '/features/nft/market/detail'
import { styled } from 'components/theme'

export default function Home() {
  return (
    <AppLayout>
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
