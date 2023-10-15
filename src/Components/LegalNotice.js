import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './legalNotice.css';

const LegalNotice = () => (
  <Container id="legalNoticeContainer">
    <Row className="mb-4">
      <Col>
        <h1>MENTIONS LÉGALES</h1>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <p>
          Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site Poesis.app l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Edition du site</h2>
        <p>
          Le présent site, accessible à l’URL <a href="https://poesis.app">https://poesis.app</a> (le « Site »), est édité par :
          Poesis SAS, société au capital de 1 euros, inscrite au R.C.S. de PARIS sous le numéro 952 737 674 R.C.S. Paris, dont le siège social est situé au 78 Avenue des Champs-Élysées 75008 Paris, représenté(e) par Fayssal IBRAHIMI dûment habilité(e).
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Hébergement</h2>
        <p>
          Le Site est hébergé par la société Google LLC, situé 1600 Amphitheatre Pkwy Mountain View CA 94043 United States of America, (contact téléphonique ou email : +16502530000).
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Directeur de publication</h2>
        <p>
          Le Directeur de la publication du Site est Fayssal IBRAHIMI .
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Nous contacter</h2>
        <p>
          Par téléphone : +33769815774
          <br />
          Par email : <a href="mailto:fayssalibrahimi@gmail.com">fayssalibrahimi@gmail.com</a>
          <br />
          Par courrier : 78 Avenue des Champs-Élysées 75008 Paris
        </p>
      </Col>
    </Row>

    <Row>
      <Col>
        <p>
          Génération des mentions légales par Legalstart.
        </p>
      </Col>
    </Row>
  </Container>
);

export default LegalNotice;
