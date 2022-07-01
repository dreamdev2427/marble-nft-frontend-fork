import * as React from "react"
import { useCallback, useState, useEffect } from "react"
import { Button } from 'components/Button'
import { styled } from 'components/theme'
import { IconWrapper } from 'components/IconWrapper'
import { Activity, Grid, Search, ColumnBig, ColumnSmall, Sidebar, ArrowLeft } from 'icons'
import { CollectionFilter } from "./filter"
import { NftTable } from "components/NFT"

import { useRecoilValue } from 'recoil'
import { NftInfo, CW721, Marble, useSdk } from 'services/nft'
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
} from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux"
import { State } from 'store/reducers'

import { NFT_COLUMN_COUNT, UI_ERROR, PROFILE_STATUS, FILTER_STATUS_TXT } from "store/types"

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721_CONTRACT || ''
const PUBLIC_CW721_OWNER = process.env.NEXT_PUBLIC_CW721_OWNER || ''
export const ProfileTab = ({index}) => {
  return (
    <TabWrapper>
      <Tab>
        <Button className={`tab-link ${index==0?'active':''}`}
            as="a"
            variant="ghost"
          >
            Owned
        </Button>
      </Tab>
      <Tab>
        <Button className={`tab-link ${index==1?'active':''}`}
            as="a"
            variant="ghost"
          >
            Created
        </Button>
      </Tab>
      <Tab className="hide">
        <Button className={`tab-link ${index==2?'active':''}`}
            as="a"
            variant="ghost"
          >
            Favorite
        </Button>
      </Tab>
      <Tab className="hide">
        <Button className={`tab-link ${index==3?'active':''}`}
            as="a"
            variant="ghost"
          >
            Activity
        </Button>
      </Tab>
      <Tab className="hide">
        <Button className={`tab-link ${index==4?'active':''}`}
            as="a"
            variant="ghost"
          >
            Offers
        </Button>
      </Tab>
    </TabWrapper>
  )
}
let nftCurrentIndex = 0
let collectionSlug = ""
export const MyCollectedNFTs = () => {
  const pageCount = 10
  const [isCollapse, setCollapse] = useState(false)
  const [isMobileFilterCollapse, setMobileFilterCollapse] = useState(true)
  const [isLargeNFT, setLargeNFT] = useState(true)
  const [nfts, setNfts] = useState<NftInfo[]>(
    []
  )
  const [filterCount, setFilterCount] = useState(0)
  const [searchVal, setSearchVal] = useState("")
  const [hasMore, setHasMore] = useState(false)

  const dispatch = useDispatch()
  const uiListData = useSelector((state: State) => state.uiData)
  const { nft_column_count } = uiListData

  const profileData = useSelector((state: State) => state.profileData)
  const { profile_status } = profileData
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [tokens, setNFTIds] = useState([])

  const closeFilterStatusButton = (fstatus) => {
    profile_status.splice(profile_status.indexOf(fstatus), 1)
    //setProfileData(PROFILE_STATUS, profile_status)
    dispatch(
      {
        type: PROFILE_STATUS,
        payload: profile_status,
      }
    )
    return true
  }
  const closeFilterAllStatusButtons = () => {
    //setProfileData(PROFILE_STATUS, [])
    dispatch(
      {
        type: PROFILE_STATUS,
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



  const loadNfts = useCallback(async (pstatus) => {
    if (!client) return
    //console.log("Param", pstatus)
    //console.log("effect profile status:", profile_status)

    const marbleContract = Marble(PUBLIC_CW721_CONTRACT).use(client)
    const contractConfig = await marbleContract.getConfig()
    // console.log("cw721:", contractConfig.cw721_address)
    const contract = CW721(contractConfig.cw721_address).use(client)
    // console.log("My Address:", address)
    //const nftTokens = await contract.tokens(PUBLIC_CW721_OWNER)
    const nftTokens = await contract.tokens(address)
    console.log("nftTokens:", nftTokens.tokens.length)
    if (nftTokens.tokens.length == 0){
      setNfts([])
      setHasMore(false)
      return;
    }
      
    console.log(await contract.nftInfo(nftTokens.tokens[0]))
    console.log(await contract.ownerOf(nftTokens.tokens[0]))
    setNFTIds(nftTokens.tokens)
    collectionSlug = "marblenauts"
    let res_collection = await fetch(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/Collection Metadata.json')
    let collection = await res_collection.json()
    let res_traits = await fetch(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/all-traits.json')
    let all_traits = await res_traits.json()
    let traits = []

    for (let i = 0; i < nftTokens.tokens.length; i++){
      if (pstatus.length == 0
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Accessories) != -1
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Background) != -1
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Clothes) != -1
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Earring) != -1
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Expressions) != -1
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Eyes) != -1
        || pstatus.indexOf(all_traits[parseInt(nftTokens.tokens[i])].Helmet) != -1
      ){
        traits.push(all_traits[parseInt(nftTokens.tokens[i])])
      }
    }
    let nftsForProfile = []
    let hasMoreFlag = false
    let i = 0
    let nftIndex = 0
    let isPageEnd = false
    if (traits == undefined || traits.length == 0){
      isPageEnd = true
    }
    while (!isPageEnd){
      let nftPath = ""
      //if (fs.existsSync(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId)) {
      if (traits[i].tokenId > 2){
        nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/' + traits[i].tokenId
      }else{
        nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/' + traits[i].tokenId + '.json'
      }
      if (nftPath != ""){
        let res_nft = await fetch(nftPath)
        let nft = await res_nft.json()
        if (searchVal == "" || nft.name.indexOf(searchVal) != -1){
          nftsForProfile.push({'tokenId': nft.tokenId, 'address': '', 'image': nft.image, 'name': nft.name, 'user': 'bbb', 'price': '8', 'total': 2, 'collectionName': collection.name})
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
    setNfts(nftsForProfile)
    setHasMore(hasMoreFlag)
  }, [client])

  useEffect(() => {
    console.log("ue profile status", profile_status)
    loadNfts(profile_status)
  }, [loadNfts, filterCount, searchVal])

  const getMoreNfts = async () => {
    collectionSlug = "marblenauts"
    let res_traits = await fetch(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/all-traits.json')
    let all_traits = await res_traits.json()
    let traits = []
    for (let i = 0; i < tokens.length; i++){
      if (profile_status.length == 0
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Accessories) != -1
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Background) != -1
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Clothes) != -1
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Earring) != -1
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Expressions) != -1
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Eyes) != -1
        || profile_status.indexOf(all_traits[parseInt(tokens[i])].Helmet) != -1
      ){
        traits.push(all_traits[parseInt(tokens[i])])
      }
    }
    let nftsForProfile = []
    let hasMoreFlag = false

    let i = nftCurrentIndex
    let nftIndex = 0
    let isPageEnd = false
    if (traits == undefined || i == traits.length){
      isPageEnd = true
    }
    while (!isPageEnd){
      let nftPath = ""
      //if (fs.existsSync(process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + name + '/' + traits[i].tokenId)) {
      if (traits[i].tokenId > 2){
        nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/' + traits[i].tokenId
      }else{
        nftPath = process.env.NEXT_PUBLIC_COLLECTION_URL_PREFIX + collectionSlug + '/' + traits[i].tokenId + '.json'
      }
      if (nftPath != ""){
        let res_nft = await fetch(nftPath)
        let nft = await res_nft.json()
        if (searchVal == "" || nft.name.indexOf(searchVal) != -1){
          nftsForProfile.push({'tokenId': nft.tokenId, 'address': '', 'image': nft.image, 'name': nft.name, 'user': 'bbb', 'price': '8', 'total': 2, 'collectionName': collectionSlug})
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
    setNfts((nft)=>[...nft, ...nftsForProfile])
    setHasMore(hasMoreFlag)
  }

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
            {/* <Select id='item_type' placeholder='Single Items'>
              <option>Single Items</option>
              <option>Bundles</option>
              <option>All Items</option>
            </Select>
            <Select id='sort_type' placeholder='Price: Low to High'>
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
          {profile_status.length != filterCount && setFilterCount(profile_status.length)}
          {profile_status.map(fstatus => (
            <Tag
              borderRadius='full'
              variant='solid'
              key={fstatus}
            >
              <TagLabel>{FILTER_STATUS_TXT[fstatus]}</TagLabel>
              <TagCloseButton onClick={()=>closeFilterStatusButton(fstatus)}/>
            </Tag>
          ))}
          {profile_status.length > 0 &&
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
          <NftTable data={nfts} id="0" type="sell"/>
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
  gap: '$4',
  margin: '$4 0',
  ' >span':{
    background: '$backgroundColors$primary',
    color: '$textColors$primary',
    borderRadius: '$3',
    padding: '$4',
    margin: '0 $2 $1 0',
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
