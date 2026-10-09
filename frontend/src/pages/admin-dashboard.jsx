
import { useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Get JWT token
  const getToken = () => {
    return (
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token")
    );
  };

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const response = await fetch(
        "http://127.0.0.1:8000/api/complaints/admin/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      setComplaints(
        Array.isArray(data) ? data : data.results || []
      );
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setError("Failed to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  // Update complaint status
  const updateStatus = async (complaintId, newStatus) => {
    try {
      setUpdatingId(complaintId);
      setMessage("");

      const token = getToken();

      const response = await fetch(
        `http://127.0.0.1:8000/api/complaints/admin/${complaintId}/update/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();

        console.error("Status update error:", errorData);

        throw new Error("Status update failed");
      }

      const updatedComplaint = await response.json();

      setComplaints((previousComplaints) =>
        previousComplaints.map((complaint) =>
          complaint.id === complaintId
            ? updatedComplaint
            : complaint
        )
      );

      setMessage(
        `Complaint #${complaintId} status updated successfully!`
      );
    } catch (err) {
      console.error("Error updating status:", err);

      setMessage("Failed to update complaint status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Statistics
  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) => complaint.status === "pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) => complaint.status === "in_progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) => complaint.status === "resolved"
  ).length;

  const rejectedComplaints = complaints.filter(
    (complaint) => complaint.status === "rejected"
  ).length;

  return (
    <AppShell>
      <div className="space-y-6 p-6">

        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Admin Dashboard 👨‍💼
          </h1>

          <p className="text-gray-600">
            Manage all citizen complaints.
          </p>
        </div>

        {/* Success / Error Message */}
        {message && (
          <div className="rounded-lg bg-blue-100 p-4 text-blue-800">
            {message}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

          {/* Total Complaints */}
          <div className="rounded-xl bg-blue-100 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-blue-700">
              Total Complaints
            </h3>

            <p className="mt-2 text-3xl font-bold text-blue-900">
              {totalComplaints}
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-xl bg-yellow-100 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-yellow-700">
              Pending
            </h3>

            <p className="mt-2 text-3xl font-bold text-yellow-900">
              {pendingComplaints}
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-xl bg-orange-100 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-orange-700">
              In Progress
            </h3>

            <p className="mt-2 text-3xl font-bold text-orange-900">
              {inProgressComplaints}
            </p>
          </div>

          {/* Resolved */}
          <div className="rounded-xl bg-green-100 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-green-700">
              Resolved
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-900">
              {resolvedComplaints}
            </p>
          </div>

          {/* Rejected */}
          <div className="rounded-xl bg-red-100 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-red-700">
              Rejected
            </h3>

            <p className="mt-2 text-3xl font-bold text-red-900">
              {rejectedComplaints}
            </p>
          </div>

        </div>

        {/* All Complaints */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">

          <h2 className="mb-4 text-xl font-semibold">
            All Complaints ({complaints.length})
          </h2>

          {/* Loading */}
          {loading && (
            <p className="text-gray-600">
              Loading complaints...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="text-red-600">
              {error}
            </p>
          )}

          {/* No Complaints */}
          {!loading && !error && complaints.length === 0 && (
            <p className="text-gray-600">
              No complaints found.
            </p>
          )}

          {/* Complaint List */}
          <div className="space-y-4">

            {complaints.map((complaint) => (

              <div
                key={complaint.id}
                className="rounded-lg border p-4"
              >

                {/* Complaint Header */}
                <div className="flex flex-wrap justify-between gap-2">

                  <h3 className="font-semibold text-gray-900">
                    Complaint #{complaint.id}
                  </h3>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">
                    {complaint.status}
                  </span>

                </div>

                {/* Complaint Details */}
                <p className="mt-2">
                  <strong>Category:</strong>{" "}
                  {complaint.category}
                </p>

                <p>
                  <strong>Priority:</strong>{" "}
                  {complaint.priority}
                </p>

                <p>
                  <strong>Description:</strong>{" "}
                  {complaint.description}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {complaint.address || "Not provided"}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  <strong>Created:</strong>{" "}

                  {complaint.created_at
                    ? new Date(
                        complaint.created_at
                      ).toLocaleString()
                    : "Not available"}
                </p>

                {/* Status Update */}
                <div className="mt-4 flex flex-wrap items-center gap-3">

                  <label
                    htmlFor={`status-${complaint.id}`}
                    className="font-medium"
                  >
                    Update Status:
                  </label>

                  <select
                    id={`status-${complaint.id}`}
                    value={complaint.status}
                    onChange={(event) =>
                      updateStatus(
                        complaint.id,
                        event.target.value
                      )
                    }
                    disabled={updatingId === complaint.id}
                    className="rounded-lg border px-3 py-2"
                  >

                    <option value="pending">
                      Pending
                    </option>

                    <option value="in_progress">
                      In Progress
                    </option>

                    <option value="resolved">
                      Resolved
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>

                  </select>

                  {updatingId === complaint.id && (
                    <span className="text-sm text-gray-500">
                      Updating...
                    </span>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </AppShell>
  );
}

export default AdminDashboard;
