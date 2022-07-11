import * as React from "react"
import { useCallback, useEffect, useState } from "react"
import { styled } from 'components/theme'
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
  Input,
  Image,
  Select
} from '@chakra-ui/react'
import DateRangePicker from 'rsuite/DateRangePicker';

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
export const NFTSell = ({ collectionId, id}) => {
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
    setSupply(res_collection.supply==undefined?1:parseInt(res_collection.supply))
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
      <Nft className="nft-info">
        <NftInfoTag className="nft-detail">
          <h2 className="sale-title">List item for sale</h2>
          {supply > 1 &&
          <>
            <h4>Quantity</h4>
            <QuantityContainer>
            <Input
                  type='number'
                  placeholder=''
                  value={quantity} onChange={handleQuantityChange}
                />
            <p>{supply} avaiable</p>
            </QuantityContainer>
          </>
          }
          {supply == 1 &&
          <>
            <h4>Type</h4>
            <ButtonGroup>
              <Button 
                className={`fixed-btn ${sellType=='fixed'?'active':''}`}
                onClick={(e) => {
                  setSellType("fixed")
                }}
              >
                Fixed Price
              </Button>
              <Button 
                className={`auction-btn ${sellType=='auction'?'active':''}`}
                onClick={(e) => {
                  setSellType("auction")
                }}
              >
                Timed Auction
              </Button>
            </ButtonGroup>
          </>
          }
          {sellType=='fixed' &&
            <>
            <h4>Price</h4>
            <PriceContainer>
            {collectionTokens.length > 0 && 
              collectionTokens.filter((token: any) =>
                token.symbol.toLowerCase() == (nft.symbol.toLowerCase())
              ).map((token, idx) => (
              <Button
                key={`token${idx}`}
                variant="secondary"
                
              >
                <Image alt="Token Icon" className="token-icon" src={collectionTokens[idx].logoUri}/>{token.name}
              </Button>
              ))}
              <Input
                  type='number'
                  placeholder=''
                  value={price} onChange={handlePriceChange}
                />
            </PriceContainer>
            </>
          }
          {sellType=='auction' &&
          <>
            <h4>Method</h4>
            <Select id='method_id' value={method} onChange={handleMethodChange}>
              <option value=''></option>
              <option value='0'>Sell with declining price</option>
            </Select>
            <h4>Starting price</h4>
            <PriceContainer>
            {collectionTokens.length > 0 && 
              collectionTokens.filter((token: any) =>
                token.symbol.toLowerCase() == (nft.symbol.toLowerCase())
              ).map((token, idx) => (
              <Button
                key={`token${idx}`}
                variant="secondary"
                
              >
                <Image alt="Token Icon" className="token-icon" src={collectionTokens[idx].logoUri}/>{token.name}
              </Button>
              ))}
              <Input
                  type='number'
                  placeholder=''
                  value={price} onChange={handlePriceChange}
                />
            </PriceContainer>
          </>
          }
          <h4>Duration</h4>
          <DurationContainer className="field">
          <DateRangePicker format="yyyy-MM-dd hh:mm aa" showMeridian value={duration} onChange={setDuration} />
          </DurationContainer>
          {sellType=='auction' &&
          <>
            <h4>Ending price</h4>
            <PriceContainer>
            {collectionTokens.length > 0 && 
              collectionTokens.filter((token: any) =>
                token.symbol.toLowerCase() == (nft.symbol.toLowerCase())
              ).map((token, idx) => (
              <Button
                key={`token${idx}`}
                variant="secondary"
                
              >
                <Image alt="Token Icon" className="token-icon" src={collectionTokens[idx].logoUri}/>{token.name}
              </Button>
              ))}
              <Input
                  type='number'
                  placeholder=''
                  value={price} onChange={handlePriceChange}
                />
            </PriceContainer>
          </>
          }
          <h4>Fees</h4>
          <FeeContainer>
            <span>Service Fee</span>
            <span>XXX%</span>
          </FeeContainer>
          <FeeContainer>
            <span>Creator Fee</span>
            <span>{fee}%</span>
          </FeeContainer>
          <ActionContainer>
          <Button className="btn-default"
            css={{
              'background': '$black',
              'color': '$white',
              'stroke': '$white',
            }}
            variant="primary"
            size="large"
            onClick={(e) => {
            }}
          >
            Complete listing
          </Button>
          
        </ActionContainer>
        </NftInfoTag>
        <NftUriTag className="sell-nft-uri">
          {nft.image && 
          <Image src={nft.image} alt="NFT Image"/>
          }
        </NftUriTag>
      </Nft>
    </ChakraProvider>
  );
}
const Nft = styled('div', {
  display: 'flex',
})
const NftUriTag = styled('div', {
  paddingRight: '0',
  paddingLeft: '30px',
  ' img':{
    borderRadius: '$4',
  }
})
const NftInfoTag = styled('div', {
  ' .nft-title':{
    marginTop: '0px',
  },
  'h4':{
    'fontWeight': 'bold',
  },
  '>a':{
    color: '$colors$link',
  }
})

const ButtonGroup = styled('div', {
  display: 'flex',
  gap: '0',
  marginBottom: '$space$10',
  'button':{
    width: '50%',
    borderRadius: '0',
    background: '$gray',
    '&.active':{
      background: '$dark',
    },
    '&.fixed-btn':{
      borderTopLeftRadius: '$2',
      borderBottomLeftRadius: '$2',
    },
    '&.auction-btn':{
      borderTopRightRadius: '$2',
      borderBottomRightRadius: '$2',
    }
  }
})

const PriceContainer = styled('div', {
  display: 'flex',
  marginBottom: '$space$10',
  'button':{
    display: 'flex',
    flexDirection: 'row',

    'img':{
      width: '$8',
      marginRight: '$2'
    }
  },
  'input':{
    width: '100%',
    height: '$lineHeights$5',
    marginLeft: '$2'
  }
  
})
const QuantityContainer = styled('div', {
  marginBottom: '$space$10',
  'p':{
    textAlign: 'right',
  }
})
const DurationContainer = styled('div', {
  marginBottom: '$space$10',
})

const FeeContainer = styled('div', {
  marginBottom: '$space$10',
  display: 'flex',
  justifyContent: 'space-between',
})
const ActionContainer = styled('div', {
  marginBottom: '$space$10',
})