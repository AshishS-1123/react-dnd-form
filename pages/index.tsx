import React from "react";
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ElementContainer from "../features/ElementContainer";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Form Builder Application</title>
        <meta name="description" content="drag and drop form builder web app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <ElementContainer />
      </section>

    </div>
  )
}

export default Home
