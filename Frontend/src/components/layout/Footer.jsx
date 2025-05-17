import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

function Footer() {
  const footerLinks = [
    { title: 'Features', path: '/features' },
    { title: 'Pricing', path: '/pricing' },
    { title: 'Resources', path: '/resources' },
    { title: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <Logo size="md" />
              <span className="brand-name">TaskBoard Pro</span>
            </div>
          </div>

          <nav className="footer-nav">
            <div className="footer-links">
              {footerLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="footer-link"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} TaskBoard Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
