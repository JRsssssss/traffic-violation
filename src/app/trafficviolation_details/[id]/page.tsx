"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ViolationService } from "@/service/violations";
import { useAuth } from "@/app/Context/AuthContext";
import ReportModal from "@/app/reportModal/page";
import RequireAuth from "@/Components/RequireAuth";
import { TicketService } from "@/service/ticket";
import React from "react";
import ConfirmDialog from "@/Components/confirmationDialog";

// Define proper types for the violation data
interface ViolationType {
  id: number;
  date: string;
  plate: string;
  type: string;
  location: string;
  imageUrl?: string[];
}

interface ViolationData {
  violation: ViolationType;
}

interface PageParams {
  id: string;
}

const ViolationDetail = ({
  params,
}: {
  params: PageParams | Promise<PageParams>;
}) => {
  // Properly unwrap params object using React.use()
  const unwrappedParams = React.use(params as Promise<PageParams>);
  const violationId = unwrappedParams.id;

  const router = useRouter();
  const { user } = useAuth();
  const [violation, setViolation] = useState<ViolationData | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [editableViolation, setEditableViolation] =
    useState<ViolationData | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [confirmSaveOpen, setConfirmSaveOpen] = useState(false);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const [confirmTicketOpen, setConfirmTicketOpen] = useState(false);

  const isOfficer = user?.role.toLowerCase() === "officer";
  const isAdministrator = user?.role.toLowerCase() === "administrator";
  const userId = user?.id;

  useEffect(() => {
    const fetchViolation = async () => {
      if (violationId) {
        const id = parseInt(violationId);
        const response = await ViolationService.getViolationById(id);
        console.log("API Response:", response);
        console.log("User Id", userId);
        // console.log("Usernaem: ", user!.username);
        console.log("User Role:", user?.role);
        console.log("Is Officer:", isOfficer);

        if (response) {
          setViolation(response);
          setEditableViolation({ ...response });
          setMainImage(response.violation.imageUrl?.[0]);
        } else {
          console.error(
            "Violation not found:",
            response?.error || "Unknown error"
          );
        }
      } else {
        console.error("Violation ID is invalid.");
      }
    };

    fetchViolation();
  }, [violationId, userId, user, isOfficer]);

  useEffect(() => {
    console.log("Editable Violation:", editableViolation);
  }, [editableViolation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditableViolation((prev: ViolationData | null) => {
      if (!prev) return null;
      return {
        ...prev,
        violation: {
          ...prev.violation,
          [e.target.name]: e.target.value,
        },
      };
    });
  };

  const handleSave = async () => {
    if (editableViolation) {
      try {
        const updatedViolation = await ViolationService.updateViolation({
          id: editableViolation.violation.id,
          date: new Date(editableViolation.violation.date), // Convert string to Date
          plate: editableViolation.violation.plate,
          type: editableViolation.violation.type,
          location: editableViolation.violation.location,
        });
        console.log("Updated Violation:", updatedViolation);
      } catch (error) {
        console.error("Failed to update violation:", error);
      }
    }
  };

  const handleSaveConfirm = () => {
    setConfirmSaveOpen(true);
  };

  const handleRemove = async () => {
    if (editableViolation && editableViolation.violation.id) {
      try {
        await ViolationService.deleteViolation(editableViolation.violation.id);
        router.push("/trafficviolation");
      } catch (error) {
        console.error("Failed to delete violation:", error);
      }
    }
  };

  const handleRemoveConfirm = () => {
    setConfirmRemoveOpen(true);
  };

  const handleGenerateTicket = async () => {
    if (editableViolation && userId) {
      try {
        // Show loading indicator or message
        const pdfBlob = await TicketService.generateTicket(
          editableViolation.violation.id
        );

        // The response is already a Blob, so we don't need to create one
        const url = window.URL.createObjectURL(pdfBlob);

        // Create a temporary anchor element
        const link = document.createElement("a");
        link.href = url;
        link.download = `ticket_${editableViolation.violation.id}.pdf`;

        // Append to the document, click it, and remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error generating ticket:", error);
        alert("Failed to generate ticket. Please try again.");
      }
    }
  };

  const handleTicketConfirm = () => {
    setConfirmTicketOpen(true);
  };

  if (!violation || !editableViolation) {
    return <p className="text-center text-red-500">Violation not found.</p>;
  }

  return (
    <RequireAuth>
      <div className="p-6 bg-[#CFE4F0] h-screen flex flex-col items-center rounded-lg">
        <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
          <h1 className="text-4xl font-bold text-center mb-6">
            Violation #{editableViolation.violation.id}
          </h1>
          <div className="flex items-center">
            <div className="flex flex-col items-center w-1/3 ">
              <Image
                src={mainImage}
                alt="Violation"
                width={250}
                height={150}
                className="rounded-lg"
              />
              <div className="flex gap-2 mt-4">
                {violation.violation.imageUrl?.map(
                  (img: string, index: number) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={60}
                      className={`rounded-lg cursor-pointer ${
                        mainImage === img ? "border-2 border-blue-500" : ""
                      }`}
                      onClick={() => setMainImage(img)}
                    />
                  )
                )}
              </div>
            </div>

            <div className="flex flex-col w-2/3 gap-4">
              <div className="flex items-center">
                <label className="text-lg font-semibold w-40">Date:</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={editableViolation?.violation.date?.slice(0, 16)} // trim to "YYYY-MM-DDTHH:mm"
                  readOnly={isOfficer}
                  onChange={handleChange}
                  className="border flex-1 p-2 w-full rounded-lg"
                />
              </div>

              <div className="flex items-center">
                <label className="text-lg font-semibold w-40">
                  License Plate No.:
                </label>
                <input
                  type="text"
                  name="plate"
                  value={editableViolation?.violation.plate || ""}
                  readOnly={isOfficer}
                  onChange={handleChange}
                  className="border flex-1 p-2 w-full rounded-lg"
                />
              </div>
              <div className="flex items-center">
                <label className="text-lg font-semibold w-40">
                  Violation Type:
                </label>
                <input
                  type="text"
                  name="type"
                  value={editableViolation?.violation.type || ""}
                  readOnly={isOfficer}
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
                  readOnly={isOfficer}
                  onChange={handleChange}
                  className="border flex-1 p-2 w-full rounded-lg"
                />
              </div>

              <div className="mt-6 flex gap-4">
                {isAdministrator && (
                  <>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={handleRemoveConfirm}
                    >
                      Remove
                    </button>
                    <button
                      onClick={handleSaveConfirm}
                      disabled={
                        !editableViolation?.violation?.date ||
                        !editableViolation?.violation?.plate ||
                        !editableViolation?.violation?.type ||
                        !editableViolation?.violation?.location
                      }
                      className={`px-4 py-2 rounded-lg text-white text-lg transition ${
                        !editableViolation?.violation?.date ||
                        !editableViolation?.violation?.plate ||
                        !editableViolation?.violation?.type ||
                        !editableViolation?.violation?.location
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-green-600 text-white hover:bg-green-800"
                      }`}
                    >
                      Save
                    </button>
                  </>
                )}
                {isOfficer && (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => setIsReportModalOpen(true)}
                    >
                      Report
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                      onClick={handleTicketConfirm}
                    >
                      Generate Ticket
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Dialogs */}
        <ConfirmDialog
          open={confirmSaveOpen}
          title="Save Changes"
          message="Are you sure you want to save changes to this violation?"
          onCancel={() => setConfirmSaveOpen(false)}
          onConfirm={() => {
            setConfirmSaveOpen(false);
            handleSave();
          }}
        />

        <ConfirmDialog
          open={confirmRemoveOpen}
          title="Remove Violation"
          message="Are you sure you want to remove this violation? This action cannot be undone."
          confirmText="Remove"
          onCancel={() => setConfirmRemoveOpen(false)}
          onConfirm={() => {
            setConfirmRemoveOpen(false);
            handleRemove();
          }}
        />

        <ConfirmDialog
          open={confirmTicketOpen}
          title="Generate Ticket"
          message="Are you sure you want to generate a ticket for this violation?"
          confirmText="Generate"
          onCancel={() => setConfirmTicketOpen(false)}
          onConfirm={() => {
            setConfirmTicketOpen(false);
            handleGenerateTicket();
          }}
        />

        {isReportModalOpen && (
          <ReportModal
            violationId={editableViolation.violation.id}
            userId={userId!}
            onClose={() => setIsReportModalOpen(false)}
          />
        )}
      </div>
    </RequireAuth>
  );
};

export default ViolationDetail;
