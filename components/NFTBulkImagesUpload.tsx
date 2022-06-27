import React, { useState } from "react"
import css from "../styles/DropZone.module.css"
import axios from 'axios'
import { styled } from './theme'
import { NoImage } from 'icons'
import { 
  ChakraProvider, 
  Image,
} from '@chakra-ui/react'

const PUBLIC_PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY || ''
const PUBLIC_PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || ''
const PUBLIC_PINATA_URL = process.env.NEXT_PUBLIC_PINATA_URL || ''
const FeaturedImageUpload = ({ data, dispatch, item }) => {
  const [ ipfsHashFIU, setIpfsHashFIU ] = useState("")
  // onDragEnter sets inDropZone to true
  const handleDragEnterFIU = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true })
  }

  // onDragLeave sets inDropZone to false
  const handleDragLeaveFIU = (e) => {
    e.preventDefault()
    e.stopPropagation()

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
  }

  // onDragOver sets inDropZone to true
  const handleDragOverFIU = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy"
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true })
  }

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDropFIU = (e) => {
    e.preventDefault()
    e.stopPropagation()

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files]

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name)
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name))

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files })
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false })
      uploadFilesFIU(files)
    }
  }

  // handle file selection via input element
  const handleFileSelectFIU = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files]

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name)
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name))

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files })
      uploadFilesFIU(files)
    }
  }

  // to handle file uploads
  const uploadFilesFIU = async(files) => {
    // get the files from the fileList as an array
    // let files = data.fileList
    // initialize formData object
    const formData = new FormData()
    // loop over files and add to formData
    files.forEach((file) => formData.append("file", file))
    let url = `https://api.pinata.cloud/pinning/pinFileToIPFS`

    let response = await axios
        .post(url, formData, {
            maxBodyLength: Infinity, //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data`,
                pinata_api_key: PUBLIC_PINATA_API_KEY,
                pinata_secret_api_key: PUBLIC_PINATA_SECRET_API_KEY
            }
        });
    if (response.status == 200){
      setIpfsHashFIU(response.data.IpfsHash)
      dispatch({ type: "SET_FEATURED_IMAGE", featuredImage: response.data.IpfsHash })
    }
  }

  return (
    <ChakraProvider>
      <Container className={`${item}-section`}>
        <DropzoneContainer className={ipfsHashFIU!=""?"opacity02":""}>
          <div
            onDrop={(e) => handleDropFIU(e)}
            onDragOver={(e) => handleDragOverFIU(e)}
            onDragEnter={(e) => handleDragEnterFIU(e)}
            onDragLeave={(e) => handleDragLeaveFIU(e)}
          >
            <StyledImage>
              <NoImage/>
            </StyledImage>
            <p className={css.uploadMessage}>
              drag your Images here 
              <br/> to upload
            </p>
            <p>
              <span className="line-through">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span>&nbsp;or&nbsp;</span>
              <span className="line-through">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </p>
            <input
              id="fileSelectFIU"
              type="file"
              multiple
              className={css.files}
              onChange={(e) => handleFileSelectFIU(e)}
            />
            <label htmlFor="fileSelectFIU"><NoImage/>Choose Image</label>
          </div>
          {/* Pass the selectect or dropped files as props */}
          {/* Only show upload button after selecting atleast 1 file */}
          {/* {data.fileList.length > 0 && (
            <button className={css.uploadBtn} onClick={uploadFiles}>
              Upload
            </button>
          )} */}
        </DropzoneContainer>
        <ImageContainer>
          {ipfsHashFIU!="" &&
            <Image alt="Collection Featured Image" className="collection-featured-img" src={`${PUBLIC_PINATA_URL}${ipfsHashFIU}`}/>
          }
        </ImageContainer>
      </Container>
    </ChakraProvider>
  )
}
const Container = styled('div', {
  position: 'relative',
  boxShadow: '0px 4px 44px rgba(0, 0, 0, 0.12)',
  marginTop: '$8',
  borderRadius: '$2',
})
const DropzoneContainer = styled('div', {
  zIndex: 3,
  background: 'transparent',
  textAlign: 'center',
  position: 'absolute',
  left: '0',
  top: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '$borderWidths$2 dashed $uploadborder',
  borderRadius: '$2',
  '&.opacity02':{
    opacity: '0.2',
  },
  '&.opacity02:hover':{
    opacity: '0.8',
    background: '$light',
  },
  ' p':{
    color: '$uploaddesc',
    padding: '$4',
  },
  ' label':{
    backgroundColor: '$dark',
    borderRadius: '$2',
    display: 'flex',
    gap: '$4',
    padding: '$4',
    justifyContent: 'center',
    alignItems: 'center',
  }
})
const StyledImage = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  ' svg':{
    width: '40px',
    height: '36px',
    stroke: '$uploadicon',
    ' path':{
      fill: '$grayicon',
    }
  }
})
const ImageContainer = styled('div', {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  'img':{
    maxWidth: '100%',
    maxHeight: '100%',
  }
})
export default FeaturedImageUpload
