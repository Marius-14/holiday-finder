import React, { useState } from "react";
import "./App.css";
import { CountryForm } from "./components/CountryForm/CountryForm";
import { HolidayTable } from "./components/HolidayCard/HolidayCard";

function App() {
  const [holidays, setHolidays] = useState([]);

  const fetchHolidays = async (countryCode) => {
    const year = new Date().getFullYear();
    const response = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`
    );
    const data = await response.json();
    setHolidays(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 transform transition duration-500 hover:scale-105">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-indigo-700 flex items-center justify-center gap-3 animate-bounce">
          Public Holiday Finder
        </h1>
        <CountryForm onSubmit={fetchHolidays} />
        <div className="mt-8">
          <HolidayTable holidays={holidays} />
        </div>
      </div>
    </div>
  );
}

export default App;

