import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { styled } from 'components/theme'
import { Dialog, StyledCloseIcon } from 'components/Dialog'
import { Text } from 'components/Text'
import { Button } from 'components/Button'
import { DateRange } from "rsuite/DateRangePicker"
import { IconWrapper } from 'components/IconWrapper'
import { NftPrice } from 'components/NFT/nft-card/price'
import { User, CopyNft, Heart, Clock, Package, Credit } from 'icons'
import { useHistory, useParams } from "react-router-dom";
import Link from 'next/link'
import {
  NftInfo,
  CW721,
  Collection,
  Market,
  useSdk
} from "services/nft"
import { walletState } from 'state/atoms/walletAtoms'
import { useRecoilValue } from 'recoil'
import {
  ChakraProvider, 
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  Image,
  Select
} from '@chakra-ui/react'
import DatePicker from 'rsuite/DatePicker';

interface DetailParams {
  readonly collectionId: string
  readonly id: string
}
const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''
interface CollectionToken {
  readonly name: string
  readonly symbol: string
  readonly logoUri: string
}
let today = new Date()
type OfferDialogProps = {
  isShowing: boolean
  onRequestClose: () => void
  collectionId: string
  id: string
}

export const OfferDialog = ({ 
  isShowing,
  onRequestClose,
  collectionId, 
  id
}:OfferDialogProps) => {
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [nft, setNft] = useState<NftInfo>(
    {'tokenId': id, 'address': '', 'image': '', 'name': '', 'user': '', 'price': '0', 'total': 2, 'collectionName': "", 'symbol': 'MARBLE' }
  )
  const [collectionTokens, setCollectionTokens] = useState<CollectionToken[]>([])
  const [price, setPrice] = useState(0)
  const [fee, setFee] = useState(1)
  const [supply, setSupply] = useState(0)
  const [sellType, setSellType] = useState("fixed")
  const [method, setMethod] = useState("")
  const [quantity, setQuantity] = useState(1)

  const [duration, setDuration] = useState<DateRange>([today, new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)])
  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }
  const handleMethodChange = (event) => {
    setMethod(event.target.value)
  }
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
  }

  const loadNft = useCallback(async () => {
    if (!client) return
    if (collectionId === undefined || collectionId == "[collection]" || id === undefined || id == "[id]")
      return false
    console.log("IDS:", collectionId, id)
    const marketContract = Market(PUBLIC_MARKETPLACE).use(client)
    let collection = await marketContract.collection(parseInt(collectionId))
    console.log("collection", collection)
    let ipfs_collection = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + collection.uri)
    let res_collection = await ipfs_collection.json()
    console.log("Res collection:", res_collection)
    const cw721Contract = CW721(collection.cw721_address).use(client)
    let nftInfo = await cw721Contract.nftInfo(id)
    let ipfs_nft = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + nftInfo.token_uri)
    let res_nft = await ipfs_nft.json()
    
    const collectionContract = Collection(collection.collection_address).use(client)
    let price:any = await collectionContract.getPrice([parseInt(id)])
    console.log("price", price)
    res_nft.price = price.prices[0].price
    let uri = res_nft.uri
    if (uri.indexOf("https://") == -1){
      uri = process.env.NEXT_PUBLIC_PINATA_URL + res_nft.uri
    }
    console.log("collection", res_collection)
    setNft({'tokenId': id, 'address': '', 'image': uri, 'name': res_nft.name, 'user': res_nft.owner, 'price': res_nft.price, 'total': 2, 'collectionName': res_collection.name, 'symbol': res_collection.tokens[0]})
    setSupply(res_collection.supply==undefined?2:parseInt(res_collection.supply))
    console.log("supply:", res_collection.supply)
    setFee(res_collection.earningFee)
    const response = await fetch(process.env.NEXT_PUBLIC_COLLECTION_TOKEN_LIST_URL)
    const collectionTokenList = await response.json()
    setCollectionTokens(collectionTokenList.tokens)
  
  }, [client])

  useEffect(() => {
    
    loadNft()
  }, [loadNft, collectionId, id]);

  useEffect(() => {
    console.log("duration:", duration)
  }, [duration]);

  return (
    <ChakraProvider>
      <Dialog isShowing={isShowing} onRequestClose={onRequestClose} kind="blank">
        <StyledCloseIcon onClick={onRequestClose} offset={19} size="16px" />
        <StyledDivForContent>
          <Text
            variant="header"
          >
            Make an offer
          </Text>
          
          <ItemDiv>
            <h4>Quantity</h4>
            <Input
                  type='number'
                  placeholder=''
                  value={quantity} onChange={handleQuantityChange}
                />
          </ItemDiv>

          <ItemDiv>
            <h4>Price per item</h4>
            <InputGroup size='sm'>
              <InputLeftAddon 
                children={collectionTokens.length > 0 && 
                  collectionTokens.filter((token: any) =>
                    token.symbol.toLowerCase() == (nft.symbol.toLowerCase())
                  ).map((token, idx) => (
                    <TokenContainer>
                    <Image alt="Token Icon" className="token-icon" src={collectionTokens[idx].logoUri}/>{token.name}
                    </TokenContainer>
                  ))} 
              />
              <Input placeholder='Amount' />
              <InputRightAddon children='$0.00' />
            </InputGroup>
          </ItemDiv>
          <ItemDiv>
            <h4>Offer Expiration</h4>
            <DatePicker
              format="yyyy-MM-dd HH:mm"
              ranges={[
                {
                  label: 'Now',
                  value: new Date()
                }
              ]}
            />        
          </ItemDiv>
          <ActionContainer>
            <Button 
            >
              Confirm checkout
            </Button>
          </ActionContainer>
        </StyledDivForContent>
        
        
      </Dialog>  
    </ChakraProvider>
  );
}
const Nft = styled('div', {
  display: 'flex',
})
const StyledDivForContent = styled('div', {
  padding: '0px $14',
  variants: {},
  'h4':{
    fontWeight: 'bold'
  }
})
const ItemHeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: '$borderWidths$1 solid $borderColors$default',
  marginTop: '$16'
})
const ItemDiv = styled('div', {
  display: 'flex',
  padding: '$8 0',
  gap: '$4',
  flexDirection: 'column',
})
const TokenContainer = styled('div', {
  display: 'flex',
  gap: '$4',
  'img':{
    width: '$6',
  }
})
const NftMainContainer = styled('div', {
  'img':{
    width: '$11',
    border: '$borderWidths$1 solid $borderColors$default',
    borderRadius: '$2'
  }
})
const NftInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  

})
const NftPriceContainer = styled('div', {
  marginLeft: 'auto',
  '.token':{
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    textAlign: 'right',
    'img':{
      width: '$6'
    }
  },
  'p':{
    textAlign: 'right'
  }
  
})
const ItemFooterDiv = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: '$borderWidths$1 solid $borderColors$default',
  paddingTop: '$8'
})
const ActionContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  margin: '$10'
})