import React, { useReducer, useState, useEffect } from "react";
import Head from "next/head";
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import { CollectionCreate } from 'features/nft/market/collection/create'
import { styled } from 'components/theme'

export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
  

  return (
    <AppLayout fullWidth={fullWidth}>
      <PageHeader
        title="Collection Create"
        subtitle=""
      />
      <Container className="middle mauto">
        <CollectionCreate/>
      </Container>
    </AppLayout>
  
  );
}

const Container = styled('div', {
  
})
