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
  
    
  const [nft, setNft] = useState<NftInfo>({'tokenId':'aaa', 'image': 'https://lh3.googleusercontent.com/19uIC4yYuJfgYmO1XkDGHHzTVtBH_g3-OznaetWDX5iy_BHzR5wPvL65urGT8uXWzvpADoODLmGVTGnNyAFbuKEB=w600', 'title': 'aaa', 'user': 'aaa', 'price': 'aaa', 'total': 1});
  const [nftcategories, setNftCategories] = useState<NftCategory[]>(
      [
        {'id': '1', 'url':'#', 'name':'All'}, 
        {'id': '2', 'url':'#2', 'name': 'Digital'}, 
        {'id': '3', 'url':'#3', 'name': 'Physical'},
        {'id': '4', 'url':'#4', 'name': 'Sport'},
        {'id': '5', 'url':'#5', 'name': 'Music'},
        {'id': '6', 'url':'#6', 'name': 'Music'},
        {'id': '7', 'url':'#7', 'name': 'Photography'},
        {'id': '8', 'url':'#8', 'name': 'Sports'},
        {'id': '9', 'url':'#9', 'name': 'Trading Cards'},
        {'id': '10', 'url':'#10', 'name': 'Utility'},
        {'id': '11', 'url':'#11', 'name': 'Virtual Worlds'}
      ]
    )
    const [nftcollections, setNftCollections] = useState<NftCollection[]>(
      [
        {'address': '', 'url': '', 'imgUrl': '/nft/nft.jpg', 'bannerUrl': '/nft/symbol.png', 'name': 'Rubber Duckz', 'symbol': 'RBD', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus pharetra, neque felis vitae arcu egestas risus. Lorem in tellus arcu a.', 'creator':'RubberDuckz'},
        {'address': '', 'url': '', 'imgUrl': '/nft/nft.jpg', 'bannerUrl': '/nft/symbol.png', 'name': 'Rubber Duckz', 'symbol': 'RBD', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus pharetra, neque felis vitae arcu egestas risus. Lorem in tellus arcu a.', 'creator':'RubberDuckz'},
        {'address': '', 'url': '', 'imgUrl': '/nft/nft.jpg', 'bannerUrl': '/nft/symbol.png', 'name': 'Rubber Duckz', 'symbol': 'RBD', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus pharetra, neque felis vitae arcu egestas risus. Lorem in tellus arcu a.', 'creator':'RubberDuckz'},
        {'address': '', 'url': '', 'imgUrl': '/nft/nft.jpg', 'bannerUrl': '/nft/symbol.png', 'name': 'Rubber Duckz', 'symbol': 'RBD', 'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus pharetra, neque felis vitae arcu egestas risus. Lorem in tellus arcu a.', 'creator':'RubberDuckz'},
      ]
    )
  
  return (
    <ExploreWrapper>
    <CategoryTab categories={nftcategories}/>
    
    <NftCollectionTable collections={nftcollections}/>
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
      ' a':{
        minWidth: '8%',
      }
    },
    '&.mobile-section': {
      ' a':{
        minWidth: '18%',
      }
    },
    ' a':{
      
      textAlign: 'center',
      paddingBottom: '$8',
      '&.active':{
        borderBottom: '4px solid $selected',
      }
    }
  }
})

