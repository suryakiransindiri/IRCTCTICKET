import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlertMessage("Please enter a valid email address.");
      setAlertType("danger");
      setShowAlert(true);
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8082/api/subscribe", null, {
        params: { email },
      });
      setAlertMessage("Thank you for subscribing!");
      setAlertType("success");
      setShowAlert(true);
      setEmail("");
    } catch (error) {
      setAlertMessage(
        error.response?.status === 409
          ? "This email is already subscribed."
          : "An error occurred. Please try again."
      );
      setAlertType("warning");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <footer className="footer py-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* Branding & About */}
          <div className="col-md-3">
            <h4 className="text-primary fw-bold">Track Vision</h4>
            <p className="text-dark">
              Your trusted railway reservation system. Book hassle-free and
              travel with ease.
            </p>
            <Link to="/about-us" className="footer-link">
              Learn More
            </Link>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5 className="text-primary fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="footer-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-md-3">
            <h5 className="text-primary fw-bold">Contact</h5>
            <p>
              <FaEnvelope className="me-2 text-primary" /> support@trainres.com
            </p>
            <p>
              <FaPhone className="me-2 text-primary" /> +91 8106067974
            </p>
            <Link to="/contact-us" className="footer-link">
              Contact Support
            </Link>
          </div>

          {/* Social Media */}
          <div className="col-md-3">
            <h5 className="text-primary fw-bold">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="https://facebook.com" className="social-icon">
                <FaFacebook size={25} />
              </a>
              <a href="https://instagram.com" className="social-icon">
                <FaInstagram size={25} />
              </a>
              <a href="https://twitter.com" className="social-icon">
                <FaTwitter size={25} />
              </a>
              <a href="https://youtube.com" className="social-icon">
                <FaYoutube size={25} />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="text-center mt-4">
          <h5 className="text-primary fw-bold">Join Our Newsletter</h5>
          <p className="text-dark">
            Get the latest updates and exclusive deals directly in your inbox!
          </p>

          {showAlert && (
            <div
              className={`alert alert-${alertType} text-center`}
              role="alert"
            >
              {alertMessage}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center"
          >
            <input
              type="email"
              className="form-control w-50 me-2 border-primary"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Subscribing..." : <BsFillSendFill />}
            </button>
          </form>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4 border-top pt-3">
          <p className="text-dark">
            &copy; {new Date().getFullYear()} Train Booking. All Rights
            Reserved.
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .footer {
            background: #ffffff;
            box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.1); /* Subtle top shadow */
          }
          .footer-link {
            color: #007bff;
            transition: color 0.3s;
            text-decoration: none;
            font-weight: 500;
          }
          .footer-link:hover {
            color: #0056b3;
          }
          .social-icon {
            color: #007bff;
            transition: transform 0.3s ease-in-out, color 0.3s;
          }
          .social-icon:hover {
            transform: scale(1.2);
            color: #0056b3;
          }
          .btn-primary {
            background: linear-gradient(90deg, #007bff, #0056b3);
            border: none;
            color: white;
            transition: background 0.3s ease-in-out;
          }
          .btn-primary:hover {
            background: linear-gradient(90deg, #0056b3, #003d80);
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
