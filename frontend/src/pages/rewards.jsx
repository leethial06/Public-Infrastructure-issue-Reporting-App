
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../components/AppShell";
import { tierFor } from "../lib/civic";

function Rewards() {
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCivicPoints();
  }, []);

  const getToken = () => {
    return (
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token")
    );
  };

  const fetchCivicPoints = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

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
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();

      console.log("Civic Points API Response:", data);

      const userPoints =
        data.points ??
        data.total_points ??
        data.civic_points ??
        0;

      setPoints(Number(userPoints));
    } catch (err) {
      console.error("Error fetching civic points:", err);
      setError("Failed to load civic points.");
    } finally {
      setLoading(false);
    }
  };

  const tier = tierFor(points);

  const nextLevel =
    points < 100
      ? {
          tier: "Active Citizen",
          points: 100,
        }
      : points < 250
      ? {
          tier: "Responsible Citizen",
          points: 250,
        }
      : points < 500
      ? {
          tier: "Community Champion",
          points: 500,
        }
      : {
          tier: "Civic Leader",
          points: 500,
        };

  const nextTier = nextLevel.tier;
  const nextPoints = nextLevel.points;

  const remaining = Math.max(nextPoints - points, 0);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Civic Rewards
          </h1>

          <p className="mt-1 text-muted-foreground">
            Earn points by helping improve your community.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="surface p-6">
            <p className="text-muted-foreground">
              Loading your civic points...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Points Cards */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="surface p-6">
                <p className="text-sm text-muted-foreground">
                  Your Civic Points
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-4xl">
                    🏆
                  </span>

                  <span className="text-4xl font-bold">
                    {points}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  Current level:{" "}
                  <span className="font-semibold text-foreground">
                    {tier}
                  </span>
                </p>
              </div>

              {/* Next Level */}
              <div className="surface p-6">
                <p className="text-sm text-muted-foreground">
                  Next Level
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {nextTier}
                </h2>

                {remaining > 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    You need{" "}
                    <span className="font-semibold text-foreground">
                      {remaining}
                    </span>{" "}
                    more points.
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-primary">
                    🎉 You have reached the highest level!
                  </p>
                )}
              </div>
            </div>

            {/* How to Earn */}
            <div>
              <h2 className="text-xl font-bold">
                How to earn Civic Points
              </h2>

              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="surface p-5">
                  <div className="text-3xl">
                    📝
                  </div>

                  <h3 className="mt-3 font-bold">
                    Report an Issue
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Submit a valid public infrastructure complaint.
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    +10 points
                  </p>
                </div>

                <div className="surface p-5">
                  <div className="text-3xl">
                    📷
                  </div>

                  <h3 className="mt-3 font-bold">
                    Add Photo Evidence
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add a clear photo to support your complaint.
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    +5 points
                  </p>
                </div>

                <div className="surface p-5">
                  <div className="text-3xl">
                    📍
                  </div>

                  <h3 className="mt-3 font-bold">
                    Add Location
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Provide the exact location of the issue.
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    +5 points
                  </p>
                </div>

                <div className="surface p-5">
                  <div className="text-3xl">
                    ✅
                  </div>

                  <h3 className="mt-3 font-bold">
                    Issue Resolved
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Earn extra points when your valid report is resolved.
                  </p>

                  <p className="mt-3 font-semibold text-primary">
                    +20 points
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="surface p-6 text-center">
              <h2 className="text-xl font-bold">
                Keep helping your community! 🌱
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Every responsible report helps make your city better.
              </p>

              <Link
                to="/report"
                className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Report an Issue
              </Link>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

export default Rewards;
