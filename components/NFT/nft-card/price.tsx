import * as React from "react";
import { styled } from 'components/theme'
import { NftInfo } from "services/nft/type";
import { IconWrapper } from 'components/IconWrapper'
import { Credit } from 'icons'
import { useTokenDollarValueQuery } from 'hooks/useTokenDollarValue'
import {
  dollarValueFormatterWithDecimals,
  formatTokenBalance,
  valueFormatter18,
  valueFormatter6,
} from 'util/conversion'

interface NftCardProps {
  readonly nft: NftInfo;
}

export function NftPrice({ nft }: NftCardProps): JSX.Element {
  const [tokenDollarPrice] = useTokenDollarValueQuery(["JUNO"])
  return (
    <PriceDiv>
      <img className="token-icon" src="https://raw.githubusercontent.com/osmosis-labs/assetlists/main/images/juno.png"/>
      <span className="token-balance">{nft.price} JUNO</span>
      <span className="nft-price">(${dollarValueFormatterWithDecimals(tokenDollarPrice * nft.price)})</span>
    </PriceDiv>
  );
}

const PriceDiv = styled('div', {
  display: 'flex',
  gap: '$5',
  alignItems: 'center',
  ' .token-icon': {
    height: '$8',
  },
  ' .token-balance': {
    fontWeight: 'bold',
    fontSize: '$1'
  },
  ' .nft-price': {
    color: '$textColors$disabled',
    paddingTop: '$2'
  }
})