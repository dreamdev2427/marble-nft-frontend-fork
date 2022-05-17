import * as React from "react";
import { styled } from 'components/theme'
import { NftInfo } from "services/nft/type";
import { IconWrapper } from 'components/IconWrapper'
import { Credit } from 'icons'


interface NftCardProps {
  readonly nft: NftInfo;
}

export function NftPrice({ nft }: NftCardProps): JSX.Element {
  return (
    <PriceDiv>
      <img className="token-icon" src="/nft/ether.png"/>
      <span className="token-balance">{nft.price}</span>
      <span className="nft-price">(${nft.price})</span>
    </PriceDiv>
  );
}

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