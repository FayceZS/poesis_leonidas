import React, { useRef, useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactToPrint from 'react-to-print';
import smileyAmoureux from '../img/smileyAmoureux.png';
import './generatedPoem.css';
import axios from 'axios';
const backendUrl = "https://pure-stream-14786.herokuapp.com";

function GeneratedPoemTest({ poem, occasion, poemDisplay, setStep, resetStates}) {
  
  console.log("Au début de GeneratedPoemTest, occasion est: ", occasion);
  const poemRef = useRef();
  const occasionRef = useRef(occasion);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [padding, setPadding] = useState('40');
  const [fontColor, setFontColor] = useState('black');
  const [fontWeight, setFontWeight] = useState('400');
  const [fontFamily, setFontFamily] = useState('Sacramento');
  const [fontSize, setFontSize] = useState('20');
  const [credits, setCredits] = useState(0);


  const fetchCredits = async () => {
  const token = localStorage.getItem('authToken');
  const response = await axios.get(`${backendUrl}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
  });
    
  setCredits(response.data.credits); // supposons que les crédits sont dans response.data.credits
}
  
  useEffect(()=> {
      fetchCredits(); 
  },[])


const fetchUserBackgroundImage = async () => {
  console.log("Au début de fetchUserBackgroundImage, occasion est: ", occasionRef.current);
  try {
    const token = localStorage.getItem('authToken');
    
    const response = await axios.get(`${backendUrl}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response.data);
    
    if (occasionRef.current === "d'amour" && occasionRef.current.length > 1) {
      
      setBackgroundImage(response.data.backgroundImageAmour);
      
        setLoading(false);
      
        } else if (occasionRef.current === "pour une demande en mariage") {
            setBackgroundImage(response.data.backgroundImageMariage);
            setLoading(false);
        } else if (occasionRef.current === "d'anniversaire") {
            setBackgroundImage(response.data.backgroundImageAnniversaire);
            setLoading(false);
        } else if (occasionRef.current === "d'amitié") {
            setBackgroundImage(response.data.backgroundImageAmitie);
           setLoading(false);
      } else if (occasionRef.current === "de naissance") {
        
            setBackgroundImage(response.data.backgroundImageNaissance);
            setLoading(false);
        } else if (occasionRef.current === "spécialement pour ma maman ") {
        // setBackgroundImage(response.data.backgroundImageFeteDesMeres);
      setBackgroundImage(response.data.backgroundImageFeteDesMeres);
      setLoading(false);
    }
    else if (occasionRef.current === "pour lui rendre hommage suite à son décès") {
        // setBackgroundImage(response.data.backgroundImageFeteDesMeres);
      setBackgroundImage(response.data.backgroundImageHommage);
      setLoading(false);
    }
    else {
      
      setLoading(false);
      console.log("Pas d'occasion")
      }
    
    
  } catch (error) {
    console.log("Erreur");
    console.error(error);
    setLoading(false);
    // Ici, la gestion d'erreur semble incorrecte, car on ne peut pas utiliser une variable qui n'a pas été définie en cas d'erreur
    // Vous pourriez définir une image par défaut en cas d'erreur
    // setBackgroundImage('url_de_votre_image_par_defaut');
  }
};

  

  useEffect(() => {
  if (occasionRef.current) {
    fetchUserBackgroundImage();
  }
}, []);
  
  const style = {
  color: fontColor,
  fontWeight: fontWeight,
    fontSize: `${fontSize}px`,
  fontFamily: fontFamily
  };
  
const updateCredits = async () => {
  try {
    const token = localStorage.getItem('authToken');
    
    // Récupérez d'abord le profil de l'utilisateur pour obtenir le nombre actuel de crédits
    const response = await axios.get(`${backendUrl}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const currentCredits = response.data.credits;

    // Vérifiez si l'utilisateur a suffisamment de crédits
    if (currentCredits <= 0) {
      alert("Désolé, vous n'avez pas suffisamment de crédits pour imprimer.");
      return false;
    }
    else {
      // Soustrayez 1 du nombre actuel de crédits
    const updatedCredits = currentCredits - 1;

    // Mettez à jour le profil avec les nouveaux crédits
    await axios.put(`${backendUrl}/auth/profile`, { credits: updatedCredits }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
      return true
    }

    

    // Vous pouvez ajouter d'autres actions à effectuer après la mise à jour des crédits
    // Par exemple, recharger la page ou mettre à jour l'affichage des crédits sur l'interface utilisateur

  } catch (error) {
    console.error(error);
  }
};

  


  useEffect(() => {
  const poemLines = document.querySelectorAll('.poemLine');
  poemLines.forEach((line) => {
    Object.assign(line.style, style);
  });
}, [fontColor, fontWeight, fontFamily,fontSize]); 


  return (
    loading ? null :
    <>
      <div className="print-container">
        <Card className="generatedPoemContainer print-card">
          <Card.Header className="bravoText">
            Bravo ! voici votre chef d'oeuvre{' '}
            <img src={smileyAmoureux} id="imgBravo" alt="smiley coeur"/>
          </Card.Header>
          <div className="style-controls">
            <div>
              <label htmlFor="commonPadding">Padding : </label>
                          <input
                            id="commonPadding"
                            type="number"
                            value={padding}
                            onChange={(e) => setPadding(e.target.value)}
                          />
            </div>
            <div>
             <label htmlFor="fontSize">Taille  : </label>
            <input
              id="fontSizeSelector"
              type="number"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            /> 
            </div>

            <div>
              <label htmlFor="fontColor">Couleur : </label>
            <input
              id="fontColor"
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
            />
            </div>
            <div>
              <label htmlFor="fontWeight">Gras : </label>
            <select
              id="fontWeight"
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
            >
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              <option value="700">700</option>
            </select>
            </div>
            <div>
              <label htmlFor="fontFamily">Police : </label>
            <select
              id="fontFamily"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
                 <option class="option-lato" value="Lato">Lato</option>
                <option class="option-sacramento" value="Sacramento">Sacramento</option>
                <option class="option-arial" value="Arial">Arial</option>
                <option class="option-verdana" value="Verdana">Verdana</option>
                <option class="option-times" value="Times New Roman">Times New Roman</option>
                <option class="option-roboto" value="Roboto">Roboto</option>
                <option class="option-dosis" value="Dosis">Dosis</option>
                <option class="option-lora" value="Lora">Lora</option>
 
            </select>
            </div>
            
            
</div>
          <Card.Body id="generatedPoemContainer">
            <div
              className="print-content cardBackground"
              ref={poemRef}
              style={{ backgroundImage: `url(${backgroundImage})`,padding : `${padding}px` }}
            >
              
              {poemDisplay(poem)}
            </div>
        </Card.Body>
          <div className="generatedPoemButtonsDiv">
            <Button
              type="button"
              onClick={() => {
                setStep(1);
                resetStates();
              }}
              className="generatedPoemButton"
            >
              Recommencer
            </Button>
            {credits > 0 ? (
                <ReactToPrint
  trigger={() => (
    <Button
      type="button"
      variant="success"
      className="generatedPoemButton"
      disabled={loading}
    >
      Imprimer
    </Button>
  )}
  content={() => poemRef.current}
  onAfterPrint={updateCredits}
/>
                ) : (
                  <Button
                    type="button"
                    variant="success"
                    className="generatedPoemButton"
                    disabled={loading} // also disable the print button while the request is being processed
                    onClick={() => alert("Désolé, vous n'avez pas suffisamment de crédits pour imprimer.")}
                  >
                    Imprimer
                  </Button>
                )}
                
             
          </div>
        </Card>
      </div>
    </>
  );
}

export default GeneratedPoemTest;
