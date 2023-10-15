import React, { useContext, useState, useEffect } from 'react';
import AuthForm from './authForm';
import PoemForm from './form.js';
import "./homePage.css";
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const backendUrl = "https://pure-stream-14786.herokuapp.com";

const HomePage = () => {
  const { isLoggedIn } = useContext(AuthContext);
  
  useEffect(() => {
    const fetchUserProperties = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) return;

        const response = await axios.get(`${backendUrl}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
       

      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProperties();
  }, []);
  // Si l'URL de l'image n'est pas encore disponible, ne rien afficher
  


  return (
    <div id="homePage">
      <div className="overlay"></div>
      <h3 className="animate-charcter"> LEONIDAS</h3>
      <p id="introText">MAÎTRE CHOCOLATIER 1913</p>
      
      {isLoggedIn ? (
        <PoemForm />
      ) : (
        <AuthForm />
      )}
    </div>
  );
};




export default HomePage;
