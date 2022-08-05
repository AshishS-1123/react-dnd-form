import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import '../styles/Home.module.css'
import ElementContainer from "../features/ElementContainer";
import Provider from "../store/Provider";
import PreviewContainer from "../features/PreviewContainer";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Form Builder Application</title>
        <meta name="description" content="drag and drop form builder web app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" /> 
      </Head>

      <Provider>
        <>
          <ElementContainer />
          <PreviewContainer />
        </>
      </Provider>

    </div>
  )
}

export default Home
