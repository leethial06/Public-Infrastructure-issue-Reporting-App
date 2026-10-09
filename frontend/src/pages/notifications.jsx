
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/AppShell";

/* Time ago helper */
function timeAgo(date) {
  if (!date) {
    return "Just now";
  }

  const currentTime = Date.now();
  const notificationTime = new Date(date).getTime();

  if (Number.isNaN(notificationTime)) {
    return "Just now";
  }

  const seconds = Math.floor(
    (currentTime - notificationTime) / 1000
  );

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return `${days} day${days > 1 ? "s" : ""} ago`;
}

/* Notification icon helper */
function getNotificationIcon(type) {
  if (type === "status_update") {
    return "🔧";
  }

  if (type === "complaint") {
    return "🔔";
  }

  return "📢";
}

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/notifications/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
  console.log("Notification API Status:", response.status);
  console.log("Notification API Error:", data);

  throw new Error(
    `API Error: ${response.status} - ${JSON.stringify(data)}`
  );
}
      setNotifications(Array.isArray(data) ? data : data.results || []);
    } catch (error) {
      console.error("Notifications error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="mt-1 text-muted-foreground">
            Stay updated about your complaints.
          </p>
        </div>

        <Link
          to="/complaints"
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
        >
          View my complaints
        </Link>
      </div>

      {/* Notification List */}
      <div className="mt-8 space-y-4">
        {loading && (
          <div className="surface p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Loading notifications...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="surface p-10 text-center">
            <div className="text-4xl">⚠️</div>

            <h2 className="mt-4 font-semibold">
              {error}
            </h2>

            <button
              onClick={fetchNotifications}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="surface flex gap-4 p-5"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl">
                {getNotificationIcon(
                  notification.notification_type
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-semibold">
                    {notification.notification_type ===
                    "status_update"
                      ? "Complaint Status Updated"
                      : notification.notification_type ===
                        "complaint"
                      ? "Complaint Submitted"
                      : "Notification"}
                  </h2>

                  <span className="text-xs text-muted-foreground">
                    {timeAgo(notification.created_at)}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {notification.message}
                </p>
              </div>
            </div>
          ))}

        {/* Empty State */}
        {!loading &&
          !error &&
          notifications.length === 0 && (
            <div className="surface p-10 text-center">
              <div className="text-4xl">
                🔔
              </div>

              <h2 className="mt-4 font-semibold">
                No notifications
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                You will see complaint updates here.
              </p>
            </div>
          )}
      </div>
    </AppShell>
  );
}

export default Notifications;
