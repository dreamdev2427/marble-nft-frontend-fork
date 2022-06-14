import * as React from "react"
import { useCallback, useEffect, useState } from "react";
import Link from 'next/link'
import { Button } from 'components/Button'
import { styled } from 'components/theme'
import useSWR from 'swr';


import { CategoryTab, NftCollectionTable } from "components/NFT";
import {
  NftInfo,
  NftCategory,
  NftCollection,
} from "services/nft";
import { NftCard } from "components/NFT"
import { config } from "services/config";
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { walletState, WalletStatusType } from 'state/atoms/walletAtoms'
import { Market, useSdk, Collection } from 'services/nft'

const pageSize = 15;
const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''

export const Explore = () => {
  //const fetcher = (url) => fetch(url).then((res) => res.json());
  //const { data } = useSWR('/api/readfiles', fetcher);
  const data = ["marblenauts"]
  const [nftcategories, setNftCategories] = useState<NftCategory[]>(
    []
  )
  const [nftcollections, setNftCollections] = useState<NftCollection[]>(
    []
  )
  const [activeCategoryId, setActiveCategoryId] = useState(0)
  const { client } = useSdk()
  //const { address, client: signingClient } = useRecoilValue(walletState)
  
  useEffect(() => {
    (async () => {
      if (!client){
        return;
      }
      
      const marketContract = Market(PUBLIC_MARKETPLACE).use(client)
      let collectionList = await marketContract.listCollections()
      console.log("collection1:", collectionList.length)
      let res_categories = await fetch(process.env.NEXT_PUBLIC_CATEGORY_URL)
      let categories = await res_categories.json()
      setNftCategories(categories.categories)
      let collections = []
      if (data != undefined){
        for (let i = 0; i < collectionList.length; i++){
          let res_collection:any = {}
          let ipfs_collection = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + collectionList[i].uri)
          res_collection = await ipfs_collection.json()
          let collection_info:any = {}
          collection_info.name = res_collection.name
          collection_info.description = res_collection.description
          collection_info.image = process.env.NEXT_PUBLIC_PINATA_URL + res_collection.logo
          collection_info.banner_image = process.env.NEXT_PUBLIC_PINATA_URL + res_collection.logo
          collection_info.slug = res_collection.slug
          collection_info.creator = res_collection.owner??''
          collection_info.cat_ids = res_collection.category
          console.log("collection_info", collection_info)
          collections.push(collection_info)
        }
      }
      
      setNftCollections(collections)
      
    })();

  }, [client])

  return (
    <ExploreWrapper>
    <CategoryTab categories={nftcategories} activeCategoryId={activeCategoryId} setActiveCategoryId={setActiveCategoryId}/>
    
    <NftCollectionTable collections={nftcollections} activeCategoryId={activeCategoryId} />
    </ExploreWrapper>
  );
}


const ExploreWrapper = styled('div', {
  ' .category-menus':{
    borderBottom: '1px solid $borderColors$default',
    display: 'flex',
    justifyContent: 'space-between',
    overFlow: 'hidden',
    '&.desktop-section': {
      ' >span':{
        minWidth: '8%',
        textAlign: 'center',
        paddingBottom: '$8',
        cursor: 'pointer',
        '&.active':{
          borderBottom: '4px solid $selected',
        }
      }
    },
    '&.mobile-section': {
      ' >span':{
        minWidth: '18%',
        textAlign: 'center',
        paddingBottom: '$8',
        cursor: 'pointer',
        '&.active':{
          borderBottom: '4px solid $selected',
        }
      }
    },
  }
})

