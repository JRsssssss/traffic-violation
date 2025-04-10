import { useState } from "react";
import { ReportService } from "@/service/report";
import ConfirmDialog from "@/Components/confirmationDialog";

interface ApiErrorResponse {
  response?: {
    data?: {
      error?: string;
    };
  };
}

const ReportModal = ({
  violationId,
  userId,
  onClose,
}: {
  violationId: number;
  userId: number;
  onClose: () => void;
}) => {
  const [includePlate, setIncludePlate] = useState(false);
  const [includeViolationType, setIncludeViolationType] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const officerId = userId;

  const handleSaveReport = async () => {
    try {
      const response = await ReportService.createReport({
        content: reportContent,
        status: "Awaiting Review",
        violationId,
        officerId,
        includePlate,
        includeViolationType,
      });

      if (response?.error) {
        setErrorMessage(response.error);
        return;
      }

      onClose();
      console.log("Report saved successfully:", response);
    } catch (error: unknown) {
      console.error("Failed to save the report:", error);
      setErrorMessage(
        typeof error === "object" && error !== null && "response" in error
          ? (error as ApiErrorResponse).response?.data?.error ||
              "An unexpected error occurred."
          : "An unexpected error occurred."
      );
    }
  };

  const handleSubmitReport = () => {
    if (!reportContent.trim()) {
      setErrorMessage("Report content cannot be empty");
      return;
    }
    setConfirmOpen(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">
          Create Report for Violation #{violationId}
        </h2>

        <div className="mb-4">
          <label className="block text-lg font-semibold">Report Content:</label>
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            className="border p-2 w-full rounded-lg"
            rows={4}
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Select section to report:
          </label>
          <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includePlate}
                onChange={(e) => setIncludePlate(e.target.checked)}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">License plate</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={includeViolationType}
                onChange={(e) => setIncludeViolationType(e.target.checked)}
                className="form-checkbox text-blue-600"
              />
              <span className="ml-2">Violation type</span>
            </label>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 text-red-600 font-medium">{errorMessage}</div>
        )}
        <div className="flex justify-between gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
          <button
            onClick={handleSubmitReport}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save Report
          </button>
        </div>

        <ConfirmDialog
          open={confirmOpen}
          title="Submit Report"
          message="Are you sure you want to submit this report?"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            handleSaveReport();
          }}
        />
      </div>
    </div>
  );
};

export default ReportModal;
