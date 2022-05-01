import {
  Box,
  chakra,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { styled } from 'components/theme'
import { NftInfo } from "services/nft/type";
import { Button } from 'components/Button'
import { IconWrapper } from 'components/IconWrapper'
import { Credit } from 'icons'
interface NftCardProps {
  readonly nft: NftInfo;
}

export function NftCard({ nft }: NftCardProps): JSX.Element {
  return (
    <NftCardDiv className="nft-card">
      <ImgDiv>
        <img className="nft-img-url" src={nft.image}/>
      </ImgDiv>
      <TextDiv>
        <h2>{nft.title}</h2>
        <h5>{nft.collectionName}</h5>
        <p className="price-title">Current Price</p>
        <PriceDiv>
          <img className="token-icon" src="/nft/ether.png"/>
          <span className="token-balance">{nft.price}</span>
          <span className="nft-price">(${nft.price})</span>
        </PriceDiv>
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
      </TextDiv>
    </NftCardDiv>
  );
}

const NftCardDiv = styled('div', {
  border: '1px solid $borderColors$default',
  borderRadius: '$4',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)'
})

const ImgDiv = styled('div', {
  
  ' img':{
    borderTopLeftRadius: '$4',
    borderTopRightRadius: '$4',
    width: '100%',
  }
})
const TextDiv = styled('div', {
  padding: '$16',
  ' h2':{
    fontWeight: 'bold',
  },
  ' h5':{
    color: '$textColors$disabled',
    ' span':{
      
    },
    ' a':{
      color: '$link',
    },
  },
  ' p':{
    '&.price-title':{
      marginTop: '$12',
      color: '$link',
    },
    color: '$textColors$disabled',
  },
  ' .btn-buy':{
    marginTop: '$12',
    padding: '$10 $12',
    fontWeight: 'normal',
  }
})
const PriceDiv = styled('div', {
  display: 'flex',
  gap: '$5',
  alignItems: 'center',
  ' .token-balance': {
    fontWeight: 'bold',
    fontSize: '$1'
  },
  ' .nft-price': {
    color: '$textColors$disabled',
    paddingTop: '$2'
  }
})