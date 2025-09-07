import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <div className="container p-3">
        <div className="row">
          {/* Company Name and Contact Info (Left Section) */}
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0 text-lg-start">
            <h5 className="text-uppercase">Azure Cars</h5>
            <p className="text-muted">
              123 Marine Drive, Kochi, Kerala 682031<br />
              Phone: +91-123-456-7890<br />
              Email: info@azurecars.com
            </p>
          </div>

          {/* Links and Quick Links (Right Section) */}
          <div className="col-lg-8 col-md-12 mb-4 mb-md-0 text-lg-end">
            <div className="d-flex justify-content-end mb-3">
              <ul className="list-unstyled d-inline-flex flex-wrap">
                <li className="me-4"><a href="/" className="text-dark">Home</a></li>
                <li className="me-4"><a href="/cars" className="text-dark">Cars</a></li>
                <li className="me-4"><a href="/about" className="text-dark">About</a></li>
                <li className="me-4"><a href="/contact" className="text-dark">Contact</a></li>
               
              </ul>
            </div>
            <div className="d-flex justify-content-end">
              <ul className="list-unstyled d-inline-flex">
                <li className="me-4"><a href="/terms" className="text-dark">Terms</a></li>
                <li className="me-4"><a href="/privacy" className="text-dark">Privacy</a></li>
                <li className="me-4"><a href="/faq" className="text-dark">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="text-center mt-3">
          <a href="https://facebook.com" className="text-dark me-3"><i className="bi bi-facebook"></i></a>
          <a href="https://twitter.com" className="text-dark me-3"><i className="bi bi-twitter"></i></a>
          <a href="https://instagram.com" className="text-dark"><i className="bi bi-instagram"></i></a>
        </div>
      </div>

      <div className="text-center p-2 bg-dark text-white">
        &copy; {new Date().getFullYear()} Azure Cars. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;