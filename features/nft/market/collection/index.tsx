import * as React from "react"
import { useCallback, useState, useEffect } from "react"
import { useRouter } from 'next/router'

import { Button } from 'components/Button'
import { styled } from 'components/theme'
import { IconWrapper } from 'components/IconWrapper'
import { Activity, Grid, Search, ColumnBig, ColumnSmall, Sidebar, ArrowLeft } from 'icons'
import { CollectionFilter } from "./filter"
import { NftTable } from "components/NFT"
import {
  NftInfo,
} from "services/nft"
import { useRecoilValue } from 'recoil'
import { CW721, Marble, useSdk } from 'services/nft'
import { walletState } from 'state/atoms/walletAtoms'
import InfiniteScroll from "react-infinite-scroll-component"
import { 
  ChakraProvider, 
  Tab, 
  Input, 
  InputGroup, 
  InputRightElement, 
  Select, 
  IconButton,
  Tag,
  TagLabel,
  TagCloseButton,
  filter,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux"
import { State } from 'store/reducers'
import { setUIData } from "store/actions/uiAction"
import { setFilterData } from "store/actions/filterAction"
import { NFT_COLUMN_COUNT, UI_ERROR, FILTER_STATUS, FILTER_STATUS_TXT } from "store/types"

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721_CONTRACT || ''
const PUBLIC_CW721_OWNER = process.env.NEXT_PUBLIC_CW721_OWNER || ''
export const CollectionTab = ({index}) => {
  
  return (
    <TabWrapper>
      <Tab>
        <Button className={`hide tab-link ${index==0?'active':''}`}
            as="a"
            variant="ghost"
            iconLeft={<IconWrapper icon={<Grid />} />}
          >
            Items
        </Button>
      </Tab>
      <Tab>
        <Button className={`hide tab-link ${index==1?'active':''}`}
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
let nftCurrentIndex = 0
export const Collection = () => {  
  
  const pageCount = 10
  const router = useRouter()
  const query = router.query
  const { asPath, pathname } = useRouter();
  const name = asPath.replace('/collection/', '')

  const [isCollapse, setCollapse] = useState(false)
  const [isMobileFilterCollapse, setMobileFilterCollapse] = useState(true)
  const [isLargeNFT, setLargeNFT] = useState(true)
  const [filterCount, setFilterCount] = useState(0)
  const [nfts, setNfts] = useState<NftInfo[]>(
    []
  )
  const [hasMore, setHasMore] = useState(false)

  const dispatch = useDispatch()
  const uiListData = useSelector((state: State) => state.uiData)
  const { nft_column_count } = uiListData
  
  const filterData = useSelector((state: State) => state.filterData)
  const { filter_status } = filterData
  const [searchVal, setSearchVal] = useState("")
  
  const closeFilterStatusButton = (fstatus) => {
    console.log(filter_status)
    filter_status.splice(filter_status.indexOf(fstatus), 1)
    //setFilterData(FILTER_STATUS, filter_status)
    dispatch(
      {
        type: FILTER_STATUS,
        payload: filter_status,
      }
    )
    return true
  }
  const closeFilterAllStatusButtons = () => {
    //setFilterData(FILTER_STATUS, [])
    dispatch(
      {
        type: FILTER_STATUS,
        payload: []
      }
    )
    return true
  }
  const handleSearch = (event) => {
    if (event.key.toLowerCase() === "enter") {
      setSearchVal(event.target.value)
    }
  }
  useEffect(() => {
    (async () => {
      console.log("name", name)
      if (name === undefined || name == "[name]")
        return false
      //getMoreNfts()
      setNfts([])
      console.log("filter_status:", filter_status)
      console.log("call effect nfts:", nfts.length)
      let res_traits = await fetch(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/all-traits.json')
      let all_traits = await res_traits.json()
      let traits = []
      for (let i = 0; i < all_traits.length; i++){
        if (filter_status.length == 0 
          || filter_status.indexOf(all_traits[i].Accessories) != -1
          || filter_status.indexOf(all_traits[i].Background) != -1
          || filter_status.indexOf(all_traits[i].Clothes) != -1
          || filter_status.indexOf(all_traits[i].Earring) != -1
          || filter_status.indexOf(all_traits[i].Expressions) != -1
          || filter_status.indexOf(all_traits[i].Eyes) != -1
          || filter_status.indexOf(all_traits[i].Helmet) != -1
        ){
          traits.push(all_traits[i])
        }
      }
      //let traits = await res_traits.json()
      let nftsForCollection = []
      let hasMoreFlag = false
      let i = 0
      let nftIndex = 0
      let isPageEnd = false
      if (traits.length == 0)
        isPageEnd = true
      while (!isPageEnd){
        let nftPath = ""
        //if (fs.existsSync(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId)) {
        if (traits[i].tokenId > 2){
          nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId
        }else{
          nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId + '.json'
        }
        if (nftPath != ""){
          let res_nft = await fetch(nftPath)
          let nft = await res_nft.json()
          if (searchVal == "" || nft.name.indexOf(searchVal) != -1){
            nftsForCollection.push({'tokenId': nft.tokenId, 'address': '', 'image': nft.image, 'name': nft.name, 'user': 'bbb', 'price': '8', 'total': 2, 'collectionName': name})
            hasMoreFlag = true
            nftIndex++
            if (nftIndex == pageCount){
              isPageEnd = true
            }
          }
        }
        i++;
        if (i == traits.length){
          isPageEnd = true
        }
      }
      nftCurrentIndex = i
      console.log("Effect nftCurrentIndex", nftCurrentIndex)
      setNfts(nftsForCollection)
      setHasMore(hasMoreFlag)
    })();

  }, [name, filterCount, searchVal])

  const getMoreNfts = async () => {
    if (name === undefined || name == "[name]" || !hasMore)
      return false
    let res_traits = await fetch(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/all-traits.json')
    let all_traits = await res_traits.json()
    let traits = []
    for (let i = 0; i < all_traits.length; i++){
      if (filter_status.length == 0 
        || filter_status.indexOf(all_traits[i].Accessories) != -1
        || filter_status.indexOf(all_traits[i].Background) != -1
        || filter_status.indexOf(all_traits[i].Clothes) != -1
        || filter_status.indexOf(all_traits[i].Earring) != -1
        || filter_status.indexOf(all_traits[i].Expressions) != -1
        || filter_status.indexOf(all_traits[i].Eyes) != -1
        || filter_status.indexOf(all_traits[i].Helmet) != -1
      ){
        traits.push(all_traits[i])
      }
    }
    let nftsForCollection = []
    let hasMoreFlag = false

    let i = nftCurrentIndex
    let nftIndex = 0
    let isPageEnd = false
    if (i == traits.length){
      isPageEnd = true
    }
    while (!isPageEnd){
      let nftPath = ""
      //if (fs.existsSync(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId)) {
      if (traits[i].tokenId > 2){
        nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId
      }else{
        nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId + '.json'
      }
      if (nftPath != ""){
        let res_nft = await fetch(nftPath)
        let nft = await res_nft.json()
        if (searchVal == "" || nft.name.indexOf(searchVal) != -1){
          nftsForCollection.push({'tokenId': nft.tokenId, 'address': '', 'image': nft.image, 'name': nft.name, 'user': 'bbb', 'price': '8', 'total': 2, 'collectionName': name})
          hasMoreFlag = true
          nftIndex++
          if (nftIndex == pageCount){
            isPageEnd = true
          }
        }
      }
      i++;
      if (i == traits.length){
        isPageEnd = true
      }
    }
    nftCurrentIndex = i
    console.log("More nftCurrentIndex", nftCurrentIndex)
    setNfts((nft)=>[...nft, ...nftsForCollection])
    setHasMore(hasMoreFlag)
  }

  useEffect(() => {
    if (isLargeNFT){
      if (nft_column_count <= 3)
        return
      //setUIData(NFT_COLUMN_COUNT, nft_column_count - 1)
      dispatch(
        {
          type: NFT_COLUMN_COUNT,
          payload: nft_column_count - 1
        }
      )
    }else{
      if (nft_column_count >= 5)
        return
      //setUIData(NFT_COLUMN_COUNT, nft_column_count +1)
      dispatch(
        {
          type: NFT_COLUMN_COUNT,
          payload: nft_column_count + 1
        }
      )
    }
    
  }, [dispatch, isLargeNFT])

  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [tokens, setNFTIds] = useState<number[]>([])

  return (
    <CollectionWrapper>
      <CollectionFilter isCollapse={isCollapse} setCollapse={setCollapse} />
      <NftList className={`${isCollapse?'collapse-close':'collapse-open'}`}>
        <SearchItem className="search-item">
          <ChakraProvider>
            <InputGroup >
              <Input
                pr='48px'
                type='text'
                placeholder='Search'
                onKeyDown={handleSearch} 
              />
              <InputRightElement width='48px'>
                <IconWrapper icon={<Search />} />
              </InputRightElement>
            </InputGroup>
            {/* <Select id='item_type'>
              <option>Single Items</option>
              <option>Bundles</option>
              <option>All Items</option>
            </Select>
            <Select id='sort_type'>
              <option>Recently Listed</option>
              <option>Recently Created</option>
              <option>Recently Sold</option>
              <option>Recently Received</option>
              <option>Ending Soon</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Highest Last Sale</option>
              <option>Most Viewed</option>
              <option>Most Favorited</option>
              <option>Oldest</option>
            </Select> */}
            <ColumnCount className="desktop-section">
              <IconButton 
                className={`column-type ${isLargeNFT?'active':''}`} 
                aria-label='Search database' 
                icon={<ColumnBig />} 
                onClick={() => {
                  if (isLargeNFT)
                    return
                  setLargeNFT(!isLargeNFT)
                  return false
                }}
              />
              <IconButton 
                className={`column-type ${!isLargeNFT?'active':''}`} 
                aria-label='Search database' 
                icon={<ColumnSmall />} 
                onClick={() => {
                  if (!isLargeNFT)
                    return
                  setLargeNFT(!isLargeNFT)
                  return false
                }}
              />
            </ColumnCount>
            <FilterSection className="mobile-section filter-section">
              <Button className="filter-header"
                variant="primary"
                iconRight={isMobileFilterCollapse && <IconWrapper icon={<ArrowLeft />}/> || !isMobileFilterCollapse && <IconWrapper icon={<Sidebar />}/> }
                onClick={() => {
                  setMobileFilterCollapse(!isMobileFilterCollapse)
                  return false
                }}
              >
                  Quick Filters
              </Button>
              {!isMobileFilterCollapse &&
                <CollectionFilter isCollapse={isCollapse} setCollapse={setCollapse} />
              }
            </FilterSection>
          </ChakraProvider>
        </SearchItem>
        <FilterItem>
          {tokens.map(token => (
            {token}
          ))}
          {filter_status.length != filterCount && setFilterCount(filter_status.length)}
          {filter_status.map(fstatus => (
            <Tag
              borderRadius='full'
              variant='solid'
              key={fstatus}
            >
              <TagLabel>{FILTER_STATUS_TXT[fstatus]}</TagLabel>
              <TagCloseButton onClick={()=>closeFilterStatusButton(fstatus)}/>
            </Tag>
          ))}
          {filter_status.length > 0 &&
            <Tag
              borderRadius='full'
              variant='solid'
            >
              <TagLabel>Clear All</TagLabel>
              <TagCloseButton onClick={()=>closeFilterAllStatusButtons()}/>
            </Tag>
          }
        </FilterItem>
        <InfiniteScroll
          dataLength={nfts.length}
          next={getMoreNfts}
          hasMore={hasMore}
          loader={<h3> Loading...</h3>}
          endMessage={<h4></h4>}
        >
        <NftTable data={nfts} collectionName={name}/>
        </InfiniteScroll>
      </NftList>
    </CollectionWrapper>
  )
}

const CollectionWrapper = styled('div', {
  display: 'flex',
  ' .category-menus':{
    borderBottom: '$borderWidths$1 solid $borderColors$default',
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
  padding: '$16 0 0 $16',
  '&.collapse-open':{
    width: 'calc(100% - $25)',
  },
  '&.collapse-close':{
    width: 'calc(100% - $10)',
  },
  ' .nft-table':{
    display: 'flex',
    gap: '$16',
  }
})

const SearchItem = styled('div', {
  display: 'flex',
  gap: '$6',
  ' .chakra-input':{
    height: '$22',
    border: '$borderWidths$1 solid $borderColors$default',
  },
  ' .chakra-input__right-element':{
    height: '$22',
  },
  ' .chakra-select__wrapper':{
    width: '$26',
    ' select':{
      border: '$borderWidths$1 solid $borderColors$default',
      height: '$22',
      width: '$26',
    }
  }
  
})
const FilterItem = styled('div', {
  display: 'block',
  margin: '$4 0',
  ' >span':{
    background: '$backgroundColors$primary',
    color: '$textColors$primary',
    borderRadius: '$3',
    padding: '$4',
    margin: '$2',
  }
})
const ColumnCount = styled('div', {
  display: 'flex',
  gap: '$2',
  ' button':{
    height: '$22',
    background: '$backgroundColors$main',
    border: '$borderWidths$1 solid $borderColors$default',
    ' svg': {
      ' rect': {
        fill: '$iconColors$disabled'
      }
    },
    '&.active':{
      ' svg': {
        ' rect': {
          fill: '$iconColors$primary'
        }
      } 
    }
  }
})
const FilterSection = styled('div', {
  display: 'flex',
})