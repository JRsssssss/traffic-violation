"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const reports = [
  { id: 1, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review", details: "Detailed report information about Music Auyeung's case." },
  { id: 2, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved", details: "Detailed report information about Miki Ajiki's case." },
  { id: 3, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed", details: "Detailed report information about Kawin Thimayom's case." },
  { id: 4, name: "Jirapat Ruetrakul", date: "Dec 17 2024 19:22", status: "Dismissed", details: "Detailed report information about Jirapat Ruetrakul's case." },
  { id: 5, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review", details: "Detailed report information about Music Auyeung's case."},
  { id: 6, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved", details: "Detailed report information about Miki Ajiki's case."},
  { id: 7, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed", details: "Detailed report information about Kawin Thimayom's case." },
  { id: 8, name: "Jirapat Ruetrakul", date: "Dec 17 2024 19:22", status: "Dismissed", details: "Detailed report information about Jirapat Ruetrakul's case." },
  { id: 9, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review", details: "Detailed report information about Music Auyeung's case." },
  { id: 10, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved", details: "Detailed report information about Miki Ajiki's case." },
  { id: 11, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed", details: "Detailed report information about Kawin Thimayom's case."  },
  { id: 12, name: "Jirapat Ruetrakul", date: "Dec 17 2024 19:22", status: "Dismissed", details: "Detailed report information about Jirapat Ruetrakul's case."  },
  { id: 13, name: "Music Auyeung", date: "Dec 20 2024 19:22", status: "Awaiting Review", details: "Detailed report information about Jirapat Ruetrakul's case."  },
  { id: 14, name: "Miki Ajiki", date: "Dec 19 2024 19:22", status: "Resolved", details: "Detailed report information about Jirapat Ruetrakul's case."  },
  { id: 15, name: "Kawin Thimayom", date: "Dec 18 2024 19:22", status: "Dismissed", details: "Detailed report information about Jirapat Ruetrakul's case."  },
];

const ReportDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = useParams();
  const report = reports.find((r) => r.id === parseInt(params.id));
  const [status, setStatus] = useState(report?.status || "Awaiting Review");

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };
  
  if (!report) {
    return <div className="text-center text-red-500">Report not found.</div>;
  }

  return (
    <div className="flex-1 p-6 bg-[#CFE4F0] rounded-lg h-auto">
      <h1 className="text-4xl font-bold text-center text-[#1a3153] mb-6">Report Details</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <strong className="text-lg">Report ID:</strong> <span>{report.id}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Reported By:</strong> <span>{report.name}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Date Reported:</strong> <span>{report.date}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Status:</strong> 
          <span className={`ml-2 ${
            report.status === "Awaiting Review" ? "text-orange-600" : 
            report.status === "Resolved" ? "text-green-600" : 
            "text-red-600"}`}>{report.status}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Details: </strong> <span>{report.details}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">View Violation Information</button>
          <div className="flex gap-4 ml-auto">
            <button onClick={() => handleStatusChange("Resolved")} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md">Resolve</button>
            <button onClick={() => handleStatusChange("Dismissed")} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;