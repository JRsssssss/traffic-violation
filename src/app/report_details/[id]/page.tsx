"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useAuth } from "@/app/Context/AuthContext";
import { ReportService } from "@/service/report";

const ReportDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const {user} = useAuth();
  const reportId = parseInt(params.id);
  const [status, setStatus] = useState<any>(null);
  const [report, setReport] = useState<{
    id: number;
    officerName: string;
    dateCreated: string;
    status: string;
    content: string;
    violationId: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdministrator = user?.role.toLowerCase() === "administrator";

  useEffect(() => {
    const fetchReport = async () => {
        const response = await ReportService.getReportById(reportId);

        setReport({
          id: response.report.id,
          officerName: response.report.officerName,
          dateCreated: new Date(response.report.dateCreated).toLocaleString(),
          status: response.report.status,
          content: response.report.content,
          violationId: response.report.violationId,
        });
        setLoading(false);
      }
    fetchReport()
  },[reportId]); 

  const handleClick = (id: number) => {
    router.push(`/trafficviolation_details/${id}`); // Navigate to detail page
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  if (loading) return <div className="text-center">Loading...</div>;
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
          <strong className="text-lg">Reported By:</strong> <span>{report.officerName}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Date Reported:</strong> <span>{report.dateCreated}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Status:</strong> 
          <span className={`ml-2 ${
            report.status === "Awaiting Review" ? "text-orange-600" : 
            report.status === "Resolved" ? "text-green-600" : 
            "text-red-600"}`}>{report.status}</span>
        </div>
        <div className="mb-4">
          <strong className="text-lg">Details: </strong> <span>{report.content}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button onClick={() => handleClick(report.violationId)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">
                    View Violation Information
          </button>
          {isAdministrator && (
              <div className="flex gap-4 ml-auto">
                <button onClick={() => handleStatusChange("Resolved")} className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md">Resolve</button>
                <button onClick={() => handleStatusChange("Dismissed")} className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md">Dismiss</button>
              </div>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;