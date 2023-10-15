import React, { useState } from 'react';
import "./login.css";

function Login({ setLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [numberSiret, setNumberSiret] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ici, vous pouvez ajouter votre logique d'authentification,
    // par exemple en vérifiant les informations d'identification dans une base de données.
    if (username === 'user' && password === 'password') {
      setLoggedIn(true);
    } else {
      alert('Identifiants incorrects');
    }
  };

  return (
    <div>
      
          <form onSubmit={handleSubmit} id="loginForm">
         <h3>Connexion</h3>     
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="numberSiret">Mot de passe:</label>
          <input
            type="text"
            id="numberSiret"
            value={numberSiret}
            onChange={(e) => setNumberSiret(e.target.value)}
          />
        </div>
        <button type="submit">Test</button>
      </form>
    </div>
  );
}

export default Login;