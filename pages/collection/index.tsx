import React from 'react'
import { useState } from "react";
import { AppLayout } from '/components/Layout/AppLayout'
import { PageHeader } from '/components/Layout/PageHeader'
import { Collection } from '/features/nft/market/collection'
import { styled } from 'components/theme'

export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
  return (
    <AppLayout fullWidth={fullWidth}>
      <PageHeader
        title="Collection"
        subtitle="Welcome to FewoWorld, a universe created by FEWOCiOUS and the Web3 community. FewoWorld is the first generative art project from the mind of FEWOCiOUS. Unlike anything he has created before."
      />
      <Container className="middle mauto">
        <Collection/>
      </Container>
    </AppLayout>
  )
}

const Container = styled('div', {
  
})
