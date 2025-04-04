"use client";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ViolationService } from '@/service/violations';

const TrafficViolations = () => {
  const [violations, setViolations] = useState<any[]>([]);
  const router = useRouter();
  const violationsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchViolations = async () => {
      const response = await ViolationService.getAllViolations();
      setViolations(response.violations);
    };

    fetchViolations();
  }, []);
  
  // Pagination logic
  const totalPages = Math.ceil(violations.length / violationsPerPage);
  const indexOfLastViolation = currentPage * violationsPerPage;
  const indexOfFirstViolation = indexOfLastViolation - violationsPerPage;
  const currentViolations = violations.slice(indexOfFirstViolation, indexOfLastViolation);

  const handleClick = (id: number) => {
    router.push(`/trafficviolation_details/${id}`); // Navigate to detail page
  };



  return (
    <div className="p-6 bg-[#CFE4F0] h-auto rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6">Traffic Violations</h1>
      <div className="grid grid-cols-3 gap-6 bg-[#CFE4F0]">
        {currentViolations.map((violation) => (
          <div
            key={violation.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg bg-white flex flex-col items-center"
            onClick={() => handleClick(violation.id)}
          >
            <Image src='/car.jpg' alt="Violation" width={150} height={100} className="rounded-lg" />
            <p className="mt-2 text-center">{violation.date}</p>
            <p className="text-center">{violation.plate}</p>
            <p className="text-center font-bold">{violation.type}</p>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TrafficViolations;
