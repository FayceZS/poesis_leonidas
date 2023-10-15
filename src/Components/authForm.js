import React, { useContext, useState } from 'react';
import axios from 'axios';
import "./authForm.css";
import { AuthContext } from "../AuthContext";

const backendUrl = "https://pure-stream-14786.herokuapp.com";

const AuthForm = () => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [numberSiret, setNumberSiret] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useContext(AuthContext);

  const handleFormSwitch = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (showLoginForm) {
        const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem('authToken', token);

        login(); // Utiliser la méthode login du contexte
      } else {
       const response = await axios.post(`${backendUrl}/auth/signup`, { email, password, numberSiret, address: { street, city, state, postalCode, country } });

        console.log(response.data);
        window.location.reload();
        // Gérer l'inscription de l'utilisateur ici
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erreur lors de la connexion. Veuillez réessayer.');
      }
    }
  };

  return (
    <div>
      {showLoginForm ? (
        <div className="authFormDiv">
          {/* <h1 className="authFormTitle">Identifiez-vous pour utiliser Poesis</h1> */}
          <form onSubmit={handleSubmit} className="authForm">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Mot de passe:</label>
              <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="authFormButtons">
              <button type="submit">Se connecter</button>
              <button onClick={handleFormSwitch}>S'inscrire</button>
            </div>
          </form>      
        </div>
      ) : (
        <div className='authFormDiv'>
          <h1 className="authFormTitle">Inscription</h1>
          <form onSubmit={handleSubmit} className="authForm">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="password">Mot de passe:</label>
              <input type="password" name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div>
              <label htmlFor="text">Numéro Siret:</label>
              <input type="text" name="numberSiret" required value={numberSiret} onChange={(e) => setNumberSiret(e.target.value)} />
            </div>
            <div>
              <label htmlFor="street">No et Rue:</label>
              <input type="text" name="street" required value={street} onChange={(e) => setStreet(e.target.value)} />
            </div>
            <div>
              <label htmlFor="city">Ville:</label>
              <input type="text" name="city" required value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label htmlFor="state">Région:</label>
              <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div>
              <label htmlFor="postalCode">Code postal:</label>
              <input type="text" name="postalCode" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
            <div>
              <label htmlFor="country">Pays:</label>
              <input type="text" name="country" required value={country} onChange={(e) => setCountry(e.target.value)} />
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="authFormButtons">
              <button onClick={handleFormSwitch}>Se connecter</button>                  
              <button type="submit">S'inscrire</button>
            </div>
          </form>             
        </div>
      )}
    </div>
  );
};

export default AuthForm;
