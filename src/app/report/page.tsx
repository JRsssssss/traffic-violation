"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { ReportService } from "@/service/report";
import { useAuth } from "../Context/AuthContext";

const Reports = () => {
    const router = useRouter();
    const [report, setReports] = useState<any[]>([])
    const [sortOrder, setSortOrder] = useState("A-Z");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;
    const { user } = useAuth();

    const isOfficer = user?.role.toLowerCase() === "officer";
    const isAdministrator = user?.role.toLowerCase() === "administrator";
    const userId = user?.id;
    const username = user?.username;


    useEffect(() => {
        const fetchReports = async () => {
            let response;
    
            if (isAdministrator) {
                response = await ReportService.getAllReports(); // new method for admin
            } 
            
            else {
                response = await ReportService.getReportByOfficerId(userId!); // existing method for officer
            }
    
            if ('reports' in response) {
                setReports(response.reports);
            }
        };
    
        if (userId) {
            fetchReports();
        }
    }, [userId, isAdministrator]);
    
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false 
        });
    };

    const handleClick = (id: number) => {
      router.push(`/report_details/${id}`); // Navigate to detail page
    };

    const sortedReports = [...report].sort((a, b) => {
        if (sortOrder === "A-Z") return b.status.localeCompare(a.status);
        return a.status.localeCompare(b.status);
    });

    // Filter function
    const filteredReports = sortedReports.filter((report) =>
        report.status.toLowerCase().includes(filter.toLowerCase())
    );
    // Pagination logic
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
    const indexOfLastViolation = currentPage * reportsPerPage;
    const indexOfFirstViolation = indexOfLastViolation - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstViolation, indexOfLastViolation);

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
                        <span className="flex-1">{report.id}</span>
                        <span className="flex-1">{report.officerName}</span>
                        <span className="flex-1">{formatDate(report.dateCreated)}</span>
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
