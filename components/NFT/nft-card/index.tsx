import {
  Image
} from "@chakra-ui/react";
import * as React from "react";
import { styled } from 'components/theme'
import { NftInfo } from "services/nft/type";
import { Button } from 'components/Button'
import { IconWrapper } from 'components/IconWrapper'
import { Credit } from 'icons'
import { NftPrice } from './price'
import Link from 'next/link'
interface NftCardProps {
  readonly nft: NftInfo;
}

export function NftCard({ nft }: NftCardProps): JSX.Element {
  return (
    <NftCardDiv className="nft-card">
      <ImgDiv className="nft-img-url">
        <Image src={nft.image} alt="NFT Image"/>
      </ImgDiv>
      <TextDiv className="nft-card-info">
        <h2>{nft.name}</h2>
        <h5>{nft.collectionName}</h5>
        <p className="price-title">Current Price</p>
        <NftPrice nft={nft}/>
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
