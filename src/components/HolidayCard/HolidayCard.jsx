import React, { useState } from "react";
import "./HolidayCard.css";

export function HolidayTable({ holidays }) {
  const [sortKey, setSortKey] = useState("date");

  // Remove duplicate holidays based on the `date` property
  const uniqueHolidays = holidays.filter(
    (holiday, index, self) =>
      index === self.findIndex((h) => h.date === holiday.date)
  );

  // Sort holidays based on the selected sort key
  const sortedHolidays = [...uniqueHolidays].sort((a, b) => {
    if (sortKey === "local") return a.localName.localeCompare(b.localName);
    if (sortKey === "english") return a.name.localeCompare(b.name);
    return new Date(a.date) - new Date(b.date);
  });

  // Display a message if no holidays are available
  if (!sortedHolidays.length) {
    return <p className="no-holidays">No holidays to display.</p>;
  }

  return (
    <div className="holiday-card-container">
            <div className="header">
        <span className="total-holidays">
          Total Holidays: {sortedHolidays.length}
        </span>
        <div className="sort-container">
          <label className="sort-label">Sort by:</label>
          <select
            className="sort-select"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
          >
            <option value="date">Date</option>
            <option value="local">Local Name</option>
            <option value="english">English Name</option>
          </select>
        </div>
      </div>

            <div className="holiday-grid">
        {sortedHolidays.map((holiday) => (
          <div key={holiday.date} className="holiday-card">
            <h3 className="holiday-local-name">{holiday.localName}</h3>
            <p className="holiday-english-name">{holiday.name}</p>
            <p className="holiday-date">{holiday.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
