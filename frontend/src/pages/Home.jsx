import React from 'react'
import Hero from '../components/Layout/Hero'
import Gender from '../components/Products/Gender'
import NewArr from '../components/Products/NewArr'
import FeturedC from '../components/Products/FeturedC'
import Fetures from '../components/Products/Fetures'

const Home = () => {
  return (
    <div>
      <Hero />
      <Gender />
      <NewArr />
      <FeturedC />
      <Fetures />
    </div>
  )
}

export default Home
