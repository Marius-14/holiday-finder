import React, { useState, useEffect } from "react";
import "./CountryForm.css"; // Import the CSS file

export function CountryForm({ onSubmit }) {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://date.nager.at/api/v3/AvailableCountries");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data = await response.json();
        setCountries(data);
        setSelectedCountry(data[0]?.countryCode || "");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedCountry);
  };

  if (loading) return <p className="loading-message">Loading countries...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="country-form-container">
      <form onSubmit={handleSubmit} className="country-form">
        <div className="form-group">
          <label className="form-label">Select Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="form-select"
          >
            {countries.map((country) => (
              <option key={country.countryCode} value={country.countryCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="form-button">
          Get Holidays
        </button>
      </form>
    </div>
  );
}
