import React, { useContext,useState,useEffect } from 'react';
import './App.css';
import PoemForm from './Components/form.js';
import Navigation from './Components/Navigation';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'animate.css';
import Footer from './Components/footer';
import AuthForm from './Components/authForm';
import UserProfile from './Components/UserProfile';
import HomePage from './Components/home';
import { AuthContext } from './AuthContext';
import LegalNotice from './Components/LegalNotice';


function App() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    window.onload = () => {
      setIsLoaded(true);
    };
  }, []);

  return (
    <div className="App" style={isLoaded ? {} : { display: 'none' }}>
      <HashRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            path="/generate-poem"
            render={() => (isLoggedIn ? <PoemForm /> : <AuthForm />)}
          />
          <Route
            path="/user-profile"
            render={() => (isLoggedIn ? <UserProfile /> : <AuthForm />)}
          />
          <Route exact path="/mentions-legales" component={LegalNotice} />
        </Switch>
          <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
