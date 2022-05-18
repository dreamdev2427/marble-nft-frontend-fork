import * as React from "react";
import { useState } from "react";
import Link from 'next/link'
import { NftCollection } from "services/nft";
import { styled } from 'components/theme'

interface NftCollectionProps {
  readonly collections: NftCollection[];
  readonly activeCategoryId: number;
}

export function NftCollectionTable({ collections, activeCategoryId }: NftCollectionProps): JSX.Element {
  return (
    <>
      <CollectionsDiv className="collections">
      {collections.map((collection, idx) => (
        (activeCategoryId == 0 || collection.cat_ids.split(",").indexOf(activeCategoryId.toString()) != -1) && (
          <Link href={`/collection/${collection.name}`} passHref key={idx}>
          <CollectionDiv className="collection" key={idx}>
            <ImgDiv>
            <img className="nft-img-url" src={collection.image}/>
            </ImgDiv>
            <BannerDiv>
            <img className="nft-banner-url" src={collection.banner_image}/>
            </BannerDiv>
            <TextDiv>
            <h2>{collection.name}</h2>
            <h5><span>by</span> <a href="#">{collection.creator}</a></h5>
            <p>{collection.description}</p>
            </TextDiv>
          </CollectionDiv>
          </Link>
        )
      ))}
      </CollectionsDiv>
    </>
  );
}

const CollectionsDiv = styled('div', {

})
const CollectionDiv = styled('div', {
  border: '1px solid $borderColors$default',
  borderRadius: '$4',
  boxSizing: 'border-box',
  boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
  cursor: 'pointer',
})

const ImgDiv = styled('div', {
  
  ' img':{
    borderTopLeftRadius: '$4',
    borderTopRightRadius: '$4',
  }
})
const BannerDiv = styled('div', {
    marginTop: '-44px',
    marginLeft: '$16',
    borderRadius: '50%',
    background: '#fff',
    border: '1px solid #ccc',
    display: 'inline-block',
    height: '$24',
    width: '$24',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    ' img':{
      borderRadius: '50%',
      width: '$23',
      height: '$23',
      padding: '$1',
      alignItems: 'center',
      marginTop: '$1',
    }
})
const TextDiv = styled('div', {
  padding: '0 $16 $16 $16',
  ' h2':{
    
  },
  ' h5':{
    ' span':{
      color: '$textColors$secondary',
    },
    ' a':{
      color: '$link',
    },
  },
  ' p':{
    color: '$textColors$secondary',
  }
  
})