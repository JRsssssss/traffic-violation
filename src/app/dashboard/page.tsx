"use client";
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockData = [
  { id: 1, location: "Main Street", type: "Speeding", count: 5, date: "2024-03-01" },
  { id: 2, location: "Highway 21", type: "Red Light", count: 3, date: "2024-03-02" },
  { id: 3, location: "Elm Ave", type: "Illegal Parking", count: 2, date: "2024-03-03" },
  { id: 4, location: "Baker St", type: "Speeding", count: 4, date: "2024-03-04" },
  { id: 5, location: "5th Ave", type: "Seatbelt Violation", count: 1, date: "2024-03-05" },
  { id: 6, location: "Sunset Blvd", type: "Speeding", count: 6, date: "2024-03-06" },
  { id: 7, location: "Lakeview Dr", type: "Illegal Parking", count: 2, date: "2024-03-07" },
  { id: 8, location: "Central Park", type: "Speeding", count: 5, date: "2024-03-08" },
  { id: 9, location: "Hill Rd", type: "Red Light", count: 3, date: "2024-03-09" },
  { id: 10, location: "Broadway", type: "Seatbelt Violation", count: 2, date: "2024-03-10" },
];

const getTopViolations = () => {
    const counts: Record<string, number> = mockData.reduce((acc, { type, count }) => {
      acc[type] = (acc[type] || 0) + count;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
};
  
  const getTopLocations = () => {
    const counts: Record<string, number> = mockData.reduce((acc, { location, count }) => {
      acc[location] = (acc[location] || 0) + count;
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
};

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const filteredData = mockData.filter(
    (item) =>
      (selectedType === "All" || item.type === selectedType) &&
      (selectedDate === "" || item.date === selectedDate)
  );

  return (
    <div className="p-6 bg-[#CFE4F0] rounded-lg h-auto">
      <h1 className="text-4xl font-bold text-center text-[#1a3153] mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Number of Traffic Violations</h2>
          <p>Violations Today: 7</p>
          <p>Violations This Week: 30</p>
          <p>Violations This Month: 53</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Traffic Violations</h2>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="border p-3 rounded-lg">
            <option value="All">All</option>
            <option value="Speeding">Speeding</option>
            <option value="Red Light">Red Light</option>
            <option value="Illegal Parking">Illegal Parking</option>
            <option value="Seatbelt Violation">Seatbelt Violation</option>
          </select>
          <input
            type="date"
            className="ml-2 p-2 border rounded-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Top Traffic Violations</h2>
          <ul>
            {getTopViolations().map(([type, count]) => (
              <li key={type}>{type}: {count as number}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Top Locations</h2>
          <ul>
            {getTopLocations().map(([location, count]) => (
              <li key={location}>{location}: {count as number}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
          <h2 className="text-xl font-semibold">Traffic Violations Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
