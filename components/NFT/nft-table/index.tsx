import * as React from "react";
import Link from 'next/link'
import {
  LinkBox,
  LinkOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import { NftCard } from "../nft-card";
import { NftInfo } from "services/nft";
import { styled } from 'components/theme'

interface NftTableProps {
  readonly data: NftInfo[];
}

export function NftTable({ data }: NftTableProps) {
  return (
    <NftGrid className="column3">
      {data.map(nft => (
        <LinkBox as="picture" key={nft.tokenId}
          transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s"
          _hover={{
            transform: "scale(1.05)"
          }}>
          <a href="/">
          <NftCard nft={nft} />
          </a>  
        </LinkBox>
      ))}
    </NftGrid>
  );
}
const NftGrid = styled('div', {
  display: 'grid',
  gap: '$16',
  margin: '$16 0',
  '&.column3':{
    'gridTemplateColumns': '1fr 1fr 1fr',
  },
  '&.column4':{
    'gridTemplateColumns': '1fr 1fr 1fr 1fr',
  },
  '&.column5':{
    'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr',
  },
  '&.column6':{
    'gridTemplateColumns': '1fr 1fr 1fr 1fr 1fr 1fr',
  }
})
