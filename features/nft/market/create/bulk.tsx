import * as React from "react"
import { useCallback, useState, useReducer, useEffect } from "react"
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { styled } from 'components/theme'
import { Button } from 'components/Button'
import { IconWrapper } from 'components/IconWrapper'
import { YourSite, Discord, Instagram, MediumM, Telegram, Template1, CheckIcon } from 'icons'
import {
  NftInfo,
  NftCategory,
  NftCollection,
} from "services/nft"
import { 
  ChakraProvider, 
  Input, 
  InputGroup, 
  InputLeftAddon,
  Image,
  Textarea,
  AspectRatio,
  useToast,
  Select
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import DropZone from "components/DropZone"
import NFTBulkImagesUpload from "components/NFTBulkImagesUpload"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { walletState, WalletStatusType } from 'state/atoms/walletAtoms'
import { Market, CW721, useSdk, Collection } from 'services/nft'

const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''

const PUBLIC_PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || ''
const PUBLIC_PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || ''
const PUBLIC_PINATA_URL = process.env.NEXT_PUBLIC_PINATA_URL || ''

interface NftCollectionInfo {
  readonly id: number;
  readonly name: string;
}

export const CreateNFTBulk = () => {
  const router = useRouter()
  //const toast = useToast()
  const [nftcategories, setNftCategories] = useState<NftCategory[]>(
    []
  )
  const [isJsonUploading, setJsonUploading] = useState(false)
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)
  const [nftcollections, setNftCollections] = useState<NftCollectionInfo[]>(
    []
  )
  
  const [collectionId, setCollectionId] = useState(0)
  const [cid, setCid] = useState("")
  const handleCollectionIdChange = (event) => {
    setCollectionId(event.target.value)
  }
  const handleCIDChange = (event) => {
    setCid(event.target.value)
  }
  
  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone }
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) }
      case "SET_LOGO":
        console.log("state logo", action.logo)
        return { ...state, logo: action.logo}
      case "SET_FEATURED_IMAGE":
        return { ...state, featuredImage: action.featuredImage}
      case "SET_BANNER":
        return { ...state, banner: action.banner}
      default:
        return state
    }
  }

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
    logo: "",
    featuredImage: "",
    banner: "",
  })

  useEffect(() => {
    (async () => {
      if (!client){
        return;
      }
      const marketContract = Market(PUBLIC_MARKETPLACE).use(client)
      let collectionList = await marketContract.listCollections()
      let collections = []
      for (let i = 0; i < collectionList.length; i++){
        let res_collection:any = {}
        console.log("uri:", process.env.NEXT_PUBLIC_PINATA_URL + collectionList[i].uri)
        //if (collectionList[i].uri.indexOf("airdrop") == -1){
        try{
          let ipfs_collection = await fetch(process.env.NEXT_PUBLIC_PINATA_URL + collectionList[i].uri)
          res_collection = await ipfs_collection.json()
          let collection_info:any = {}
          collection_info.id = collectionList[i].id
          collection_info.name = res_collection.name
          collections.push(collection_info)
        }catch (err){
          console.log("err", err)
        }
          
        //}
        
      }
      setNftCollections(collections)
    })()

  }, [client])
  const createNFTs = async(e) => {
    //if (status !== WalletStatusType.connected) {
    if (!address || !signingClient) {
      toast.warning(
        `Please connect your wallet.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      return
    }
    if (collectionId == 0)
    {
      toast.warning(
        `Please select a collection.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      return  
    }
    if (cid == "")
    {
      toast.warning(
        `Please input a cid.`,
        {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      )
      return  
    }
    

    const marketContract = Market(PUBLIC_MARKETPLACE).use(client)
    let collection = await marketContract.collection(collectionId)
    const cw721Contract = CW721(collection.collection_address).useTx(signingClient)
    let cids = []
    let prices = []
    let owners = []
    let extension = []
    let nft_start = 1;
    for (let i = nft_start; i < nft_start + 10; i++){
      owners.push(address)
      cids.push(cid + "/" + i.toString())
      prices.push("8")
      extension.push({})
    }
    let result = await cw721Contract.batchMint(address, owners, cids, prices, extension)
    console.log("nft batch info:", result)
    
    setJsonUploading(false)
    toast.success(
      `You have created your NFT successfully.`,
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    )
  }
  return (
    <Container>
      <p><span className="required">*</span> Required Fields</p>
      <ChakraProvider>
        <CollectionItem className="collection-item">
          <h3>Collection <span className="required">*</span></h3>
          <p>This is the collection where your item will appear.</p>
          <Select value={collectionId} onChange={handleCollectionIdChange}>
            <option value="0"></option>
            {nftcollections.length > 0 && nftcollections.map((collection, idx) => (
                <option value={collection.id} key={`collection${idx}`}>{collection.name}</option>
            ))}
          </Select>
        </CollectionItem>
        <CollectionItem className="collection-item">
          <h3>Pinata CID <span className="required">*</span></h3>
          <Input
                  pr='48px'
                  type='text'
                  placeholder=''
                  value={cid} onChange={handleCIDChange}
                />
        </CollectionItem>
        <CollectionItem className="collection-item">
          <Button className="btn-default"
            css={{
              'background': '$black',
              'color': '$white',
              'stroke': '$white',
            }}
            variant="primary"
            size="large"
            onClick={(e) => {
              
              createNFTs(e)
            
            }}

            disabled={isJsonUploading}
          >
            Create
          </Button>
          
        </CollectionItem>
      </ChakraProvider>
    </Container>
  )
}

const Container = styled('div', {
  maxWidth: '1400px',
  '.collection-item':{
    marginBottom: '$16',
  },
  'h3':{
    fontWeight: 'bold',
  },
  'p':{
    color: '$textColors$secondary',
  }
})

const CollectionItem = styled('div', {

})