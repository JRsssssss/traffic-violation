"use client";
import { ViolationService } from "@/service/violations";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const [violations, setViolations] = useState<any[]>([]);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await ViolationService.getAllViolations();
        setViolations(response.violations);
      } catch (error) {
        console.error("Error fetching violations:", error);
      }

    };

    fetchViolations();
  }, []);

  const filteredData = violations.filter((item) => {
    const matchType = selectedType === "All" || item.type === selectedType;
    const itemDate = new Date(item.date);
    const matchStart = !startDate || itemDate >= new Date(startDate);
    const matchEnd = !endDate || itemDate <= new Date(endDate);
    return matchType && matchStart && matchEnd;
  });
  
  const getTopViolations = () => {
    const counts: Record<string, number> = {};
    violations.forEach(({ type }) => {
      counts[type] = (counts[type] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  };

  const getTopLocations = () => {
    const counts: Record<string, number> = {};
    violations.forEach(({ location }) => {
      if (location) counts[location] = (counts[location] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
  };

  const getLatestViolation = () => {
    if (!violations.length) return null;
    return [...violations]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };
  
  const groupedChartData = () => {
    const provinceMap: Record<string, Record<string, number>> = {};
  
    filteredData.forEach(({ location, type }) => {
      const province = location || "Unknown";
      if (!provinceMap[province]) {
        provinceMap[province] = {};
      }
      if (!provinceMap[province][type]) {
        provinceMap[province][type] = 0;
      }
      provinceMap[province][type]++;
    });
  
    const uniqueTypes = [...new Set(filteredData.map((v) => v.type))];
  
    const chartData = Object.entries(provinceMap).map(([province, types]) => {
      const row: any = { province };
      uniqueTypes.forEach((t) => {
        row[t] = types[t] || 0;
      });
      return row;
    });
  
    return { chartData, uniqueTypes };
  };
  
  return (
    <div className="p-6 bg-[#CFE4F0] rounded-lg h-auto">
      <h1 className="text-4xl font-bold text-center text-[#1a3153] mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Number of Traffic Violations</h2>
          <p>Violations Today: {
            violations.filter(v => new Date(v.date).toDateString() === new Date().toDateString()).length
          }</p>
          <p>Violations This Week: {
            violations.filter(v => {
              const d = new Date(v.date);
              const now = new Date();
              const diff = (now.getTime() - d.getTime()) / (1000 * 3600 * 24);
              return diff <= 7;
            }).length
          }</p>
          <p>Violations This Month: {
            violations.filter(v => {
              const d = new Date(v.date);
              const now = new Date();
              return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }).length
          }</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold">Traffic Violations</h2>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-3 rounded-lg"
          >
            <option value="All">All</option>
            {[...new Set(violations.map(v => v.type))].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <div className="flex gap-2 mt-2">
          <div>
            <label className="block text-sm font-medium">Start Date</label>
            <input
              type="date"
              className="p-2 border rounded-lg"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End Date</label>
            <input
              type="date"
              className="p-2 border rounded-lg"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold">Top Traffic Violations</h2>
              <ul>
                {getTopViolations().map(([type, count]) => (
                  <li key={type}>{type}: {count}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold">Top Locations</h2>
              <ul>
                {getTopLocations().map(([location, count]) => (
                  <li key={location}>{location}: {count}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold">Latest Traffic Violation</h2>
              {getLatestViolation() ? (
                <div className="mt-2">
                  <p><strong>Type:</strong> {getLatestViolation().type}</p>
                  <p><strong>Location:</strong> {getLatestViolation().location || "Unknown"}</p>
                  <p><strong>Date:</strong> {new Date(getLatestViolation().date).toLocaleString()}</p>
                </div>
              ) : (
                <p>No violations available.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 col-span-2">
          <h2 className="text-xl font-semibold">Traffic Violations Chart by Province</h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={groupedChartData().chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="province" />
              <YAxis />
              <Tooltip />
              <Legend />
              {groupedChartData().uniqueTypes.map((type, index) => (
                <Bar
                  key={type}
                  dataKey={type}
                  fill={["#8884d8", "#82ca9d", "#ffc658", "#ff8042"][index % 4]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
