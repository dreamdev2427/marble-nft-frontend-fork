import React from 'react'
import { AppLayout } from '../components/Layout/AppLayout'
import { PageHeader } from '../components/Layout/PageHeader'
import { styled } from 'components/theme'

export default function Home() {
  return (
    <AppLayout>
      <Container className="middle mauto">
        <PageHeader
          title="Explore Collections"
          subtitle="Welcome to FewoWorld, a universe created by FEWOCiOUS and the Web3 community. FewoWorld is the first generative art project from the mind of FEWOCiOUS. Unlike anything he has created before."
        />
        NFT Market Place
      </Container>
    </AppLayout>
  )
}

const Container = styled('div', {
  
})
