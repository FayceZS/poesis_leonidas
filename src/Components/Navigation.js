import React, { useContext, useState, useEffect } from 'react';
import logoPoesis from "../img/logoPoesis.png";
import iconLogout from "../img/iconLogout.png";
import ecrirePoem from "../img/ecrirePoem.png";
import iconProfil from "../img/iconProfil.png";
import closeCredits from "../img/closeCredits.png"
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import "./Navigation.css";
import { AuthContext } from '../AuthContext';
import iconCredits from '../img/iconCredits.png';
import axios from 'axios';
import PaymentModule from './PaymentForm';
const backendUrl = "https://pure-stream-14786.herokuapp.com";



// Ajoutez ceci pour fixer l'élément racine pour le modal, nécessaire pour l'accessibilité
Modal.setAppElement('#root');




const Navigation = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  // const [credits, setCredits] = useState(0);
  // const [creditsLoading, setCreditsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const purchaseOption = (credits, value) => {
    const newValue=Math.trunc(value*100)
    setSelectedOption({ credits, value:newValue });
  };

  const resetOption = () => {
    setSelectedOption(null);
    closeModal();
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedOption(null);
    setModalIsOpen(false);
  };

//   const fetchCredits = async () => {
//   setCreditsLoading(true); // Début du chargement
//   try {
//     const token = localStorage.getItem('authToken');

//     const response = await axios.get(`${backendUrl}/auth/profile`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     console.log(response.data);
//     localStorage.setItem('mail', response.data.email);
//     setCredits(response.data.credits); // ici on met à jour l'état credits avec la valeur obtenue depuis la réponse de l'API

//   } catch (error) {
//     console.log("Erreur");
//     console.error(error);
//   } finally {
//     setCreditsLoading(false); // Fin du chargement
//   }
// };


  // useEffect(() => {
  //   if (isLoggedIn) {
  //     fetchCredits();
  //   }
  // }, [isLoggedIn]);

  return (
    <>
      <header>
        <Link to="/" >
          <img src={logoPoesis} alt="logoPoesis"/>
        </Link>
        {isLoggedIn && (
          <div>
            {/* <div id="creditsDiv">
              <img src={iconCredits}  onClick={openModal}/>
              {!creditsLoading ? <p onClick={openModal}>{credits}</p> : <p>0</p>}
            </div> */}
            {/* <Modal
              isOpen={modalIsOpen}
              onRequestClose={resetOption}
              contentLabel="Recharger crédits"
              className="creditsContainer"
            >
              <img src={closeCredits} onClick={closeModal} />
             
              {!selectedOption ? (
                <div className="purchase-options">
                  <button className='purchase-buttons' onClick={() => purchaseOption(20, 29.99)}>
                    Acheter 20 crédits pour 29,99€
                  </button>
                  <button className='purchase-buttons' onClick={() => purchaseOption(50, 69.99)}>
                    Acheter 50 crédits pour 69,99€
                  </button>
                  <button className='purchase-buttons' onClick={() => purchaseOption(100, 99.99)}>
                    Acheter 100 crédits pour 99,99€
                  </button>
                </div>
              ) : (
                <PaymentModule fetchCredits={fetchCredits} credits={selectedOption?.credits} amount={selectedOption?.value} />

              )}
            </Modal> */}

            <Link to="/user-profile">
              <img src={iconProfil} alt="icone profil" id="iconProfil" />
              Profil
            </Link>
                        <Link to="/generate-poem">
              <img src={ecrirePoem} alt="ecrire un poème"/>
              Poème
            </Link>
            <Link onClick={handleLogout} to="/">
              <img src={iconLogout} alt="deconnexion"/>
              Deconnexion
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Navigation;

