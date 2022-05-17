import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from 'components/theme'
import { Button } from 'components/Button'
import { IconWrapper } from 'components/IconWrapper'
import { NftPrice } from 'components/NFT/nft-card/price'
import { User, CopyNft, Heart, Clock, Package, Credit } from 'icons'
import { Link as ReactRouterLink, useHistory, useParams } from "react-router-dom";
import {
  NftInfo,
} from "services/nft"
import {
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
  readonly id: string;
}

export const NFTDetail = () => {
  const [nft, setNft] = useState<NftInfo>(
    {'tokenId': 'aaa1', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'FEWOCiOUS x ComplexCon', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' }
  )
  return (
    <Nft className="nft-info">
        <NftUriTag className="nft-uri">
          <img src={nft.image}/>
        </NftUriTag>
        <NftInfoTag className="nft-detail">
          <h2 className="nft-title">{nft.title}</h2>
          <a className="nft-link" href="#">{nft.title}</a>
          <NftMeta className="nft-meta">
            <Button className="nft-meta-link"
              as="a"
              variant="ghost"
              iconLeft={<IconWrapper icon={<User />} />}
            >
              Owners
            </Button>
            <Button className="nft-meta-link"
              as="a"
              variant="ghost"
              iconLeft={<IconWrapper icon={<CopyNft />} />}
            >
              Total
            </Button>
            <Button className="nft-meta-link"
              as="a"
              variant="ghost"
              iconLeft={<IconWrapper icon={<Heart />} />}
            >
              Favorites
            </Button>
          </NftMeta>
          <NftBuyOfferTag className="nft-buy-offer">
            <NftSale className="disabled">
              <IconWrapper icon={<Clock />}/>
              Sale ends May 13, 2022 at 8:03am IST 
            </NftSale>
            <PriceTag>
              <label className="price-lbl">Current Price</label>
              <NftPrice nft={nft}/>
              <ButtonGroup>
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
                  Make Offer
                </Button>
              </ButtonGroup>
            </PriceTag>
          </NftBuyOfferTag>
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
          </NftOfferTag>
        </NftInfoTag>
        
    </Nft>
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