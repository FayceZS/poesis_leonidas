
import loadingPoem from "../img/loadingPoem.mp4";
import "./bootstrapSpinner.css";
import loadingLogo from "../img/logoLoading.svg";

function BootstrapSpinner() {
  return (
    <>
        <div id="loadingDiv">
        {/* <h3 id="loadingTitle" className='animate__animated animate__flipInY '>Votre poème est en cours d'écriture.....</h3> */}
       
            {/* <video
              src={loadingPoem}
              alt="Connexion réussie"
              id="loadingPoem"
              className="w-100"
              autoPlay
              muted
              loop
            /> */}
      


        <img src={loadingLogo} id="loadingLogo"/>

      
      
      </div>
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button> */}
    </>
  );
}

export default BootstrapSpinner;