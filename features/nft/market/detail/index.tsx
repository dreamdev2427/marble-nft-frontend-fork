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
export const NFTDetail = ({ collectionId, id}) => {
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
      {nft.user == address &&
      <OwnerAction>
        <Link href={`/nft/${collectionId}/${id}/sell`} passHref>
        <Button>Sell</Button>
        </Link>
      </OwnerAction>
      }
      <Nft className="nft-info">
          
          <NftUriTag className="nft-uri">
            {nft.image && 
            <Image src={nft.image} alt="NFT Image"/>
            }
          </NftUriTag>
          <NftInfoTag className="nft-detail">
            <h2 className="nft-title">{nft.name}</h2>
            <Link href={`/collection/${collectionId}`} passHref>{nft.collectionName}</Link>
            <NftMeta className="nft-meta">
              <Button className="nft-meta-link"
                as="a"
                variant="ghost"
                iconLeft={<IconWrapper icon={<User />} />}
                title={nft.user}
              >
                <span className="owner-address">Owned by {nft.user}</span>
              </Button>
            </NftMeta>
            <NftBuyOfferTag className="nft-buy-offer">
              <NftSale className="disabled">
                <IconWrapper icon={<Clock />}/>
                This section is under development
              </NftSale>
              <PriceTag>
                <label className="price-lbl">Current Price</label>
                <NftPrice nft={nft}/>
                <ButtonGroup>
                <Link href="https://app.marbledao.finance/marblenauts-nft" passHref>
                  <Button className="btn-buy btn-default"
                    css={{
                      'background': '$black',
                      'color': '$white',
                      'stroke': '$white',
                    }}
                    iconLeft={<IconWrapper icon={<Credit />} />}
                    variant="primary"
                    size="large"

                  >
                    Buy Now
                    </Button>
                    </Link>
                  <Button className="btn-offer btn-default"
                    css={{
                      'background': '$white',
                      'color': '$textColors$primary',
                      'stroke': '$white',
                    }}
                    iconLeft={<IconWrapper icon={<Credit />} />}
                    variant="primary"
                    size="large"

                  >
                    Soon Offer
                  </Button>
                </ButtonGroup>
              </PriceTag>
            </NftBuyOfferTag>
  {/*
            <NftOfferTag className="nft-offer">
              <TableTitle className="offer-title">
                <IconWrapper icon={<Package />} />Offers
              </TableTitle>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
                      <Th>Unit Price</Th>
                      <Th>USD Unit Price</Th>
                      <Th>Quantity</Th>
                      <Th>Floor Differance</Th>
                      <Th>Expirantion</Th>
                      <Th>From</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>0.555 Weth</Td>
                      <Td>$1,69</Td>
                      <Td>1</Td>
                      <Td>31% below</Td>
                      <Td>2 days</Td>
                      <Td><span className="from-link">Follow Twitter-TrollCI...</span></Td>
                    </Tr>
                    <Tr>
                      <Td>0.555 Weth</Td>
                      <Td>$1,69</Td>
                      <Td>1</Td>
                      <Td>31% below</Td>
                      <Td>2 days</Td>
                      <Td><span className="from-link">Follow Twitter-TrollCI...</span></Td>
                    </Tr>
                    <Tr>
                      <Td>0.555 Weth</Td>
                      <Td>$1,69</Td>
                      <Td>1</Td>
                      <Td>31% below</Td>
                      <Td>2 days</Td>
                      <Td><span className="from-link">Follow Twitter-TrollCI...</span></Td>
                    </Tr>
                    <Tr>
                      <Td>0.555 Weth</Td>
                      <Td>$1,69</Td>
                      <Td>1</Td>
                      <Td>31% below</Td>
                      <Td>2 days</Td>
                      <Td><span className="from-link">Follow Twitter-TrollCI...</span></Td>
                    </Tr>
                    <Tr>
                      <Td>0.555 Weth</Td>
                      <Td>$1,69</Td>
                      <Td>1</Td>
                      <Td>31% below</Td>
                      <Td>2 days</Td>
                      <Td><span className="from-link">Follow Twitter-TrollCI...</span></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </NftOfferTag> */}
          </NftInfoTag>

      </Nft>
    </>
  );
}
const Nft = styled('div', {
  display: 'flex',
})
const NftUriTag = styled('div', {
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
const NftMeta = styled('div', {
  display: 'flex',
  marginTop: '$4',
  ' .nft-meta-link': {
    color: '$colors$nft',
    paddingLeft: '0px',
    fontWeight: 'normal',
    '>span': {
      paddingLeft: '0px',
      justifyContent: 'left',
      ' svg': {
        width: '20px',
        height: '20px',
      }
    },
    '.owner-address': {
      overflowWrap: 'break-word',
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }
  }
})
const NftBuyOfferTag = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $borderColors$default',
  borderRadius: '$2',
  marginTop: '$16',
})
const NftSale = styled('div', {
  display: 'flex',
  padding: '$12 $16',
  alignItems: 'center',
  gap: '$4',
  borderBottom: '1px solid $borderColors$default',
  '&.disabled': {
    color: '$textColors$disabled',
  }
})
const PriceTag = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$12 $16',
  ' .price-lbl':{
    color: '$colors$link',
  }
})
const ButtonGroup = styled('div', {
  display: 'flex',
  gap: '$8',
  marginTop: '$space$10',
  ' .btn-buy': {
    padding: '$space$10 $space$14',
    ' svg': {
      borderRadius: '2px',
    }
  },
  ' .btn-offer': {
    padding: '$space$10 $space$14',
    border: '$borderWidths$1 solid $black',
    color: '$black',
    '&:hover':{
      background: '$white',
      color: '$textColors$primary',
      stroke: '$white',
    },
    ' svg': {
      border: '$borderWidths$1 solid $black',
      borderRadius: '2px',
    }
  }
})
const NftOfferTag = styled('div', {
  border: '1px solid $borderColors$default',
  borderRadius: '$2',
  marginTop: '$16',
  ' table': {
    width: '100%',
    borderCollapse: 'collapse',
    ' thead': {
      ' tr': {
        ' th': {
          textAlign: 'left',
          padding: '$space$14 $space$16',
        },
      },
    },
    ' tbody': {
      ' tr': {
        borderTop: '$borderWidths$1 solid $borderColors$default',
        ' td': {
          textAlign: 'left',
          padding: '$space$14 $space$16',
        },
      },
    },
    ' .from-link': {
      color: '$link',
    }
  }

})
const TableTitle = styled('div', {
  display: 'flex',
  padding: '$space$14 $space$16',
  gap: '$4',
  borderBottom: '1px solid $borderColors$default',
})
const OwnerAction = styled('div', {
  position: 'absolute',
  margin: '-40px 0',
  right: '0',
})
