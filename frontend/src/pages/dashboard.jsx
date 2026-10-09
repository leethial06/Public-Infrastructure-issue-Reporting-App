
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { useStore } from "../lib/useStore";

function Dashboard() {
  const {
    user,
    complaints,
    refreshComplaints,
  } = useStore();

  useEffect(() => {
    refreshComplaints();
  }, [refreshComplaints]);

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (complaint) =>
      complaint.status?.toLowerCase() === "pending" ||
      complaint.status?.toLowerCase() === "submitted"
  ).length;

  const inProgressComplaints = complaints.filter(
    (complaint) =>
      complaint.status?.toLowerCase() === "in progress" ||
      complaint.status?.toLowerCase() === "in_progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (complaint) =>
      complaint.status?.toLowerCase() === "resolved"
  ).length;

  const recentComplaints = [...complaints].slice(0, 5);

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.first_name || user?.username || "Citizen"} 👋
          </h1>

          <p className="mt-1 text-gray-600">
            Track your public infrastructure complaints.
          </p>
        </div>

        {/* Report Button */}
        <div className="flex flex-wrap gap-3">
          <Link
            to="/report"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            + Report New Issue
          </Link>

          <Link
            to="/complaints"
            className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            View My Complaints
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Total Complaints</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {totalComplaints}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {pendingComplaints}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">In Progress</p>
            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {inProgressComplaints}
            </h2>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">Resolved</p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {resolvedComplaints}
            </h2>
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Complaints
            </h2>

            <Link
              to="/complaints"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>

          {recentComplaints.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-gray-500">
                No complaints found.
              </p>

              <Link
                to="/report"
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                Report your first issue
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {complaint.category}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        complaint.status?.toLowerCase() === "resolved"
                          ? "bg-green-100 text-green-700"
                          : complaint.status?.toLowerCase() === "in progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    {complaint.description || "No description available"}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {complaint.address || "Address not available"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to="/notifications"
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              🔔 Notifications
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              Check complaint submission and status updates.
            </p>
          </Link>

          <Link
            to="/reward"
            className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900">
              🏆 Civic Points
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              View your civic points and rewards.
            </p>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

export default Dashboard;
