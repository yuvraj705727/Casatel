import React, { useEffect } from 'react'
import Featured from '../../components/featured/Featured'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Navbar from '../../components/navbar/Navbar'
import PropertyList from '../../components/propertyList/PropertyList'
import { googleAuth } from '../../context/authContext'
import "./home.css"

export const Home = () => {

  useEffect(() => {
    googleAuth();
  }, []);

  return (
    <div>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Display of Available Property Type</h1>
          <PropertyList/>
          <h1 className="homeTitle">Display of Famous Hotels</h1>
          <FeaturedProperties/>
        </div>
        <MailList/>
        <Footer/> 
    </div>
    
  )
}