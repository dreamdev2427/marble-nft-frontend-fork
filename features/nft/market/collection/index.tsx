import * as React from "react"
import { useState } from "react";
import Link from 'next/link'
import { Button } from 'components/Button'
import { styled } from 'components/theme'
import { useRouter } from 'next/router'
import { IconWrapper } from 'components/IconWrapper'
import { Activity, Grid } from 'icons'
import { CollectionFilter } from "./filter";
import { NftSection } from "components/NFT";
import { Tab } from '@chakra-ui/react'

export const CollectionTab = ({index}) => {
  return (
    <TabWrapper>
      <Tab>
        <Button className={`tab-link ${index==0?'active':''}`}
            as="a"
            variant="ghost"
            iconLeft={<IconWrapper icon={<Grid />} />}
          >
            Items
        </Button>
      </Tab>
      <Tab>
        <Button className={`tab-link ${index==1?'active':''}`}
            as="a"
            variant="ghost"
            iconLeft={<IconWrapper icon={<Activity />} />}
          >
            Activity
        </Button>
      </Tab>
    </TabWrapper>
  )
}
export const Collection = () => {  
  const [isCollapse, setCollapse] = useState(false);
  return (
    <CollectionWrapper>
      <CollectionFilter isCollapse={isCollapse} setCollapse={setCollapse} />
      <NftList className={`${isCollapse?'collapse-close':'collapse-open'}`}>
        <NftSection/>
      </NftList>
    </CollectionWrapper>
  )
}

const CollectionWrapper = styled('div', {
  display: 'flex',
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
const TabWrapper = styled('div', {
  
  display: 'flex',
  justifyContent: 'center',
  ' .tab-link': {
    ' .active': {
      color: '$black',
    },
    borderBottomColor: '$textColors$primary',
    ' svg': {
      stroke: '$iconColors$primary'
    }
  }
})

const NftList = styled('div', {
  '&.collapse-open':{
    width: 'calc(100% - $25)',
  },
  '&.collapse-close':{
    width: 'calc(100% - $10)',
  }
})

