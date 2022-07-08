import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { styled } from 'components/theme'
import { Button } from 'components/Button'
import { IconWrapper } from 'components/IconWrapper'
import { NftPrice } from 'components/NFT/nft-card/price'
import { User, CopyNft, Heart, Clock, Package, Credit } from 'icons'
import { useHistory, useParams } from "react-router-dom";
import Link from 'next/link'
import {
  NftInfo,
  CW721,
  Collection,
  Market,
  useSdk
} from "services/nft"
import { walletState } from 'state/atoms/walletAtoms'
import { useRecoilValue } from 'recoil'
import {
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

interface DetailParams {
  readonly collectionId: string
  readonly id: string
}
const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''
export const NFTSell = ({ collectionId, id}) => {
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [nft, setNft] = useState<NftInfo>(
    {'tokenId': id, 'address': '', 'image': '', 'name': '', 'user': '', 'price': '0', 'total': 2, 'collectionName': "" }
  )

  const loadNft = useCallback(async () => {
    if (!client) return
    if (collectionId === undefined || collectionId == "[collection]" || id === undefined || id == "[id]")
      return false
    console.log("IDS:", collectionId, id)
    const marketContract = Market(PUBLIC_MARKETPLACE).use(client)
    let collection = await marketContract.collection(parseInt(collectionId))
    console.log("collection", collection)
    let ipfs_collection = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + collection.uri)
    let res_collection = await ipfs_collection.json()
    console.log("Res collection:", res_collection)
    const cw721Contract = CW721(collection.cw721_address).use(client)
    let nftInfo = await cw721Contract.nftInfo(id)
    console.log("nft Info:", nftInfo.token_uri)
    let ipfs_nft = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + nftInfo.token_uri)
    let res_nft = await ipfs_nft.json()
    
    console.log("NFT Info:", res_nft.name)
    const collectionContract = Collection(collection.collection_address).use(client)
    let price:any = await collectionContract.getPrice([parseInt(id)])
    console.log("price", price)
    res_nft.price = price.prices[0].price
    let uri = res_nft.uri
    if (uri.indexOf("https://") == -1){
      uri = process.env.NEXT_PUBLIC_PINATA_URL + res_nft.uri
    }
    setNft({'tokenId': id, 'address': '', 'image': uri, 'name': res_nft.name, 'user': res_nft.owner, 'price': res_nft.price, 'total': 2, 'collectionName': res_collection.name})
  }, [client])
  useEffect(() => {
    loadNft()
  }, [loadNft, collectionId, id]);
  return (
    <>
      <Nft className="nft-info">
        <NftInfoTag className="nft-detail">
          <h2 className="nft-title">List item for sale</h2>
          <h4>Type</h4>
          <ButtonGroup>
            <Button className="fixed-btn active">Fixed Price</Button>
            <Button className="auction-btn">Timed Auction</Button>
          </ButtonGroup>
          <h4>Price</h4>
          <PriceContiner>

          </PriceContiner>
        </NftInfoTag>
        <NftUriTag className="sell-nft-uri">
          {nft.image && 
          <Image src={nft.image} alt="NFT Image"/>
          }
        </NftUriTag>
      </Nft>
    </>
  );
}
const Nft = styled('div', {
  display: 'flex',
})
const NftUriTag = styled('div', {
  paddingRight: '0',
  paddingLeft: '30px',
  ' img':{
    borderRadius: '$4',
  }
})
const NftInfoTag = styled('div', {
  ' .nft-title':{
    marginTop: '0px',
  },
  '>a':{
    color: '$colors$link',
  }
})

const ButtonGroup = styled('div', {
  display: 'flex',
  gap: '0',
  marginTop: '$space$10',
  'button':{
    width: '50%',
    borderRadius: '0',
    background: '$gray',
    '&.active':{
      background: '$dark',
    },
    '&.fixed-btn':{
      borderTopLeftRadius: '$2',
      borderBottomLeftRadius: '$2',
    },
    '&.auction-btn':{
      borderTopRightRadius: '$2',
      borderBottomRightRadius: '$2',
    }
  }
})

const PriceContiner = styled('div', {
  
})
