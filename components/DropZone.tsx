import React, { useState } from "react";
import Image from "next/image";
import css from "../styles/DropZone.module.css";
import axios from 'axios';
import { styled } from './theme'

const DropZone = ({ data, dispatch }) => {
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  // to handle file uploads
  const uploadFiles = () => {
    // get the files from the fileList as an array
    let files = data.fileList;
    // initialize formData object
    const formData = new FormData();
    // loop over files and add to formData
    console.log("files:", files);
    files.forEach((file) => formData.append("file", file));
    let url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    // return axios
    //     .post(url, formData, {
    //         maxBodyLength: Infinity, //this is needed to prevent axios from erroring out with large files
    //         headers: {
    //             'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    //             pinata_api_key: "73f00590e2e07bf89b89",
    //             pinata_secret_api_key: "7ac2b137f8cd8226f5afe2cd22586823ebb1ce00e6019de8bce35c1584b87c1b"
    //         }
    //     })
    //     .then(function (response) {
    //         debugger;
    //         console.log(response);

    //     })
    //     .catch(function (error) {
    //     });

    // Upload the files as a POST request to the server using fetch
    // Note: /api/fileupload is not a real endpoint, it is just an example
    // const response = await fetch("/api/fileupload", {
    //   method: "POST",
    //   body: formData,
    // });

    // //successful file upload
    // if (response.ok) {
    //   alert("Files uploaded successfully");
    // } else {
    //   // unsuccessful file upload
    //   alert("Error uploading files");
    // }
  };

  return (
    <>
      <div
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <StyledImage src="/nft/img.svg" />
        <h3 className={css.uploadMessage}>
          drag your Image here 
          <br/> to upload
        </h3>
        <hr/><span>OR</span>
        <br/>
        <input
          id="fileSelect"
          type="file"
          multiple
          className={css.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">Choose Image</label>
      </div>
      {/* Pass the selectect or dropped files as props */}
      {/* Only show upload button after selecting atleast 1 file */}
      {data.fileList.length > 0 && (
        <button className={css.uploadBtn} onClick={uploadFiles}>
          Upload
        </button>
      )}
    </>
  );
};
const StyledImage = styled('img', {
  borderRadius: '0%',
});
export default DropZone;
