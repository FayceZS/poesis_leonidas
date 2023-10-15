import React from 'react';
import { Link } from 'react-router-dom';
import "./footer.css";

export default function Footer() {
  return (
    <footer>
        <div id="footerDiv">
            <ul>
                <li><Link to="/mentions-legales">Mentions légales</Link></li>
                <li>Contact</li>
                <li>Copyright © 2023</li>
            </ul>
        </div>
    </footer>
  );
}
