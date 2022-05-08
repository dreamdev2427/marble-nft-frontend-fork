import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from 'components/theme'
import { Link as ReactRouterLink, useHistory, useParams } from "react-router-dom";
import {
  NftInfo,
} from "services/nft"

interface DetailParams {
  readonly id: string;
}

export const NFTDetail = () => {
  const [nft, setNft] = useState<NftInfo>(
    {'tokenId': 'aaa1', 'address': '', 'image': '/nft/mynft.jpg', 'title': 'Paint Drop #3514(1 Paint)', 'user': 'bbb', 'price': '0.598', 'total': 2, 'collectionName': 'Fewocious x FewoWorld' }
  )
  return (
    <Nft>
        <NftUriTag>
          <img src={nft.image}/>
        </NftUriTag>
        <NftInfoTag>

        </NftInfoTag>
    </Nft>
  );
}
const Nft = styled('div', {

})
const NftUriTag = styled('div', {

})
const NftInfoTag = styled('div', {

})
