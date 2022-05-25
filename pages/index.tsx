import React from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { PageHeader } from '../components/Layout/PageHeader'
import { Explore } from '../features/nft/market/explore'
import { styled } from 'components/theme'
import { useState } from "react";

export default function Home() {
  const [fullWidth, setFullWidth] = useState(false);
  return (
    <AppLayout fullWidth={fullWidth}>
      <Container className="middle mauto">
        <PageHeader
          title="Explore Collections"
          subtitle=""
        />
        <Explore/>
      </Container>
    </AppLayout>
  )
}

const Container = styled('div', {
  
})
