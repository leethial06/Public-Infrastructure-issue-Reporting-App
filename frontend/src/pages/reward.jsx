import { useEffect, useState } from "react";
import { AppShell } from "../components/AppShell";

function Rewards() {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/civic-points/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch points");
      }

      const data = await response.json();

      setPoints(
        Number(
          data.points ??
            data.total_points ??
            data.civic_points ??
            0
        )
      );
    } catch (error) {
      console.error("Error fetching civic points:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Civic Points 🏆
          </h1>

          <p className="text-gray-600">
            Earn points by reporting public issues.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm border">
          <h2 className="text-xl font-semibold">
            Your Points
          </h2>

          {loading ? (
            <p className="mt-4 text-gray-600">
              Loading points...
            </p>
          ) : (
            <p className="mt-4 text-4xl font-bold text-blue-600">
              {points}
            </p>
          )}

          <p className="mt-2 text-gray-600">
            Earn 10 points for every complaint you report.
          </p>
        </div>
      </div>
    </AppShell>
  );
}

export default Rewards;