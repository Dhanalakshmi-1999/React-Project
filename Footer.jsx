
import {
  FaInstagram,
  FaFacebookF,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">

        {/* LEFT SIDE: RESTAURANT BRAND */}
        <div className="footer-about">
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">S</span>

            <span>
              Vanadxs<span className="brand-dot">.</span>
            </span>
          </Link>

          <p className="footer-description">
            Delicious food, memorable moments, and a dining
            experience made with love.
          </p>
        </div>

        {/* RIGHT SIDE: SOCIAL MEDIA ICONS */}
        <div className="footer-socials">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            <FaXTwitter />
          </a>

          <a
            href="https://www.whatsapp.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Vanadxs Restaurant. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;


