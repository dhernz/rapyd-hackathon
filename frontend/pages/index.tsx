import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import SignUp from '../components/SignUp';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Header />
      <SignUp />
    </div>
  )
}

export default Home
