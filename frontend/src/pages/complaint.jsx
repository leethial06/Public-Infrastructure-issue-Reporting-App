import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { AppShell } from "../components/AppShell";
import { useStore } from "../lib/useStore";
import {
  STATUSES,
  statusClasses,
  priorityClasses,
  timeAgo,
} from "../lib/civic";

function Complaints() {
  const { complaints, advance,refreshComplaints } = useStore();

  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState(null);

    useEffect(() => {
    refreshComplaints();
  }, [refreshComplaints]);

  const list = complaints.filter(
    (complaint) =>
      filter === "All" || complaint.status === filter
  );

  return (
    <AppShell>

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            My complaints
          </h1>

          <p className="mt-1 text-muted-foreground">
            {complaints.length} reports submitted
          </p>
        </div>

        <Link
          to="/report"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          New report
        </Link>

      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">

        {["All", ...STATUSES].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              filter === status
                ? "border-primary bg-primary/10 text-primary"
                : "border-border"
            }`}
          >
            {status}
          </button>
        ))}

      </div>

      {/* Complaints List */}
      <div className="mt-6 space-y-4">

        {list.map((complaint) => (
          <article
            key={complaint.id}
            className="surface overflow-hidden"
          >

            <div className="flex flex-wrap gap-4 p-5">

              {/* Image */}
              {complaint.image && (
                <img
                  src={complaint.image}
                  alt={`${complaint.category} report`}
                  className="h-20 w-28 rounded-lg object-cover"
                />
              )}

              <div className="min-w-[12rem] flex-1">

                {/* Title + Status */}
                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="font-semibold">
                    {complaint.category}
                  </h2>

                  <span className="text-sm text-muted-foreground">
                    · {complaint.id}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityClasses(
                      complaint.priority
                    )}`}
                  >
                    {complaint.priority}
                  </span>

                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusClasses(
                      complaint.status
                    )}`}
                  >
                    {complaint.status}
                  </span>

                </div>

                {/* Description */}
                <p className="mt-2 text-sm text-muted-foreground">
                  {complaint.description}
                </p>

                {/* Address + Location + Time */}
<p className="mt-2 text-xs text-muted-foreground">
  {complaint.address}

  {complaint.lat
    ? ` · ${complaint.lat.toFixed(4)}, ${complaint.lng?.toFixed(4)}`
    : ""}

  {" · "}
  {timeAgo(complaint.created_at || complaint.createdAt)}
</p>

                {/* Actions */}
                <div className="mt-3 flex gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setOpenId(
                        openId === complaint.id
                          ? null
                          : complaint.id
                      )
                    }
                    className="text-sm font-medium text-primary"
                  >
                    {openId === complaint.id
                      ? "Hide timeline"
                      : "Track status"}
                  </button>

                  {complaint.status !== "Resolved" && (
                    <button
                      type="button"
                      onClick={() =>
                        advance(complaint.id)
                      }
                      className="text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Simulate next update
                    </button>
                  )}

                </div>

              </div>
            </div>

          {/* Track Status */}
{openId === complaint.id && (
  <div className="border-t border-border bg-secondary/40 p-5">

    <div className="flex items-start gap-3">

      <span className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-primary" />

      <div>

        <p className="text-sm font-semibold">
          {complaint.status
            ?.replace(/_/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase())}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {complaint.status === "pending" &&
            "Your complaint is waiting for review."}

          {complaint.status === "in progress" &&
            "Your complaint is currently being processed."}

          {complaint.status === "resolved" &&
            "Your complaint has been resolved successfully."}

          {complaint.status === "rejected" &&
            "Your complaint has been rejected."}
        </p>

      </div>

    </div>

  </div>
)}

           

          </article>
        ))}

        {/* Empty state */}
        {list.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No complaints in this view.
          </p>
        )}

      </div>

    </AppShell>
  );
}

export default Complaints;