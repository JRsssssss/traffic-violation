"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const reports = [
  { id: 1, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review" },
  { id: 2, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved" },
  { id: 3, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed" },
  { id: 4, name: "Jirapat Ruetrakul", date: "Dec 17 2024 19:22", status: "Dismissed" },
  { id: 5, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review" },
  { id: 6, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved" },
  { id: 7, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed" },
  { id: 8, name: "Jirapat Ruetrakul", date: "Dec 17 2024 19:22", status: "Dismissed" },
  { id: 9, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review" },
  { id: 10, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved" },
  { id: 11, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed" },
  { id: 12, name: "Jirapat Ruetrakul", date: "Dec 17 2024 19:22", status: "Dismissed" },
  { id: 13, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review" },
  { id: 14, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved" },
  { id: 15, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed" },
];

const Reports = () => {
    const router = useRouter();
    const [sortOrder, setSortOrder] = useState("A-Z");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    const handleClick = (id: number) => {
      router.push(`/report_details/${id}`); // Navigate to detail page
    };

    // Sort function
    const sortedReports = [...reports].sort((a, b) => {
        if (sortOrder === "A-Z") return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
    });

    // Filter function
    const filteredReports = sortedReports.filter((report) =>
        report.name.toLowerCase().includes(filter.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
    const indexOfLastReport = currentPage * reportsPerPage; 
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);

    return (
        <div className="flex-1 p-6 bg-[#CFE4F0] rounded-lg h-screen">
            <h1 className="text-4xl font-bold text-center text-[#1a3153] mb-6">Reports</h1>

            {/* Sorting & Filter */}
            <div className="flex justify-center items-center gap-4 mb-4">
                <label className="font-medium text-lg">Sort by:</label>
                <select
                className="px-4 py-2 border rounded-lg shadow-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                </select>

                <label className="font-medium text-lg">Filter:</label>
                <input
                type="text"
                className="px-4 py-2 border rounded-lg shadow-sm"
                placeholder="Search name..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-md">
                    {/* Table Header */}
                    <div className="flex font-semibold p-3 border-b text-center">
                    <span className="flex-1">Report ID</span>
                    <span className="flex-1">Report By</span>
                    <span className="flex-1">Date Reported</span>
                    <span className="flex-1">Status</span>
                    </div>
            
                    {/* Table Rows */}
                    {currentReports.map((report, index) => (
                    <div key={index} onClick={() => handleClick(report.id)} className="flex p-4 border-b items-center text-center">
                        <span className="flex-1">{report.name}</span>
                        <span className="flex-1">{report.name}</span>
                        <span className="flex-1">{report.date}</span>
                        <span className={`flex-1 ${
                        report.status === "Awaiting Review"
                        ? "text-orange-600"
                        : report.status === "Resolved"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}>{report.status}</span>
                    </div>
                    ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 gap-4">
                <button 
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
                <button 
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
            
            
    );
};

export default Reports;
