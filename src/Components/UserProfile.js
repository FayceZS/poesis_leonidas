import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import "./userProfile.css";
import axios from 'axios';
const backendUrl = "https://pure-stream-14786.herokuapp.com";

const UserProfile = () => {
  const [email, setEmail] = useState('');
  const [password] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [backgroundImageAmour, setBackgroundImageAmour] = useState(null);
  const [backgroundImageMariage, setBackgroundImageMariage] = useState(null);
  const [backgroundImageAnniversaire, setBackgroundImageAnniversaire] = useState(null);
  const [backgroundImageAmitie, setBackgroundImageAmitie] = useState(null);
  const [backgroundImageNaissance, setBackgroundImageNaissance] = useState(null);
  const [backgroundImageFeteDesMeres, setBackgroundImageFeteDesMeres] = useState(null);
  const [backgroundImageRetraite, setBackgroundImageRetraite] = useState(null);
    const [backgroundImageHommage, setBackgroundImageHommage] = useState(null);

  const [newBackgroundImageAmour, setNewBackgroundImageAmour] = useState(null);
  const [newBackgroundImageMariage, setNewBackgroundImageMariage] = useState(null);
  const [newBackgroundImageAnniversaire, setNewBackgroundImageAnniversaire] = useState(null);
  const [newBackgroundImageAmitie, setNewBackgroundImageAmitie] = useState(null);
  const [newBackgroundImageNaissance, setNewBackgroundImageNaissance] = useState(null);
  const [newBackgroundImageFeteDesMeres, setNewBackgroundImageFeteDesMeres] = useState(null);
  const [newBackgroundImageRetraite, setNewBackgroundImageRetraite] = useState(null);
    const [newBackgroundImageHommage, setNewBackgroundImageHommage] = useState(null);

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleAddressChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value
    }));
  };

  const handleImageUploadAmour = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageAmour(e.target.files[0]);
    }
  };

  const handleImageUploadMariage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageMariage(e.target.files[0]);
    }
  };

  const handleImageUploadAnniversaire = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageAnniversaire(e.target.files[0]);
    }
  };

  const handleImageUploadAmitie = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageAmitie(e.target.files[0]);
    }
  };

  const handleImageUploadNaissance = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageNaissance(e.target.files[0]);
    }
  };

  const handleImageUploadFeteDesMeres = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageFeteDesMeres(e.target.files[0]);
    }
  };

  const handleImageUploadRetraite = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageRetraite(e.target.files[0]);
    }
  };
  const handleImageUploadHommage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setNewBackgroundImageHommage(e.target.files[0]);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${backendUrl}/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setEmail(response.data.email);
      setAddress(response.data.address);
      setBackgroundImageAmour(response.data.backgroundImageAmour);
      setBackgroundImageMariage(response.data.backgroundImageMariage);
      setBackgroundImageAnniversaire(response.data.backgroundImageAnniversaire);
      setBackgroundImageAmitie(response.data.backgroundImageAmitie);
      setBackgroundImageNaissance(response.data.backgroundImageNaissance);
      setBackgroundImageFeteDesMeres(response.data.backgroundImageFeteDesMeres);
      setBackgroundImageRetraite(response.data.backgroundImageRetraite);
            setBackgroundImageHommage(response.data.backgroundImageHommage);

      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

 const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
   console.log(formData.get('file'));
  const response = await axios.post(`${backendUrl}/auth/profile/upload`, formData, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
      // 'Content-Type': 'multipart/form-data'
    }
  });
  const backgroundImageField = response.data.imageUrl;
  return backgroundImageField
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');

      const profileData = {
        email,
        password,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country
      };

      if (newBackgroundImageAmour) {
        const imageUrl = await uploadImage(newBackgroundImageAmour);
        profileData.backgroundImageAmour = imageUrl;
        setBackgroundImageAmour(imageUrl);
      }
      if (newBackgroundImageMariage) {
        const imageUrl = await uploadImage(newBackgroundImageMariage);
        profileData.backgroundImageMariage = imageUrl;
        setBackgroundImageMariage(imageUrl);
      }
      if (newBackgroundImageAnniversaire) {
        const imageUrl = await uploadImage(newBackgroundImageAnniversaire);
        profileData.backgroundImageAnniversaire = imageUrl;
        setBackgroundImageAnniversaire(imageUrl);
      }
      if (newBackgroundImageAmitie) {
        const imageUrl = await uploadImage(newBackgroundImageAmitie);
        profileData.backgroundImageAmitie = imageUrl;
        setBackgroundImageAmitie(imageUrl);
      }
      if (newBackgroundImageNaissance) {
        const imageUrl = await uploadImage(newBackgroundImageNaissance);
        profileData.backgroundImageNaissance = imageUrl;
        setBackgroundImageNaissance(imageUrl)
      }
      if (newBackgroundImageFeteDesMeres) {
        const imageUrl = await uploadImage(newBackgroundImageFeteDesMeres);
        profileData.backgroundImageFeteDesMeres = imageUrl;
        setBackgroundImageFeteDesMeres(imageUrl);
      }
      if (newBackgroundImageRetraite) {
        const imageUrl = await uploadImage(newBackgroundImageRetraite);
        profileData.backgroundImageRetraite = imageUrl;
        setBackgroundImageRetraite(imageUrl);
      }
      if (newBackgroundImageHommage) {
        const imageUrl = await uploadImage(newBackgroundImageHommage);
        profileData.backgroundImageHommage = imageUrl;
        setBackgroundImageHommage(imageUrl);
      }

      await axios.put(`${backendUrl}/auth/profile`, profileData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setSuccessMessage('Votre profil a été mis à jour avec succès.');
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur s\'est produite lors de la mise à jour de votre profil. Veuillez réessayer.');
      setSuccessMessage('');
    }
  }

   return (
    <div id="userProfileContainer">
      <h1>Profil</h1>
       <Form onSubmit={handleSubmit}>
         <div className='userProfileInfo'>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
         <Form.Group controlId="formStreet">
          <Form.Label>No et Rue:</Form.Label>
          <Form.Control type="text" value={address.street} onChange={(e) => handleAddressChange('street', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formCity">
          <Form.Label>Ville:</Form.Label>
          <Form.Control type="text" value={address.city} onChange={(e) => handleAddressChange('city', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formState">
          <Form.Label>Région:</Form.Label>
          <Form.Control type="text" value={address.state} onChange={(e) => handleAddressChange('state', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPostalCode">
          <Form.Label>Code postal:</Form.Label>
          <Form.Control type="text" value={address.postalCode} onChange={(e) => handleAddressChange('postalCode', e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formCountry">
          <Form.Label>Pays:</Form.Label>
          <Form.Control type="text" value={address.country} onChange={(e) => handleAddressChange('country', e.target.value)} />
         </Form.Group>
         </div>
         <div className='userProfileImgOptions'>
  <Form.Group>
    <Form.Label>Carte amour :</Form.Label>
    <Form.Control id="uploadAmour" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadAmour} />
    <label htmlFor="uploadAmour" className="custom-file-upload">Modifier</label>  
    <div className='userProfileImg' style={{
      backgroundImage: `url(${backgroundImageAmour})`,
    }}></div>
  </Form.Group>
  <Form.Group>
    <Form.Label>Carte mariage :</Form.Label>
    <Form.Control id="uploadMariage" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadMariage} />
    <label htmlFor="uploadMariage" className="custom-file-upload">Modifier</label>  
    <div className='userProfileImg' style={{
      backgroundImage: `url(${backgroundImageMariage})`,
    }}></div>
  </Form.Group>
  <Form.Group>
    <Form.Label>Carte amitié :</Form.Label>
    <Form.Control id="uploadAmitie" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadAmitie} />
    <label htmlFor="uploadAmitie" className="custom-file-upload">Modifier</label>  
    <div className='userProfileImg' style={{
      backgroundImage: `url(${backgroundImageAmitie})`,
    }}></div>
  </Form.Group>
  <Form.Group>
    <Form.Label>Carte Naissance :</Form.Label>
    <Form.Control id="uploadNaissance" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadNaissance} />
    <label htmlFor="uploadNaissance" className="custom-file-upload">Modifier</label>  
    <div className='userProfileImg' style={{
      backgroundImage: `url(${backgroundImageNaissance})`,
    }}></div>
  </Form.Group>
  <Form.Group>
    <Form.Label>Carte Anniversaire :</Form.Label>
    <Form.Control id="uploadAnniversaire" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadAnniversaire} />
    <label htmlFor="uploadAnniversaire" className="custom-file-upload">Modifier</label>  
    <div className='userProfileImg' style={{
      backgroundImage: `url(${backgroundImageAnniversaire})`,
    }}></div>
  </Form.Group>
  <Form.Group>
    <Form.Label>Carte spécial maman :</Form.Label>
    <Form.Control id="uploadFeteDesMeres" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadFeteDesMeres} />
    <label htmlFor="uploadFeteDesMeres" className="custom-file-upload">Modifier</label>  
    <div className='userProfileImg' style={{
      backgroundImage: `url(${backgroundImageFeteDesMeres})`,
    }}></div>
  </Form.Group>
   <Form.Group>
      <Form.Label>Carte retraite :</Form.Label>
      <Form.Control id="uploadRetraite" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadRetraite} />
      <label htmlFor="uploadRetraite" className="custom-file-upload">Modifier</label>  
      <div className='userProfileImg' style={{
        backgroundImage: `url(${backgroundImageRetraite})`,
      }}></div>
           </Form.Group>
           <Form.Group>
      <Form.Label>Carte hommage :</Form.Label>
      <Form.Control id="uploadHommage" style={{display: 'none'}} type="file" accept="image/*" onChange={handleImageUploadHommage} />
      <label htmlFor="uploadHommage" className="custom-file-upload">Modifier</label>  
      <div className='userProfileImg' style={{
        backgroundImage: `url(${backgroundImageHommage})`,
      }}></div>
    </Form.Group>
</div>     
        {successMessage && (
          <Form.Text className="text-success">
            {successMessage}
          </Form.Text>
        )}
        <Button variant="primary" type="submit" className='userProfileButton'>
          Enregistrer
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile; 