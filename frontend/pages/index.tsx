import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';
import Ticket from '../components/Ticket';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Header />
      <Ticket />
    </div>
  )
}

export default Home
