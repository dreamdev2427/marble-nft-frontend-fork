import React, { useReducer, useState, useEffect } from "react";
import Head from "next/head";
import { AppLayout } from 'components/Layout/AppLayout'
import { PageHeader } from 'components/Layout/PageHeader'
import DropZone from "components/DropZone";

export default function Home() {
  const [fullWidth, setFullWidth] = useState(true);
  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <AppLayout fullWidth={fullWidth}>
      <PageHeader
        title="Collection Create"
        subtitle=""
      />
      <main className="dropzone-main">
        <h1 className="dropzone-title">Drag And Drop File Upload</h1>
        {/* Pass state data and dispatch to the DropZone component */}
        <DropZone data={data} dispatch={dispatch} />
      </main>
    </AppLayout>
  
  );
}
