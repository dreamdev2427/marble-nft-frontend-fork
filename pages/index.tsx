import React from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { PageHeader } from '../components/Layout/PageHeader'
import { Explore } from '../features/nft/market/explore'
import { styled } from 'components/theme'
import { useState } from "react";

export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
  return (
    <AppLayout fullWidth={fullWidth}>
      <PageHeader
        title="Collections"
        subtitle="The Marble Marketplace is the bridge the physical and digital world."
      />
      <Container className="middle mauto">
        <Explore/>
      </Container>
    </AppLayout>
  )
}

const Container = styled('div', {

})
