import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const backendUrl = "https://pure-stream-14786.herokuapp.com";

const useFetchCredits = () => {
  const [credits, setCredits] = useState(0);
  const [creditsLoading, setCreditsLoading] = useState(false);

  const fetchCredits = useCallback(async () => {
    setCreditsLoading(true); // Début du chargement
    try {
      const token = localStorage.getItem('authToken');
    
      const response = await axios.get(`${backendUrl}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data);
      localStorage.setItem('mail', response.data.email);
      setCredits(response.data.credits); // ici on met à jour l'état credits avec la valeur obtenue depuis la réponse de l'API
      
    } catch (error) {
      console.log("Erreur");
      console.error(error);
    } finally {
      setCreditsLoading(false); // Fin du chargement
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchCredits();
    }
  }, [fetchCredits]);

  return { credits, creditsLoading, fetchCredits };
};

export default useFetchCredits;
