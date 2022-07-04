import React from 'react'
import { useState, useEffect } from "react";
import { Text } from '../Text'
import Head from 'next/head'
import { APP_NAME } from '../../util/constants'
import { styled } from '../theme'
import { SdkProvider } from "services/nft/client/wallet"
import { config } from "services/config";
import { Market, CW721, useSdk } from 'services/nft'
import { useConnectWallet } from '../../hooks/useConnectWallet'
import { walletState, WalletStatusType } from '../../state/atoms/walletAtoms'
import { useRecoilValue, useRecoilState } from 'recoil'

export const PageHeader = ({ title, subtitle, align='center', className='' }) => {
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
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [collectionName, setCollectionName] = useState("")
  const [collectionDescription, setCollectionDescription] = useState("")
  useEffect(() => {
    (async () => {
      
      if (title == "collectionName"){
        if (!client){
          return;
        }
        const marketContract = Market(process.env.NEXT_PUBLIC_MARKETPLACE).use(client)
        let collection = await marketContract.collection(parseInt(subtitle))
        let ipfs_collection = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + collection.uri)
        let res_collection = await ipfs_collection.json()
        setCollectionName(res_collection.name)
        setCollectionDescription(res_collection.description)
      }
    })();
  }, [client])
  return (
    <>
      <Head>
        <title>
          {APP_NAME} — {title}
        </title>
      </Head>
        <HeaderContainer className={`${className}`}>
        <Text
          variant="header"
          className={`page-title ${title=="NFT"?"nft-title":""}`}
          css={{ fontSize: '$12', lineHeight: '$5', textAlign: `${align}` }}
        >
          {title=="collectionName"?collectionName:title}
        </Text>
        {subtitle!=""&&
        <Text
          variant="body"
          className="page-subtitle"
          css={{ paddingTop: '1.5rem',paddingBottom: '2rem', fontSize: '$8', textAlign: 'center', maxWidth:'970px', margin:'0 auto', color:'$textColors$secondary' }}
        >
          {title=="collectionName"?collectionDescription:subtitle}
        </Text>
        }
        </HeaderContainer>
    </>
  )
}
const HeaderContainer = styled('div', {

})
const Banner = styled('div', {
  height: '$25',

})
const StyledContainer = styled('div', {
  lineHeight: '$space$26',
  color: '$textColors$white',
  fontWeight: 'bold',
  fontSize: '$16'
})
