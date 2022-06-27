import * as React from "react"
import type { NextPage } from 'next'
import { AppLayout } from 'components/Layout/AppLayout'
import {
  ChakraProvider,
} from "@chakra-ui/react"
import { Landing } from './landing'
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";
import { Gallery } from "./gallery"
import { Account } from "./account"
import { Create } from "./create/create"
import theme from "theme"

const NFT: NextPage = () => {
  return (
    <>
    {/* <AppLayout>
      <ChakraProvider theme={theme}>

        <SdkProvider config={config}> */}

          {/* <Router><Route
        exact
        path="/account"
        component={Account}
      />\
      <Route
        exact
        path="/create"
        component={Create}
      />
      <Route
        exact
        path="/detail"
        component={Detail}
      />
      <Route
        exact
        path="/galary"
        component={Gallery}
      />
      <Route
        exact
        path="/landing"
        component={Landing}
      />
    </Router>*/}
          {/* <Create /> */}
          {/* <Landing /> */}
          {/* <Gallery />
        </SdkProvider>
      </ChakraProvider>
    </AppLayout> */}
    </>
  )
}

export default NFT
