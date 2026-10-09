import { Link } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { useStore } from "../lib/useStore";
import { pointsFor, tierFor } from "../lib/civic";

function Profile() {
  const { user, complaints } = useStore();

  const points = pointsFor(complaints);

  const resolved = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  return (
    <AppShell>

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="mt-1 text-muted-foreground">
          Manage your CivicReport profile and view your activity.
        </p>
      </div>

      {/* Profile Card */}
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1.5fr]">

        {/* User Information */}
        <div className="surface p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {user?.name?.charAt(0)?.toUpperCase() || "C"}
            </div>

            <div>
              <h2 className="text-xl font-bold">
                {user?.name || "Citizen"}
              </h2>

              <p className="text-sm text-muted-foreground">
                {user?.email || "No email available"}
              </p>
            </div>

          </div>

          <div className="mt-6 space-y-4">

            <div>
              <p className="text-xs text-muted-foreground">
                Full Name
              </p>

              <p className="mt-1 font-medium">
                {user?.name || "Citizen"}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Email
              </p>

              <p className="mt-1 font-medium">
                {user?.email || "Not available"}
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Account Type
              </p>

              <p className="mt-1 font-medium">
                Citizen
              </p>
            </div>

          </div>

        </div>

        {/* Activity */}
        <div className="space-y-6">

          {/* Civic Points */}
          <div className="surface p-6">

            <p className="text-sm text-muted-foreground">
              Civic Points
            </p>

            <p className="mt-2 text-4xl font-bold text-primary">
              {points}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Current level:{" "}
              <span className="font-semibold text-foreground">
                {tierFor(points)}
              </span>
            </p>

          </div>

          {/* Statistics */}
          <div className="grid gap-4 sm:grid-cols-3">

            <div className="surface p-5">

              <p className="text-sm text-muted-foreground">
                Total Reports
              </p>

              <p className="mt-2 text-3xl font-bold">
                {complaints.length}
              </p>

            </div>

            <div className="surface p-5">

              <p className="text-sm text-muted-foreground">
                Resolved
              </p>

              <p className="mt-2 text-3xl font-bold">
                {resolved}
              </p>

            </div>

            <div className="surface p-5">

              <p className="text-sm text-muted-foreground">
                Points
              </p>

              <p className="mt-2 text-3xl font-bold">
                {points}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Quick Actions */}
      <div className="mt-8 surface p-6">

        <h2 className="text-lg font-bold">
          Quick Actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">

          <Link
            to="/report"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Report an Issue
          </Link>

          <Link
            to="/complaints"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
          >
            View My Complaints
          </Link>

          <Link
            to="/dashboard"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
          >
            Dashboard
          </Link>

        </div>

      </div>

    </AppShell>
  );
}

export default Profile;