import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ElementContainer from "../features/ElementContainer";
import Provider from "../store/Provider";
import PreviewContainer from "../features/PreviewContainer";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Form Builder Application</title>
        <meta name="description" content="drag and drop form builder web app" />
        <link rel="icon" href="/favicon.ico" />
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
