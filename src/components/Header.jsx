import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-3">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Empty div for balance (left side) */}
        <div className="w-25"></div>

        {/* Centered Logo */}
        <div className="w-50 text-center">
          <h1 className="h4 mb-0 fw-bold" style={{ color: "black", marginLeft: "-40px" }}>AZURE CARS</h1>
        </div>

        {/* Address on the right */}
        <div className="w-25 text-end">
          <p className="mb-0 text-muted small">
            123 Marine Drive, Kochi, Kerala 682031
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;