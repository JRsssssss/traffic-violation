"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ViolationService } from "@/service/violations";

const ViolationDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [violation, setViolation] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [editableViolation, setEditableViolation] = useState<any>(null);

  useEffect(() => {
    const fetchViolation = async () => {
      const id = params?.id;

      if (id) {
        const violationId = parseInt(id);
        const response = await ViolationService.getViolationById(violationId);
        console.log("API Response:", response);

        if (response) {
          setViolation(response);
          setEditableViolation({ ...response });
          setMainImage("/car.jpg");
          console.log(editableViolation.violation.date); // Check if the date value is correct
        } else {
          console.error("Violation not found:", response?.error || "Unknown error");
        }
      } else {
        console.error("Violation ID is invalid.");
      }
    };

    fetchViolation();
  }, [params]);

  useEffect(() => {
    console.log("Editable Violation:", editableViolation);
  }, [editableViolation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableViolation((prev: any) => ({
      ...prev,
      violation:{
        ...prev.violation,
        [e.target.name]: e.target.value,
      }
    }));
  };

  const handleSave = async () => {
    if (editableViolation) {
      const updatedViolation = await ViolationService.updateViolation({
        id: editableViolation.violation.id,
        date: editableViolation.violation.date,
        plate: editableViolation.violation.plate,
        type: editableViolation.violation.type,
        location: editableViolation.violation.location,
      });
      console.log("Updated Violation:", updatedViolation);
    }
  };

  const handleRemove = async () => {
    if (violation) {
      await ViolationService.deleteViolation(violation);
      router.push("/traffic-violations");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Example: '4/1/2025'
  };

  if (!violation || !editableViolation) {
    return <p className="text-center text-red-500">Violation not found.</p>;
  }

  return (
    <div className="p-6 bg-[#CFE4F0] h-screen flex flex-col items-center rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
        <h1 className="text-4xl font-bold text-center mb-6">Violation #{editableViolation.violation.id}</h1>
        <div className="flex items-center">
          <div className="flex flex-col items-center w-1/3 ">
            <Image src={mainImage} alt="Violation" width={250} height={150} className="rounded-lg" />
            <div className="flex gap-2 mt-4">
              {[violation.img, "/car.jpg", "/car.jpg"].map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  width={80}
                  height={40}
                  className={`rounded-lg cursor-pointer ${mainImage === img ? "border-2 border-blue-500" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col w-2/3 gap-4">
            <div className="flex items-center">
              <label className="text-lg font-semibold w-40">Date:</label>
              <input
                type="datetime-local"
                name="date"
                value={editableViolation?.violation.date?.slice(0, 16)} // trim to "YYYY-MM-DDTHH:mm"
                onChange={handleChange}
                className="border flex-1 p-2 w-full rounded-lg"
              />
            </div>

            <div className="flex items-center">
              <label className="text-lg font-semibold w-40">License Plate No.:</label>
              <input
                type="text"
                name="plate"
                value={editableViolation?.violation.plate || ""}
                onChange={handleChange}
                className="border flex-1 p-2 w-full rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold w-40">Violation Type:</label>
              <input
                type="text"
                name="type"
                value={editableViolation?.violation.type || ""}
                onChange={handleChange}
                className="border flex-1 p-2 w-full rounded-lg"
              />
            </div>
            <div className="flex items-center">
              <label className="text-lg font-semibold w-40">Location:</label>
              <input
                type="text"
                name="location"
                value={editableViolation?.violation.location || ""}
                onChange={handleChange}
                className="border flex-1 p-2 w-full rounded-lg"
              />
            </div>

            <div className="mt-6 flex gap-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={handleRemove}>
                Remove
              </button>
              <button 
                onClick={(handleSave)}
                disabled={  !editableViolation?.violation?.date ||
                  !editableViolation?.violation?.plate ||
                  !editableViolation?.violation?.type ||
                  !editableViolation?.violation?.location}
                className={`px-4 py-2 rounded-lg text-white text-lg transition ${
                  !editableViolation?.violation?.date ||
                  !editableViolation?.violation?.plate ||
                  !editableViolation?.violation?.type ||
                  !editableViolation?.violation?.location
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-800'
                }`}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetail;
