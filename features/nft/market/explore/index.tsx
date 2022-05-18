import * as React from "react"
import { useCallback, useEffect, useState } from "react";
import Link from 'next/link'
import { Button } from 'components/Button'
import { styled } from 'components/theme'


import { CategoryTab, NftCollectionTable } from "components/NFT";
import {
  NftInfo,
  NftCategory,
  NftCollection,
} from "services/nft";
import { NftCard } from "components/NFT"
import { config } from "services/config";

const pageSize = 15;
export const Explore = () => {
  const [nftcategories, setNftCategories] = useState<NftCategory[]>(
    []
  )
  const [nftcollections, setNftCollections] = useState<NftCollection[]>(
    []
  )
  const [activeCategoryId, setActiveCategoryId] = useState(0)

  useEffect(() => {
    (async () => {
      let res_categories = await fetch(process.env.NEXT_PUBLIC_CATEGORY_URL)
      let categories = await res_categories.json()
      setNftCategories(categories.categories)
      let res_collections = await fetch(process.env.NEXT_PUBLIC_COLLECTION_META_URL)
      let collections = await res_collections.json()
      setNftCollections(collections.collections)
    })();

  }, [])

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

