import React, { useState,useEffect } from "react";
import { Container, Form, Card, Button } from "react-bootstrap";
import BootstrapSpinner from "./bootstrapSpinner";
// import GeneratedPoem from "./generatedPoem";
import GeneratedPoemTest from "./generatedPoem";
import "./form.css";
import carteMentale from "../img/carteMentale.png"
import petitCoeur from "../img/petitCoeur.png"
import mariage from "../img/mariage.png"
import birthday from "../img/birthday.png"
import amis from "../img/amis.png";
import baby from "../img/baby.png";
import man from "../img/man.png"
import woman from "../img/woman.png"
import mom from "../img/mom.png"
import retraite from "../img/retraite.png"
import drame from "../img/drame.png"
const backendUrl = "https://pure-stream-14786.herokuapp.com/generate-poem";

// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const PoemForm = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [firstName, setFirstName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [author, setAuthor] = useState("");
  const [poem, setPoem] = useState("");
  const [signataire, setSignataire] = useState("");
  const [loadingPage, setloadingPage] = useState(false);
  const [occasionToUse, setOccasionToUse] = useState('');


 useEffect(() => {
      console.log(loadingPage);
    }, [loadingPage]); 

  async function fetchPoem(prompt) {
    
    
  try {
    
    
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      // console.log(response);
      const data = await response.json();
      const generatedPoem = data.poem;
      // Utilisez ici generatedPoem comme vous le souhaitez
      const poemTextOnly = generatedPoem
        .replace(/<br\s*\/?>/gi, "\n") // Remplace les balises <br> par des sauts de ligne
        .replace(/<\/?[^>]+(>|$)/g, " "); // Supprime les autres balises HTML

      setPoem(poemTextOnly);
      setloadingPage(false);
    } else {
      console.error("Erreur lors de la récupération du poème");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du poème:", error);
  }
  
}

  const handleSubmit = (e) => {
    setloadingPage(true);
    
    e.preventDefault();
    
  // Traitez les données du formulaire ici
  const prompt = `Ecris mois un poème ${occasion} pour ${gender} qui s'appelle ${firstName} en t'inspirant de ${author}, ta réponse devra contenir uniquement le poème et rien d'autre, de plus le poème devra être mis en forme de façon HTML et le poème devra faire 10 lignes et il devra être en français, il devra également comporter la signature de ${signataire} sur la dernière ligne.`;
   // Appeler fetchPoem avec le prompt construit
  fetchPoem(prompt);
  // Réinitialisez les états du formulaire
  setOccasionToUse(occasion);
  resetStates();
};

  const resetStates = () => {
    setGender('');
    setFirstName('');
    setOccasion('');
    setAuthor('');
    setSignataire('');
    setPoem('');
  // Réinitialisez ici les autres états
  // Exemple : setFirstName('');
  };
  
  const poemDisplay = (poem) => {
  const lines = poem.split('\n');
  const formattedLines = lines.map((line, index) => {
    const isLineEmpty = !line.trim(); // Vérifier si la ligne est vide
    const commonProps = { // Les propriétés communes
      key: index, 
      className: "poemLine",
      contentEditable: 'true',
      style: isLineEmpty ? { display: 'none' } : {} // Si la ligne est vide, mettre display à 'none'
    };
    if (index > 0 && index % 4 === 0) {
      return (
        <React.Fragment key={index}>
          <p {...commonProps} style={{ ...commonProps.style, marginTop: '1rem' }}>{line}</p>
        </React.Fragment>
      );
    } else {
      return (
        <p {...commonProps}>
          {line}
        </p>
      );
    }
  });
  return formattedLines;
};

  // const setLoading = () => {
  //   if (step === 5 && poem.length === 0) {
  //     setIsLoading(true);
  //     console.log(isloading);
  //   } else {
  //     setIsLoading(false);
  //     console.log(isloading);
  //   }
  // }
useEffect(() => {
  console.log('Occasion changed: ', occasion);
}, [occasion]);
  return (
    <Container>
      <Form onSubmit={handleSubmit} style={step === 5 ? { display: "none" } : {}}>
        <Card>
          <Card.Body>
            {step === 1 && (
              
              <Form.Group className="formController show" controlId="gender" >
                <div className="formQuestion">
                  <Form.Label className="animate__animated animate__zoomInUp">
                    Le poème est pour un homme ou une femme ?
                    
                  </Form.Label>
                  {/* <img src={genre} /> */}
                </div>
               
                <div className="formCheckDiv">
                <div className="occasionChoix">
                <Form.Check
                  type="radio"
                  id="option1" 
                  name="options"
                  label="Une femme"
                  onChange={(e) => setGender(e.target.value)}
                  value="une femme"
                    />
                    <img src={woman} className="animate__animated animate__flipInY" alt="femme"/>
                  </div> 
                  <div className="occasionChoix">
                <Form.Check
                  type="radio"
                  id="option2"
                  name="options"
                  label="Un homme"
                  onChange={(e) => setGender(e.target.value)}
                  value="un homme"
                    />
                    <img src={man} className="animate__animated animate__flipInY" alt="homme"/>
                  </div>
                </div>
              </Form.Group>
            )} 

            {step === 2 && (
              <Form.Group controlId="firstName" className="formController show">
                <div>
                <Form.Label >Quel est son prénom ?</Form.Label>
                <img src={carteMentale} id="prenomImg" className="animate__animated animate__flip" alt="prenom"/>
                </div>
                <Form.Control
                  type="text"
                  placeholder="Entrez le prénom ici"
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  id="prenomBox"
                />
                <div>
                <Form.Label >Par qui le poème doit-il être signé ?</Form.Label>
                
                </div>
                <Form.Control
                  type="text"
                  placeholder="Entrez le prénom ici"
                  onChange={(e) => setSignataire(e.target.value)}
                  value={signataire}
                  id="prenomBox"
                />
                
              </Form.Group>
              
            )}

            {step === 3 && (
              <Form.Group controlId="occasion" className="formController show">
                <Form.Label>
                  Quelle est l'occasion à utiliser pour ce poème ?
                </Form.Label>
                
              <div className="occasionChoix">
                <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="L'amour"
                onChange={(e) => setOccasion(e.target.value)}
                    value="d'amour"
                    className="animate__animated animate__backInRight"
        />
        <img src={petitCoeur} id="petitCoeur" className="animate__animated animate__backInRight" alt="petit coeur"/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option2"
                name="options"
                label="Demande en mariage"
                onChange={(e) => setOccasion(e.target.value)}
                    value="pour une demande en mariage"
                    className="animate__animated animate__backInRight"
        />
        <img src={mariage} className="animate__animated animate__backInRight" alt="mariage"/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option3"
                name="options"
                label="Un anniversaire"
                onChange={(e) => setOccasion(e.target.value)}
                    value="d'anniversaire"
                    className="animate__animated animate__backInRight"
        />
        <img src={birthday} className="animate__animated animate__backInRight" alt="anniversaire"/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option4"
                name="options"
                label="Une amitié"
                onChange={(e) => setOccasion(e.target.value)}
                    value="d'amitié"
                    className="animate__animated animate__backInRight"
        /> 
        <img src={amis} className="animate__animated animate__backInRight" alt="amitié"/>
        </div>
        <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option5"
                name="options"
                label="Une naissance"
                onChange={(e) => setOccasion(e.target.value)}
                    value="de naissance"
                    className="animate__animated animate__backInRight"
        />
                  <img src={baby} className="animate__animated animate__backInRight" alt="naissance" />
                </div>
               <div className="occasionChoix">
   <Form.Check
     type="radio"
     id="option6"
     name="options"
     label="Spécial maman"
     onChange={(e) => setOccasion(e.target.value)}
     value="spécialement pour ma maman "
     className="animate__animated animate__backInRight"
   />
   <img src={mom} className="animate__animated animate__backInRight" alt="fete des mères"/>
</div>
        
                 <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option5"
                name="options"
                label="Une retraite"
                onChange={(e) => setOccasion(e.target.value)}
                    value="pour souhaiter une bonne retraite profesionnelle"
                    className="animate__animated animate__backInRight"
        />
                  <img src={retraite} className="animate__animated animate__backInRight" alt="retraite" />
                </div>
                <div className="occasionChoix">
        <Form.Check
                type="radio"
                id="option5"
                name="options"
                label="Un hommage"
                onChange={(e) => setOccasion(e.target.value)}
                    value="pour lui rendre hommage suite à son décès"
                    className="animate__animated animate__backInRight"
        />
                  <img src={drame} className="animate__animated animate__backInRight" alt="retraite" />
                </div>
                
              </Form.Group>
            )}

            {step === 4 && (
              <Form.Group controlId="author" className="formController show ">
                <Form.Label>
                  De quel auteur doit-on s'inspirer pour ce poème ? 
                </Form.Label>
               
                  <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="William Shakespeare"
                onChange={(e) => setAuthor(e.target.value)}
                  value="William Shakespeare"
                  className="animate__animated animate__lightSpeedInLeft"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Victor Hugo"
                onChange={(e) => setAuthor(e.target.value)}
                  value="Victor Hugo"
                  className="animate__animated animate__lightSpeedInLeft"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Pierre de Ronsard"
                onChange={(e) => setAuthor(e.target.value)}
                  value="Pierre de Ronsard"
                  className="animate__animated animate__lightSpeedInLeft"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Arthur Rimbaud"
                onChange={(e) => setAuthor(e.target.value)}
                  value="Arthur Rimbaud"
                  className="animate__animated animate__lightSpeedInLeft"
        />
        <Form.Check
                type="radio"
                id="option1"
                name="options"
                label="Joachim Du Bellay"
                onChange={(e) => setAuthor(e.target.value)}
                  value="Joachim Du Bellay"
                  className="animate__animated animate__lightSpeedInLeft"
        />
                
              </Form.Group>
            )}

            <div className="d-flex justify-content-between"
              style={step === 5 ? { display: "none" } : {}}>
              {step > 1 && (
                <Button  className="formButton" variant="none" onClick={() => setStep(step - 1)}>
                  Précédent
                  
                </Button>
              )}

              {step <= 4 ? (
                <Button type="button" variant="none" className="formButton" onClick={() => setStep(step <= 4 ? step + 1 : 5)}>Suivant</Button>

              ) : (
                  <Button type="submit">Soumettre</Button>
                  
              )}
            </div>
          </Card.Body>
        </Card>
      </Form>
      {step === 5 && (
        <Card id="poem">
          {loadingPage ? <BootstrapSpinner /> :
           
          <GeneratedPoemTest
          poemDisplay={poemDisplay}
          poem={poem}
          setStep={setStep}
          resetStates={resetStates}
              occasion={occasionToUse}
              
              />
            

          }
  </Card>
)} 

    </Container>
    
  );
};

export default PoemForm;