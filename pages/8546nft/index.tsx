import type { NextPage } from 'next'
import { styled } from 'components/theme'
import { AppLayout } from 'components/Layout/AppLayout'
import NFTToken from 'features/nft'
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";
import {
  ChakraProvider,
} from "@chakra-ui/react"
import theme from "theme"

const NFT: NextPage = () => {
  return (
    <AppLayout>
      <Container className="middle mauto">
        <ChakraProvider theme={theme}>
          <SdkProvider config={config}>
            <NFTToken />
          </SdkProvider>
        </ChakraProvider>
      </Container>
    </AppLayout>
  )
}

export default NFT
const Container = styled('div', {
})