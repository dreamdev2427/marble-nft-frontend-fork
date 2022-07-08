import * as React from "react"
import { useCallback, useState, useReducer, useEffect } from "react"
import { useRouter } from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import { styled } from 'components/theme'
import { Button } from 'components/Button'

import {
  FILTER_ACCESSORIES,
  FILTER_BACKGROUND,
  FILTER_CLOTHES,
  FILTER_EXPRESSIONS,
  FILTER_EYES,
  FILTER_HELMET,
  FILTER_EARRING,
  FILTER_HEAD
} from "store/types"

import { 
  ChakraProvider, 
  Input, 
  InputGroup, 
  Image,
  Textarea,
  Select, 
  AspectRatio,
  Stack,
  HStack,
  useRadioGroup,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import NFTUpload from "components/NFTUpload"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { walletState, WalletStatusType } from 'state/atoms/walletAtoms'
import { Market, CW721, useSdk } from 'services/nft'

const PUBLIC_MARKETPLACE = process.env.NEXT_PUBLIC_MARKETPLACE || ''

const PUBLIC_PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || ''
const PUBLIC_PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || ''
const PUBLIC_PINATA_URL = process.env.NEXT_PUBLIC_PINATA_URL || ''

interface NftCollectionInfo {
  readonly id: number;
  readonly name: string;
}
let filter_status:any = []
export const CreateNFT = () => {
  const router = useRouter()
  //const toast = useToast()
  const [nftcollections, setNftCollections] = useState<NftCollectionInfo[]>(
    []
  )
  const [isJsonUploading, setJsonUploading] = useState(false)
  const [name, setName] = useState("")
  const [externalLink, setExternalLink] = useState("")
  const [description, setDescription] = useState("")
  const [collectionId, setCollectionId] = useState(0)
  const [accessories, setAccessories] = useState("none")
  const [background, setBackground] = useState("none")
  const [clothes, setClothes] = useState("none")
  const [earring, setEarring] = useState("none")
  const [expressions, setExpressions] = useState("none")
  const [eyes, setEyes] = useState("none")
  const [head, setHead] = useState("none")
  const [helmet, setHelmet] = useState("none")
  const [price, setPrice] = useState(1)
  const [supply, setSupply] = useState(1)
  const [nftIpfsHash, setNftIpfsHash] = useState("")
  const { client } = useSdk()
  const { address, client: signingClient } = useRecoilValue(walletState)

  const handleNameChange = (event) => {
    setName(event.target.value)
  }
  const handleExternalLinkChange = (event) => {
    setExternalLink(event.target.value)
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }
  const handleCollectionIdChange = (event) => {
    setCollectionId(event.target.value)
  }
  const handleSupplyChange = (event) => {
    setSupply(event.target.value)
  }
  const handlePriceChange = (event) => {
    setPrice(event.target.value)
  }

  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone }
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) }
      case "SET_NFT":
        return { ...state, nft: action.nft}
      default:
        return state
    }
  }

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
    nft: "",
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
          if (res_collection.owner == address){
            let collection_info:any = {}
            collection_info.id = collectionList[i].id
            collection_info.name = res_collection.name
            collections.push(collection_info)
          }
          
        }catch (err){
          console.log("err", err)
        }
          
        //}
        
      }
      setNftCollections(collections)
      
    })()

  }, [client])
  
  const createNFT = async(e) => {
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

    if (name == "")
    {
      toast.warning(
        `Please input the NFT name.`,
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
    if (data.nft == "")
    {
      toast.warning(
        `Please upload a nft file.`,
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
    const jsonData:any = {}
    jsonData["name"] = name
    jsonData["externalLink"] = externalLink
    jsonData["description"] = description
    jsonData["collectionId"] = collectionId
    jsonData["uri"] = data.nft
    jsonData["supply"] = supply
    jsonData["attributes"] = []
    jsonData["attributes"].push({"trait_type": "Accessories", "value": accessories});
    jsonData["attributes"].push({"trait_type": "Background", "value": background});
    jsonData["attributes"].push({"trait_type": "Clothes", "value": clothes});
    jsonData["attributes"].push({"trait_type": "Earring", "value": earring});
    jsonData["attributes"].push({"trait_type": "Expressions", "value": expressions});
    jsonData["attributes"].push({"trait_type": "Eyes", "value": eyes});
    jsonData["attributes"].push({"trait_type": "Head", "value": head});
    jsonData["attributes"].push({"trait_type": "Helmet", "value": helmet});
    jsonData["owner"] = address
    const pinataJson = {
      "pinataMetadata": 
      {
        "name": name, 
      }, 
      "pinataContent": jsonData
    }
    console.log(pinataJson)
    setJsonUploading(true)
    let url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    let response = await axios
        .post(url, pinataJson, {
            maxBodyLength: Infinity, //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `application/json`,
                pinata_api_key: PUBLIC_PINATA_API_KEY,
                pinata_secret_api_key: PUBLIC_PINATA_SECRET_API_KEY
            }
        })
    let ipfsHash = ""
    if (response.status == 200){
      console.log(response)
      
      ipfsHash = response.data.IpfsHash
    }
    
    
    if (!address || !signingClient) {
      console.log("unauthorized user")
      return
    }

    const marketContract = Market(PUBLIC_MARKETPLACE).use(client)
    let collection = await marketContract.collection(collectionId)
    const cw721Contract = CW721(collection.collection_address).useTx(signingClient)
    setNftIpfsHash(ipfsHash + ":::" + collection.collection_address)
    console.log("collection", collection)
    let nft = await cw721Contract.mint(address, ipfsHash, "0")
    console.log("nft info:", nft)
    // const nft = await marketContract.mint(
    //   address, ipfsHash
    // )
    // console.log("nft info:", nft)
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
      <ItemContainer className="collection-item">
        <h3>Image, Video, Audio, Or 3D model<span className="required">*</span></h3>
        <p>File Types Supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GIFT. Max size: 100MB</p>
        <AspectRatio maxW='1400px' ratio={3.5}>
          <NFTUpload data={data} dispatch={dispatch} item="nft-create"/>
        </AspectRatio>
      </ItemContainer>
      <ChakraProvider>
        <CollectionItem className="collection-item">
          <h3>Name <span className="required">*</span></h3>
          <Input
                  pr='48px'
                  type='text'
                  placeholder='Example: Treasures of the Sea'
                  value={name} onChange={handleNameChange}
                />
        </CollectionItem>
        <CollectionItem className="collection-item">
          <h3>External Link</h3>
          <p>Please input the url for NFT.</p>
          <InputGroup size='sm'>
            <Input placeholder='External Link' value={externalLink} onChange={handleExternalLinkChange}/>
          </InputGroup>
        </CollectionItem>
        <CollectionItem className="collection-item">
          <h3>Description</h3>
          <p>Markdown syntax is supported. 0 of 1000 characters used.</p>
          <Textarea value={description} onChange={handleDescriptionChange}/>
        </CollectionItem>
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
          <h3>Properties</h3>
          <Stack spacing={0} className="property-group">
            <TableContainer className='nft-property-tbl-container'>
              <Table variant='simple'>
                <Tbody>
                  <Tr>
                    <Td>Accessories</Td>
                    <Td>
                    {FILTER_ACCESSORIES.map((item, index) => (
                      <Button
                        key={`accessories${index}`}
                        variant="secondary"
                        className={`${accessories==item.id?'active':'default'}`}
                        onClick={() => {
                          if (accessories == item.id){
                            setAccessories("none")
                          }else{
                            setAccessories(item.id)
                          }
                          
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Background</Td>
                    <Td>
                    {FILTER_BACKGROUND.map((item, index) => (
                      <Button
                        key={`background${index}`}
                        variant="secondary"
                        className={`${background == item.id?'active':'default'}`}
                        onClick={() => {
                          if (background == item.id){
                            setBackground("none")
                          }else{
                            setBackground(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Clothes</Td>
                    <Td>
                    {FILTER_CLOTHES.map((item, index) => (
                      <Button
                        key={`clothes${index}`}
                        variant="secondary"
                        className={`${clothes == item.id?'active':'default'}`}
                        onClick={() => {
                          if (clothes == item.id){
                            setClothes("none")
                          }else{
                            setClothes(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Earring</Td>
                    <Td>
                    {FILTER_EARRING.map((item, index) => (
                      <Button
                        key={`earring${index}`}
                        variant="secondary"
                        className={`${earring == item.id?'active':'default'}`}
                        onClick={() => {
                          if (earring == item.id){
                            setEarring("none")
                          }else{
                            setEarring(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}

                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Expressions</Td>
                    <Td>
                    {FILTER_EXPRESSIONS.map((item, index) => (
                      <Button
                        key={`expressions${index}`}
                        variant="secondary"
                        className={`${expressions == item.id?'active':'default'}`}
                        onClick={() => {
                          if (expressions == item.id){
                            setExpressions("none")
                          }else{
                            setExpressions(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Eyes</Td>
                    <Td>
                    {FILTER_EYES.map((item, index) => (
                      <Button
                        key={`eyes${index}`}
                        variant="secondary"
                        className={`${eyes == item.id?'active':'default'}`}
                        onClick={() => {
                          if (eyes == item.id){
                            setEyes("none")
                          }else{
                            setEyes(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}

                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Head</Td>
                    <Td>
                    {FILTER_HEAD.map((item, index) => (
                      <Button
                        key={`head${index}`}
                        variant="secondary"
                        className={`${head == item.id?'active':'default'}`}
                        onClick={() => {
                          if (head == item.id){
                            setHead("none")
                          }else{
                            setHead(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Helmet</Td>
                    <Td>
                    {FILTER_HELMET.map((item, index) => (
                      <Button
                        key={`helmet${index}`}
                        variant="secondary"
                        className={`${helmet == item.id?'active':'default'}`}
                        onClick={() => {
                          if (helmet == item.id){
                            setHelmet("none")
                          }else{
                            setHelmet(item.id)
                          }
                          return false
                        }}
                      >
                        {item.name}
                      </Button>
                    ))}

                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Stack>
        </CollectionItem>
        <CollectionItem className="collection-item">
          <h3>Supply</h3>
          <p>The number of items that can be minted. No gas cost to you!</p>
          <NumberInput defaultValue={1} min={1} step={1} >
              <NumberInputField value={supply} onChange={handleSupplyChange}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
          </NumberInput>
        </CollectionItem>
        <CollectionItem className="collection-item hide">
          <h3>Price</h3>
          <NumberInput defaultValue={1} min={1} step={1} >
              <NumberInputField value={price} onChange={handlePriceChange}/>
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
          </NumberInput>
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
              
              createNFT(e)
            
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
const LogoFeaturedContinaer = styled('div', {

})
const LogoContainer = styled('div', {

})
const FeaturedContainer = styled('div', {

})
const ItemContainer = styled('div', {

})
const CollectionItem = styled('div', {
  '.link-group':{
    border: '1px solid $chakraborder',
    borderRadius: '$2',
    '.link-item':{
      borderLeft: '0px',
      borderRight: '0px',
      borderTop: '0px',
      borderBottom: '1px solid $chakraborder',
      '>div':{
        border: '0px',
        borderRadius: '0px',
        background: 'transparent',
        paddingRight: '1px',
        'svg':{
          marginRight: '$8',
          width: '26px',
          height: '25px',
          'path':{
            fill: '$chakraicon',
          }
        }
      },
      '>input':{
        border: '0px',
        borderRadius: '0px',
        paddingLeft: '0px',
        boxShadow: 'none',
      },
      '&.last-item':{
        border: '0px',
      }
    }
  },
  '.chain-group':{
    border: '1px solid $chakraborder',
    borderRadius: '$2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    'img':{
      width: '$8',
      margin: '$4'
    }
  },
  '.property-group':{
    'button':{
      '&.active':{
        background: '$backgroundColors$tertiary',
        fontWeight: 'bold',
      }
    }
  }
})
const CheckboxItem = styled('div', {
  display: 'none',
  position: 'absolute',
  top: '$space$27',
  right: '$space$27',
  'svg':{
    background: '$black',
    borderRadius: '50%',
    width: '$9',
    height: '$9',
    padding: '$space$3',
    border: '$borderWidths$3 solid $white',
    boxShadow: '0px 4px 44px $backgroundColors$secondary'
  }
})
const Template = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '$8',
  position: 'relative',
})
const Design = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  gap: '$4',
})
const ExplicitItem = styled('div', {
  display: 'flex',
  '.chakra-switch':{
    marginLeft: 'auto',
    '>span[data-checked]':{
      background: '$black',
    }
  }
})
const TokenItem = styled('div', {
  'flexDirection': 'row',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
})