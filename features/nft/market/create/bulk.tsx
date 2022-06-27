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
  useToast
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import DropZone from "components/DropZone"
import NFTBulkImagesUpload from "components/NFTBulkImagesUpload"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { walletState, WalletStatusType } from 'state/atoms/walletAtoms'
import { Market, useSdk, Collection } from 'services/nft'

const PUBLIC_CW721_CONTRACT = process.env.NEXT_PUBLIC_CW721_CONTRACT || ''
const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''
const PUBLIC_CW20_CONTRACT = process.env.NEXT_PUBLIC_CW20_CONTRACT || ''
const PUBLIC_CW721_BASE_CODE_ID = process.env.NEXT_PUBLIC_CW721_BASE_CODE_ID || 388

const PUBLIC_PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || ''
const PUBLIC_PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || ''
const PUBLIC_PINATA_URL = process.env.NEXT_PUBLIC_PINATA_URL || ''
export const CreateNFTBulk = () => {
  const router = useRouter()
  //const toast = useToast()
  const [nftcategories, setNftCategories] = useState<NftCategory[]>(
    []
  )
  const [isJsonUploading, setJsonUploading] = useState(false)
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)

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
      
    })()

  }, [])
  
  return (
    <Container>
      <p><span className="required">*</span> Required Fields</p>
      <ItemContainer className="collection-item">
        <h3>Image, Video, Audio, Or 3D model<span className="required">*</span></h3>
        <p>File Types Supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GIFT. Max size: 100MB</p>
        <AspectRatio maxW='1400px' ratio={3.5}>
          <NFTBulkImagesUpload data={data} dispatch={dispatch} item="collection-banner"/>
        </AspectRatio>
      </ItemContainer>
      <ChakraProvider>
        
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

const ItemContainer = styled('div', {

})